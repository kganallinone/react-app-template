import React, { useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { twMerge } from "tailwind-merge";

interface UploadCardProps {
  title?: string;
  description?: string;
  file?: File | null;
  onFileChange: (files: FileList | null) => void; // Expects FileList or null
  className?: string;
  isMultiFile?: boolean; // New prop to determine multi-file upload
  acceptedFileTypes?: string[]; // Changed to an array of strings
  uploadedFiles?: File[];
  setUploadedFiles?: React.Dispatch<React.SetStateAction<File[]>>;
}

export const UploadCard = ({
  title,
  description,
  onFileChange,
  className = "",
  isMultiFile = false, // Default to false
  acceptedFileTypes = [], // Default to an empty array
  uploadedFiles = [], // Default to an empty array
  setUploadedFiles = () => {},
}: UploadCardProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    updateFiles(files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []); // Extract files from the input event
    updateFiles(files);
  };

  const handleUploadClick = () => {
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    input?.click(); // Trigger the click on the file input
  };

  const updateFiles = (files: File[]) => {
    if (isMultiFile) {
      setUploadedFiles((prev) => [...prev, ...files]); // Add new files to the list
      const fileList = createFileList([...uploadedFiles, ...files]);
      onFileChange(fileList); // Update the onFileChange handler
    } else {
      setUploadedFiles(files.slice(0, 1)); // Only keep the first file
      onFileChange(files[0] ? createFileList([files[0]]) : null); // Pass the single file as FileList or null
    }
  };

  const createFileList = (files: File[]) => {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => dataTransfer.items.add(file)); // Add each file to the DataTransfer
    return dataTransfer.files; // Return the FileList from the DataTransfer
  };

  // Join accepted file types into a string for the accept attribute
  const acceptedFileTypesString = acceptedFileTypes.join(", ");

  return (
    <div
      className={twMerge(
        `p-4 border-2 h-[300px] border-dashed rounded-md shadow-md bg-white flex flex-col items-center justify-center text-center transition-all duration-200`,
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      )}

      <input
        type="file"
        onChange={handleFileChange} // File input handler
        multiple={isMultiFile} // Allow multiple files if isMultiFile is true
        accept={acceptedFileTypesString} // Set accepted file types
        className="hidden" // Hides the file input
      />
      <span
        className="mt-4 text-gray-400 cursor-pointer text-center"
        onClick={handleUploadClick}
      >
        <IoMdCloudUpload className="mx-auto" size={20} />
        Click here to upload a file
      </span>

      {/* Display uploaded files */}
      {isMultiFile ? (
        <ul className="mt-4 w-full text-left">
          {uploadedFiles.map((file, index) => (
            <li key={index} className="text-gray-700">
              {file.name}
            </li>
          ))}
        </ul>
      ) : (
        uploadedFiles.length > 0 && (
          <p className="mt-4 text-gray-700">
            Uploaded: {uploadedFiles[0].name}
          </p>
        )
      )}
    </div>
  );
};
