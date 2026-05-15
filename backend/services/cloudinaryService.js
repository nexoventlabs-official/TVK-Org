/**
 * Thin wrapper around the Cloudinary SDK so the rest of the codebase
 * doesn't have to know about the underlying client.
 *
 *   uploadBuffer(buffer, { slot, mimetype })
 *     - streams the buffer to Cloudinary under a fixed folder, using the
 *       slot key as a deterministic public_id so re-uploads overwrite
 *       the previous file rather than leaving orphans.
 *
 *   destroy(publicId)
 *     - removes the asset from Cloudinary so deleting a slot does not
 *       leave billable orphans behind.
 *
 * Configuration comes from CLOUDINARY_CLOUD_NAME / API_KEY / API_SECRET
 * and an optional CLOUDINARY_FOLDER prefix in .env.
 */

const cloudinary = require('cloudinary').v2;
const { Readable } = require('stream');
const logger = require('../config/logger');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const FOLDER = (process.env.CLOUDINARY_FOLDER || 'venkatraman/site').replace(/\/+$/, '');

function isConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

/**
 * Upload a buffer (e.g. the file multer parsed from a multipart form)
 * to Cloudinary. Resolves with the upload result; rejects on any
 * Cloudinary-side failure.
 */
function uploadBuffer(buffer, { slot }) {
  if (!isConfigured()) {
    return Promise.reject(new Error('Cloudinary credentials are not configured'));
  }
  if (!Buffer.isBuffer(buffer) || buffer.length === 0) {
    return Promise.reject(new Error('Empty file buffer'));
  }
  if (!slot || typeof slot !== 'string') {
    return Promise.reject(new Error('Missing slot key'));
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: FOLDER,
        public_id: slot, // stable per slot → re-uploads overwrite cleanly
        overwrite: true,
        invalidate: true, // bust the CDN cache on re-upload
        resource_type: 'image',
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
    Readable.from(buffer).pipe(stream);
  });
}

async function destroy(publicId) {
  if (!isConfigured() || !publicId) return null;
  try {
    return await cloudinary.uploader.destroy(publicId, { invalidate: true });
  } catch (err) {
    // Best-effort delete: log + swallow so a missing remote asset
    // doesn't block the DB record being cleared.
    logger.warn('[cloudinary] destroy failed', { error: err?.message || err });
    return null;
  }
}

module.exports = { uploadBuffer, destroy, isConfigured };
