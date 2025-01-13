import { useState } from "react";
import {
  removeFileFromCloudinary,
  uploadFileToCloudinary,
} from "../services/cloudinaryService";

export const useFileUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const uploadFile = async (imageBlob: Blob, folderName: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await uploadFileToCloudinary(imageBlob, folderName);
      return result;
    } catch (err) {
      setError((err as Error)?.message || "Upload failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = async (publicId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await removeFileFromCloudinary(publicId);
      return result;
    } catch (err) {
      setError((err as Error)?.message || "Remove failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadFile, removeFile, isLoading, error };
};
