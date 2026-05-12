import { UploadApiResponse } from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadToCloud = async (file: File): Promise<UploadApiResponse> => {
  const buffer = Buffer.from(await file.arrayBuffer());

  const isPdf = file.type === 'application/pdf';
  const isImage = file.type.startsWith('image/');
  const isZip =
    file.type === 'application/zip' ||
    file.type === 'application/x-zip-compressed' ||
    file.name.toLowerCase().endsWith('.zip');

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'lms',

        // PDFs + Images => previewable
        // ZIP => raw downloadable file
        // Others => keep existing behavior
        resource_type: isPdf || isImage ? 'image' : isZip ? 'raw' : 'auto',

        // preserve original filename
        use_filename: true,
        unique_filename: true,

        ...(isZip && { format: 'zip' }),
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('Upload failed'));

        resolve(result);
      }
    );

    Readable.from(buffer).pipe(stream);
  });
};

export const deleteFromCloud = async (publicId: string, resourceType: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    return result;
  } catch (error) {
    console.error('Cloudinary deletion error:', error);
    throw error;
  }
};
