import { convertToBase64 } from "./convertToBase64";

export default async function uploadImage(image) {
    const base64Image = await convertToBase64(image);

    // console.log("Converted Image (First 100 chars):", base64Image.slice(0, 100));

    const response = await fetch('/api/upload', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image })
    })

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