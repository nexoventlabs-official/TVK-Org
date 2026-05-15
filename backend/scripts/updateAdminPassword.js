require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

async function updateAdminPassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('[updatePassword] connected to MongoDB');

    const email = process.env.DEFAULT_ADMIN_EMAIL || 'admin@venkatraman.in';
    const newPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'VenkatAdmin2026!Secure';

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await Admin.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (result) {
      console.log(`[updatePassword] ✓ Password updated for ${email}`);
      console.log(`[updatePassword] New password: ${newPassword}`);
    } else {
      console.log(`[updatePassword] ✗ Admin not found: ${email}`);
    }

    process.exit(0);
  } catch (err) {
    console.error('[updatePassword] error:', err);
    process.exit(1);
  }
}

updateAdminPassword();
