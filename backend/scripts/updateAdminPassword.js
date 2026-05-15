require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

async function updateAdminPassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('[updatePassword] connected to MongoDB');

    const email = (process.env.DEFAULT_ADMIN_EMAIL || 'admin@venkatraman.in').toLowerCase();
    const newPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'admin@123';

    const passwordHash = await bcrypt.hash(newPassword, 10);

    let admin = await Admin.findOne({ email });
    if (!admin) {
      admin = new Admin({ email, name: 'Admin', passwordHash, active: true });
      await admin.save();
      console.log(`[updatePassword] ✓ Admin created: ${email}`);
    } else {
      admin.passwordHash = passwordHash;
      admin.active = true;
      await admin.save();
      console.log(`[updatePassword] ✓ Password updated for ${email}`);
    }
    console.log(`[updatePassword] New password: ${newPassword}`);

    process.exit(0);
  } catch (err) {
    console.error('[updatePassword] error:', err);
    process.exit(1);
  }
}

updateAdminPassword();
