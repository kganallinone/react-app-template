import CryptoJS from "crypto-js";
import { CLOUDINARY } from "../config/config";

// Upload file to Cloudinary
export const uploadFileToCloudinary = async (
  file: File | Blob,
  folderName: string
): Promise<any> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("cloud_name", CLOUDINARY.CLOUD_NAME);
  formData.append("upload_preset", CLOUDINARY.UPLOAD_PRESET_UNASIGNED);
  formData.append("folder", `${CLOUDINARY.DEFAULT_FOLDER}/${folderName}`);

  try {
    const response = await fetch(CLOUDINARY.IMAGE_UPLOAD_ENDPOINT, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload the file to Cloudinary.");
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Upload failed: ${(error as Error).message}`);
  }
};

// Remove file from Cloudinary
export const removeFileFromCloudinary = async (
  publicId: string
): Promise<any> => {
  const timeStampNow = Math.floor(Date.now() / 1000); // Cloudinary expects seconds, not milliseconds
  const stringToHash = `public_id=${publicId}&timestamp=${timeStampNow}${CLOUDINARY.API_SECRET}`;
  const hashSignature = CryptoJS.SHA1(stringToHash).toString(CryptoJS.enc.Hex); // Ensure hash is in hex

  const formData = new FormData();
  formData.append("api_key", CLOUDINARY.API_KEY);
  formData.append("public_id", publicId);
  formData.append("timestamp", timeStampNow.toString());
  formData.append("signature", hashSignature);

  try {
    const response = await fetch(CLOUDINARY.IMAGE_DESTROY_ENDPOINT, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to remove image from Cloudinary.");
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Removal failed: ${(error as Error).message}`);
  }
};
