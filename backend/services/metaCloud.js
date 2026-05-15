const axios = require('axios');

/**
 * Thin wrapper around the WhatsApp Cloud API. Two send paths:
 *
 *   sendText(to, body)              — free-form, only works inside an
 *                                     open 24h conversation window.
 *   sendTemplate(to, name, params)  — template-based, works any time
 *                                     once the template is approved.
 *
 * The dispatcher decides which to call. Both return the Meta response
 * unchanged; errors bubble up with the original Meta payload attached
 * to `err.response.data` so the caller can log it.
 */

const VERSION = process.env.META_GRAPH_VERSION || 'v21.0';
const PHONE_ID = process.env.META_PHONE_NUMBER_ID;
const TOKEN = process.env.META_ACCESS_TOKEN;

const BASE = `https://graph.facebook.com/${VERSION}`;

function authHeaders() {
  return {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  };
}

function normalisePhone(raw) {
  if (!raw) return '';
  let s = String(raw).replace(/\D/g, '');
  // Indian default: 10-digit local number → prefix 91
  if (s.length === 10) s = '91' + s;
  return s;
}

async function sendText(to, body) {
  const phone = normalisePhone(to);
  if (!phone) throw new Error('Invalid recipient phone');
  if (!body || !body.trim()) throw new Error('Empty body');
  if (!PHONE_ID || !TOKEN) throw new Error('Meta credentials missing');

  const url = `${BASE}/${PHONE_ID}/messages`;
  const payload = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: phone,
    type: 'text',
    text: { body, preview_url: true },
  };
  const r = await axios.post(url, payload, { headers: authHeaders(), timeout: 15000 });
  return r.data;
}

/**
 * Interactive "Call to Action URL" message — body text plus a tappable
 * button. Like sendText, this requires an open 24h conversation
 * window. Body is capped at 1024 chars by Meta; we hard-trim to be
 * safe.
 */
async function sendInteractiveCTA(to, { body, buttonLabel, buttonUrl, footer = '' }) {
  const phone = normalisePhone(to);
  if (!phone) throw new Error('Invalid recipient phone');
  if (!body || !buttonLabel || !buttonUrl) throw new Error('body, buttonLabel and buttonUrl are required');
  if (!PHONE_ID || !TOKEN) throw new Error('Meta credentials missing');

  const url = `${BASE}/${PHONE_ID}/messages`;
  const payload = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: phone,
    type: 'interactive',
    interactive: {
      type: 'cta_url',
      body: { text: String(body).slice(0, 1024) },
      ...(footer ? { footer: { text: String(footer).slice(0, 60) } } : {}),
      action: {
        name: 'cta_url',
        parameters: {
          display_text: String(buttonLabel).slice(0, 20),
          url: String(buttonUrl),
        },
      },
    },
  };
  const r = await axios.post(url, payload, { headers: authHeaders(), timeout: 15000 });
  return r.data;
}

async function sendTemplate(to, templateName, { language = 'en_US', bodyParams = [], buttonUrlSuffix = '' } = {}) {
  const phone = normalisePhone(to);
  if (!phone) throw new Error('Invalid recipient phone');
  if (!templateName) throw new Error('Missing template name');
  if (!PHONE_ID || !TOKEN) throw new Error('Meta credentials missing');

  const components = [];
  if (bodyParams.length) {
    components.push({
      type: 'body',
      parameters: bodyParams.map((v) => ({ type: 'text', text: String(v) })),
    });
  }
  if (buttonUrlSuffix) {
    // Template's CTA URL button placeholder ({{1}}) — Meta requires the
    // dynamic suffix here when the template was registered with a URL
    // suffix variable.
    components.push({
      type: 'button',
      sub_type: 'url',
      index: 0,
      parameters: [{ type: 'text', text: String(buttonUrlSuffix) }],
    });
  }

  const url = `${BASE}/${PHONE_ID}/messages`;
  const payload = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: phone,
    type: 'template',
    template: {
      name: templateName,
      language: { code: language },
      ...(components.length ? { components } : {}),
    },
  };
  const r = await axios.post(url, payload, { headers: authHeaders(), timeout: 15000 });
  return r.data;
}

module.exports = {
  sendText,
  sendInteractiveCTA,
  sendTemplate,
  normalisePhone,
};
