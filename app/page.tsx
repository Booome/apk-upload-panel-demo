"use client";

import FileUploader from "@/components/FileUploader";
import { useState } from "react";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">APK File Uploader</h1>

      <FileUploader
        files={files}
        onFilesChange={setFiles}
        acceptedFileTypes={[".apk"]}
        multiple
      />

      {files.length > 0 && (
        <div className="mt-4">
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={() => {
              // Handle the file processing here
              console.log(
                "Processing file:",
                files.map((file) => file.name),
              );
            }}
          >
            Process APK
          </button>
          <button
            className="ml-2 rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
            onClick={() => setFiles([])}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
