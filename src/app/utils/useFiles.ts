import { useState } from "react";

const useFiles = () => {
  const [hasFiles, setHasFiles] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (files: File | File[]) => {
    if (Array.isArray(files)) {
      if (files.length > 0) {
        handleSingleFileUpload(files[0]);
      }
    } else {
      handleSingleFileUpload(files);
    }
  };

  const handleSingleFileUpload = (file: File) => {
    const fileUrl = URL.createObjectURL(file);
    setHasFiles(fileUrl);
    setUploadedFile(file);
  };

  const clearFile = () => {
    setHasFiles(null);
    setUploadedFile(null);
  };

  return {
    hasFiles,
    setHasFiles,
    uploadedFile,
    handleFileUpload,
    clearFile,
  };
};

export default useFiles;
