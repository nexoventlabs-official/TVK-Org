const express = require('express');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const Admin = require('../../models/Admin');
const logger = require('../../config/logger');
const { validateBody } = require('../../middleware/validate');
const { adminLoginSchema } = require('../../validation/schemas');

const router = express.Router();

// Rate limit login attempts: 5 attempts per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests
  message: 'Too many login attempts, please try again later',
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
});

router.post('/login', loginLimiter, validateBody(adminLoginSchema), async (req, res) => {
  try {
    const { email, password } = req.body || {};

    const admin = await Admin.findOne({ email: email.toLowerCase(), active: true });
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await admin.checkPassword(password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    admin.lastLoginAt = new Date();
    await admin.save();

    const token = jwt.sign(
      { id: admin._id, email: admin.email, name: admin.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      token,
      admin: { id: admin._id, email: admin.email, name: admin.name },
    });
  } catch (err) {
    logger.error('[admin/login] error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/me', require('../../middleware/auth'), async (req, res) => {
  const a = await Admin.findById(req.admin.id).lean();
  if (!a) return res.status(404).json({ error: 'Not found' });
  res.json({ id: a._id, email: a.email, name: a.name });
});

module.exports = router;
