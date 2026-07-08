import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config.js';

let configured = false;

export function getCloudinary() {
  if (!configured) {
    cloudinary.config({
      cloud_name: config.cloudinary.cloudName,
      api_key: config.cloudinary.apiKey,
      api_secret: config.cloudinary.apiSecret,
      secure: true,
    });
    configured = true;
  }
  return cloudinary;
}

export const cloudinaryReady = () =>
  Boolean(
    config.cloudinary.cloudName &&
      config.cloudinary.apiKey &&
      config.cloudinary.apiSecret
  );

/**
 * Upload a file buffer to Cloudinary.
 * `resourceType` = 'image' for photos, 'raw' for PDFs/documents.
 */
export function uploadBuffer(
  buffer: Buffer,
  folder: string,
  resourceType: 'image' | 'raw' = 'image'
): Promise<{ url: string; publicId: string }> {
  const cld = getCloudinary();
  return new Promise((resolve, reject) => {
    const stream = cld.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (err, result) => {
        if (err || !result) return reject(err || new Error('Upload failed'));
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(buffer);
  });
}
