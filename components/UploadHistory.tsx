import { createClient } from "@/lib/supabase/client";
import { FileMetadata } from "@/lib/types";
import { useEffect, useState } from "react";

export default function UploadHistory() {
  const [files, setFiles] = useState<FileMetadata[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("apk_files").select("*");
      if (error) {
        console.error("Error fetching files:", error);
      }

      setFiles(data as FileMetadata[]);
    };

    fetchFiles();
  }, []);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Upload History</h2>
      <div className="overflow-x-auto">
        <table className="table-zebra table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Path</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {[...files]
              .reverse()
              .slice(0, 10)
              .map((file) => (
                <tr key={file.id}>
                  <td>{file.id}</td>
                  <td>{file.name}</td>
                  <td>{file.path}</td>
                  <td>{new Date(file.created_at).toLocaleString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
