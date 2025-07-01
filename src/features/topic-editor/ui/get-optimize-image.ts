'use server';
import sharp from 'sharp';

export const getOptimizeImage = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  return await sharp(arrayBuffer)
    .jpeg({
      quality: 75,
    })
    .toBuffer()
    .then((buffer) => buffer.toString('base64'));
};
