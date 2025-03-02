"use client";

import FileUploader from "@/components/FileUploader";
import UploadHistory from "@/components/UploadHistory";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUpload = async () => {
    const supabase = createClient();
    const { data: user } = await supabase.auth.getUser();

    setIsUploading(true);
    for (const file of files) {
      // const { data: storageData, error: storageError } = await supabase.storage
      //   .from("apk_files")
      //   .upload(`${user.user!.id}/${file.name}`, file);

      // if (storageError) {
      //   console.error("Error uploading file to storage:", storageError);
      //   continue;
      // }

      const { error } = await supabase.from("apk_files").insert({
        name: file.name,
        // path: storageData.path,
        path: "test",
        owner: user.user!.id,
      });

      if (error) {
        console.error("Error creating database record:", error);
      }
    }
    setIsUploading(false);
    setFiles([]);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">APK File Uploader</h1>

      <FileUploader
        files={files}
        onFilesChange={setFiles}
        acceptedFileTypes={[".apk"]}
        multiple
      />

      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          className="btn btn-primary w-1/6"
          disabled={files.length === 0 || isUploading}
          onClick={handleUpload}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
        <button
          className="btn btn-secondary w-1/6"
          onClick={() => setFiles([])}
          disabled={files.length === 0 || isUploading}
        >
          Clear
        </button>
      </div>

      <UploadHistory key={refreshKey} />
    </div>
  );
}
