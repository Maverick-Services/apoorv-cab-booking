import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  })
}

export const extractPublicId = (imageURL) => {
  const parts = imageURL.split("/");
  const filename = parts[parts.length - 1];
  const publicId = filename.split(".")[0];

  const folder = parts[parts.length - 2];
  return folder !== "upload" ? `${folder}/${publicId}` : publicId;
};

export default async function uploadImage(image) {
  const base64Image = await convertToBase64(image);

  const response = await fetch('/api/upload', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: base64Image })
  })

  if (!response?.ok) {
    throw new Error("Error in uploading Image")
  }

  const imageURL = await response.json();
  return imageURL;
}

export async function deleteImage(publicId) {
  console.log("public id" + publicId)
  await fetch('/api/delete', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ publicId })
  })
}