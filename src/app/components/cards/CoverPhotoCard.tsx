import React, { useState } from "react";
import { FaTimes, FaUpload } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import { useFileUpload } from "../../utils/useFileUpload";
interface CoverPhotoCardProps {
  title: string;
  description?: string;
  className?: string;
  folderName: string;
  onFileChange: (file: File | null) => void;
  publicId?: string | null;
  setPublicId?: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CoverPhotoCard: React.FC<CoverPhotoCardProps> = ({
  title,
  description,
  className = "",
  folderName,
  onFileChange,
  publicId,
  setPublicId,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  const { uploadFile, removeFile } = useFileUpload();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      const result = await handleFileUpload(file);
      setBackgroundImage(result.url);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const result = await handleFileUpload(file);
      setBackgroundImage(result.url);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      const result = await uploadFile(file, folderName);
      setPublicId && setPublicId(result.public_id); // Save the public ID from Cloudinary
      onFileChange(file);
      return result;
    } catch (err) {
      console.error("File upload failed", err);
      return { url: "" };
    }
  };

  const handleRemovePhoto = async () => {
    if (publicId) {
      await removeFile(publicId);
      setBackgroundImage(null); // Remove the image from state
      setPublicId && setPublicId(null); // Reset the public ID
      onFileChange(null);
    }
  };

  const handleChangePhotoClick = () => {
    document.getElementById("cover-photo-input")?.click();
  };

  return (
    <div
      className={twMerge(
        `relative h-[300px] p-4 border border-dashed rounded-md shadow-md flex flex-col items-center justify-center text-center transition-all duration-200`,
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300",
        backgroundImage ? "bg-cover bg-center" : "",
        className
      )}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {!backgroundImage && (
        <div className="z-10">
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <div>
              <p className="mt-2 text-sm text-gray-600">{description}</p>
              <p className="mt-2 text-sm text-gray-400">(optional)</p>
            </div>
          )}
          <button
            onClick={handleChangePhotoClick}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full flex items-center hover:bg-blue-600 mx-auto"
          >
            <FaUpload className="mr-2" /> Upload Photo
          </button>
        </div>
      )}
      {backgroundImage && (
        <div className="absolute bottom-5 right-5 flex items-center space-x-3 text-white">
          <button
            onClick={handleChangePhotoClick}
            className="bg-white text-black py-3 px-3 rounded-full hover:bg-gray-200"
          >
            <FaPencil className="text-xl text-blue-500" />
          </button>
          <button
            onClick={handleRemovePhoto}
            className="bg-red-500 text-white py-3 px-3 rounded-full hover:bg-red-600"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
      )}
      <input
        id="cover-photo-input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden" // Hide the input by default
      />
    </div>
  );
};
