"use client";

import imageCompression from "browser-image-compression";

export default async function compressImage(file: File) {
  const options = {
    maxSizeMB: 9.5, // 최대 9.5MB로 압축
    maxWidthOrHeight: 1920, // 가로 또는 세로 최대 크기
    useWebWorker: true,
  };

  try {
    const compressedBlob = await imageCompression(file, options);
    const compressedFile = new File([compressedBlob], file.name, {
      type: file.type,
    });

    return compressedFile;
  } catch (error) {
    console.error("이미지 압축 실패:", error);
    return file;
  }
}
