const express = require('express');
const { markInbound } = require('../services/dispatch');
const logger = require('../config/logger');

const router = express.Router();

/**
 * Meta WhatsApp webhook. The verification (GET) handshake compares
 * the query token against META_WEBHOOK_VERIFY_TOKEN; on success it
 * echoes the challenge so Meta marks the endpoint as live. Inbound
 * messages (POST) update each phone's lastInboundAt — that's how we
 * know if we're inside the 24h conversation window for free-form
 * text replies.
 */

router.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === process.env.META_WEBHOOK_VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

router.post('/', async (req, res) => {
  // Always 200 fast so Meta doesn't retry.
  res.sendStatus(200);

  try {
    const entries = req.body?.entry || [];
    for (const entry of entries) {
      for (const change of entry.changes || []) {
        const v = change.value || {};
        const contacts = v.contacts || [];
        const messages = v.messages || [];
        for (const m of messages) {
          const phone = m.from;
          const profile = contacts.find((c) => c.wa_id === phone)?.profile?.name || '';
          await markInbound(phone, profile);
        }
      }
    }
  } catch (err) {
    logger.error('[webhook] processing failed', err);
  }
});

module.exports = router;
