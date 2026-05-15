const meta = require('./metaCloud');
const MessageTemplate = require('../models/MessageTemplate');
const WhatsAppContact = require('../models/WhatsAppContact');

/**
 * Picks the right confirmation template for a given enquiry category
 * and sends it via WhatsApp, returning a log entry that gets pushed
 * onto the Enquiry document. Never throws — failures are captured so
 * the public submit endpoint stays 200-OK from the visitor's POV.
 *
 * Send strategy:
 *   1. If the category template has a `metaTemplateName`, send via
 *      Meta template (works any time).
 *   2. Otherwise, check the 24h window via WhatsAppContact:
 *        - inside window → free-form text
 *        - outside window → skip with a clear log entry; the admin
 *          will see "skipped: outside 24h window" on the enquiry.
 *
 * The text-rendering glues the body + optional CTA URL into a single
 * tidy WhatsApp message, with the {{name}} placeholder filled in.
 */

const WINDOW_MS = 24 * 60 * 60 * 1000;

function renderBody(template, vars = {}, { appendCta = false } = {}) {
  let body = String(template.bodyText || '');
  for (const [k, v] of Object.entries(vars)) {
    body = body.replaceAll(`{{${k}}}`, String(v ?? ''));
  }
  // Only append the URL inline when we're sending plain text without a
  // button (interactive sends carry the URL on the button itself).
  if (appendCta && template.ctaLabel && template.ctaUrl) {
    body += `\n\n🔗 ${template.ctaLabel}: ${template.ctaUrl}`;
  }
  return body;
}

async function isInWindow(phone) {
  if (!phone) return false;
  const c = await WhatsAppContact.findOne({ phone: meta.normalisePhone(phone) }).lean();
  if (!c?.lastInboundAt) return false;
  return Date.now() - new Date(c.lastInboundAt).getTime() < WINDOW_MS;
}

async function dispatchEnquiryConfirmation(enquiry) {
  const log = {
    sentAt: new Date(),
    ok: false,
    kind: 'text',
    messageId: '',
    error: '',
    body: '',
    ctaLabel: '',
    ctaUrl: '',
  };

  try {
    const tpl = await MessageTemplate.findOne({ category: enquiry.category });
    if (!tpl) {
      log.error = `No template configured for category "${enquiry.category}"`;
      return { log, status: 'failed' };
    }

    const hasCta = !!(tpl.ctaLabel && tpl.ctaUrl);
    log.ctaLabel = tpl.ctaLabel || '';
    log.ctaUrl = tpl.ctaUrl || '';

    // Path 1 — Meta template (works always)
    if (tpl.metaTemplateName) {
      try {
        const r = await meta.sendTemplate(enquiry.mobile, tpl.metaTemplateName, {
          language: tpl.language || 'en_US',
          bodyParams: [enquiry.name || ''],
          buttonUrlSuffix: '', // CTA suffix wiring left for when the template is registered
        });
        log.kind = 'template';
        log.body = renderBody(tpl, { name: enquiry.name, request: enquiry.request }, { appendCta: false });
        log.ok = true;
        log.messageId = r?.messages?.[0]?.id || '';
        await markOutbound(enquiry.mobile);
        return { log, status: 'sent' };
      } catch (err) {
        log.error = err?.response?.data?.error?.message || err.message || 'Template send failed';
        // Fall through to interactive/text below (works if window open).
      }
    }

    // Path 2 — interactive CTA / free-form text (only inside 24h window)
    const inWindow = await isInWindow(enquiry.mobile);
    if (!inWindow) {
      log.body = renderBody(tpl, { name: enquiry.name, request: enquiry.request }, { appendCta: true });
      log.error = log.error || 'Outside 24h conversation window — message not sent. Configure a Meta template to enable proactive sends.';
      return { log, status: 'skipped' };
    }

    // Path 2a — interactive cta_url (real WhatsApp button, not a link)
    if (hasCta) {
      const body = renderBody(tpl, { name: enquiry.name, request: enquiry.request }, { appendCta: false });
      log.body = body;
      try {
        const r = await meta.sendInteractiveCTA(enquiry.mobile, {
          body,
          buttonLabel: tpl.ctaLabel,
          buttonUrl: tpl.ctaUrl,
        });
        log.kind = 'interactive';
        log.ok = true;
        log.messageId = r?.messages?.[0]?.id || '';
        await markOutbound(enquiry.mobile);
        return { log, status: 'sent' };
      } catch (err) {
        log.error = err?.response?.data?.error?.message || err.message || 'Interactive send failed';
        // Fall through to plain text as a last resort.
      }
    }

    // Path 2b — plain text fallback (URL inlined into the body)
    const textBody = renderBody(tpl, { name: enquiry.name, request: enquiry.request }, { appendCta: true });
    log.body = textBody;
    try {
      const r = await meta.sendText(enquiry.mobile, textBody);
      log.kind = 'text';
      log.ok = true;
      log.messageId = r?.messages?.[0]?.id || '';
      await markOutbound(enquiry.mobile);
      return { log, status: 'sent' };
    } catch (err) {
      log.error = err?.response?.data?.error?.message || err.message || 'Text send failed';
      return { log, status: 'failed' };
    }
  } catch (err) {
    log.error = err.message || 'Dispatch failed';
    return { log, status: 'failed' };
  }
}

async function markOutbound(phone) {
  const p = meta.normalisePhone(phone);
  if (!p) return;
  await WhatsAppContact.findOneAndUpdate(
    { phone: p },
    { $set: { lastOutboundAt: new Date() } },
    { upsert: true, setDefaultsOnInsert: true }
  );
}

async function markInbound(phone, profileName = '') {
  const p = meta.normalisePhone(phone);
  if (!p) return;
  await WhatsAppContact.findOneAndUpdate(
    { phone: p },
    {
      $set: { lastInboundAt: new Date(), ...(profileName ? { profileName } : {}) },
      $inc: { inboundCount: 1 },
    },
    { upsert: true, setDefaultsOnInsert: true }
  );
}

module.exports = {
  dispatchEnquiryConfirmation,
  markInbound,
  markOutbound,
  isInWindow,
};
