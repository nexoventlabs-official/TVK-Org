require('dotenv').config();
const mongoose = require('mongoose');
const SiteImage = require('../models/SiteImage');

/**
 * Seed script to populate the database with existing Cloudinary images
 * so they appear in the admin panel.
 */

const images = [
  {
    slot: 'hero_portrait',
    url: 'https://res.cloudinary.com/dvfg6e0vu/image/upload/v1778766551/venkatraman/site/hero_portrait.png',
    publicId: 'venkatraman/site/hero_portrait',
    width: 800,
    height: 1000,
    format: 'png',
    bytes: 500000,
  },
  {
    slot: 'gallery_1',
    url: 'https://res.cloudinary.com/dvfg6e0vu/image/upload/v1778767051/venkatraman/site/gallery_1.jpg',
    publicId: 'venkatraman/site/gallery_1',
    width: 1200,
    height: 800,
    format: 'jpg',
    bytes: 300000,
  },
  {
    slot: 'gallery_2',
    url: 'https://res.cloudinary.com/dvfg6e0vu/image/upload/v1778766941/venkatraman/site/gallery_2.jpg',
    publicId: 'venkatraman/site/gallery_2',
    width: 800,
    height: 800,
    format: 'jpg',
    bytes: 250000,
  },
  {
    slot: 'gallery_3',
    url: 'https://res.cloudinary.com/dvfg6e0vu/image/upload/v1778766949/venkatraman/site/gallery_3.jpg',
    publicId: 'venkatraman/site/gallery_3',
    width: 800,
    height: 800,
    format: 'jpg',
    bytes: 250000,
  },
  {
    slot: 'gallery_4',
    url: 'https://res.cloudinary.com/dvfg6e0vu/image/upload/v1778766960/venkatraman/site/gallery_4.jpg',
    publicId: 'venkatraman/site/gallery_4',
    width: 800,
    height: 800,
    format: 'jpg',
    bytes: 250000,
  },
  {
    slot: 'gallery_5',
    url: 'https://res.cloudinary.com/dvfg6e0vu/image/upload/v1778766967/venkatraman/site/gallery_5.jpg',
    publicId: 'venkatraman/site/gallery_5',
    width: 800,
    height: 800,
    format: 'jpg',
    bytes: 250000,
  },
  {
    slot: 'gallery_6',
    url: 'https://res.cloudinary.com/dvfg6e0vu/image/upload/v1778766976/venkatraman/site/gallery_6.jpg',
    publicId: 'venkatraman/site/gallery_6',
    width: 800,
    height: 800,
    format: 'jpg',
    bytes: 250000,
  },
  {
    slot: 'gallery_7',
    url: 'https://res.cloudinary.com/dvfg6e0vu/image/upload/v1778767007/venkatraman/site/gallery_7.jpg',
    publicId: 'venkatraman/site/gallery_7',
    width: 800,
    height: 800,
    format: 'jpg',
    bytes: 250000,
  },
];

async function seedImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('[seedImages] connected to MongoDB');

    for (const img of images) {
      await SiteImage.findOneAndUpdate(
        { slot: img.slot },
        {
          ...img,
          uploadedBy: 'system',
        },
        { upsert: true, new: true }
      );
      console.log(`[seedImages] ✓ ${img.slot}`);
    }

    console.log('[seedImages] done! All images seeded.');
    process.exit(0);
  } catch (err) {
    console.error('[seedImages] error:', err);
    process.exit(1);
  }
}

seedImages();
