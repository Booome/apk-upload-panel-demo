import { XCircleIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, DragEvent, useRef, useState } from "react";

interface FileUploaderProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  acceptedFileTypes: string[];
  multiple?: boolean;
}

export default function FileUploader({
  files,
  onFilesChange,
  acceptedFileTypes,
  multiple = false,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (
      dropAreaRef.current &&
      !dropAreaRef.current.contains(e.relatedTarget as Node)
    ) {
      setIsDragging(false);
    }
  };

  const isFileTypeValid = (file: File) => {
    return acceptedFileTypes.some((type) => file.name.endsWith(type));
  };

  const handleFileListChange = (newFiles: File[]) => {
    const validFiles = newFiles.filter(
      (file) =>
        isFileTypeValid(file) && !files.map((f) => f.name).includes(file.name),
    );
    const invalidFiles = newFiles.filter((file) => !isFileTypeValid(file));

    if (invalidFiles.length > 0) {
      alert(
        invalidFiles.map((file) => file.name).join(", ") +
          " are invalid files. Please upload " +
          acceptedFileTypes +
          " files only.",
      );
    }

    if (validFiles.length > 0) {
      onFilesChange([...files, ...validFiles]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      handleFileListChange(selectedFiles);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      handleFileListChange(droppedFiles);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (index: number) => {
    const filesClone = [...files];
    filesClone.splice(index, 1);
    onFilesChange(filesClone);
  };

  return (
    <div
      ref={dropAreaRef}
      className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center ${
        isDragging ? "border-primary bg-primary/10" : "border-base-content/30"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedFileTypes.join(",")}
        className="hidden"
        multiple={multiple}
      />

      {files.length > 0 ? (
        <div>
          <p className="text-success mb-2 font-medium">
            {files.length} {files.length === 1 ? "file" : "files"} selected:
          </p>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="bg-base-200 flex items-center justify-between rounded p-2"
              >
                <div className="flex-1 text-left">
                  <p className="flex items-center justify-between truncate">
                    <span>{file.name}</span>
                    <span className="text-base-content/60 ml-2 text-sm">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </p>
                </div>
                <button
                  className="text-error hover:text-error/80 ml-2 rounded-full p-1 hover:cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(index);
                  }}
                >
                  <XCircleIcon className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
          <p className="text-base-content/60 mt-4 text-sm">
            Click or drag to add more {multiple ? "files" : ""}
          </p>
        </div>
      ) : (
        <div>
          <p className="mb-2 text-lg">
            Drag and drop {multiple ? "files" : "a file"} here
          </p>
          <p className="text-base-content/60 text-sm">
            or click to select {multiple ? "files" : "a file"}
          </p>
        </div>
      )}
    </div>
  );
}
