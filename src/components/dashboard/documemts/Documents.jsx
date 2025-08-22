// public_kW2K8TM64y42BDQ65N3rMp87ZJPd

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Uploader } from "uploader";
import { UploadDropzone } from "react-uploader";

// Uploader instance (replace `free` with your real API key if needed)
const uploader = Uploader({ apiKey: "public_kW2K8TM64y42BDQ65N3rMp87ZJPd" });

// Define an SVG for a subtle upload icon
const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.75 3.75 0 0118 19.5H6.75z"
    />
  </svg>
);

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [docType, setDocType] = useState("BAA");
  const [uploadFile, setUploadFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // New state for loading indicator
  const token = localStorage.getItem("accessToken");

  // 📥 Fetch documents
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/docs/onboarding/documents/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDocuments(res.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    if (token) { // Ensure token exists before fetching
      fetchDocuments();
    }
  }, [token]);

  // ⬆️ Upload selected file to backend
  const handleUpload = async () => {
    if (!uploadFile) {
      alert("Please select a file to upload.");
      return;
    }

    setIsUploading(true); // Set loading state
    const formData = new FormData();
    formData.append("file", uploadFile.originalFile.file);
    formData.append("document_type", docType);

    try {
      await axios.post(
        "http://localhost:8000/api/v1/docs/onboarding/documents/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Document uploaded successfully!");
      setUploadFile(null); // Clear selected file

      // 🔁 Refresh document list
      const updated = await axios.get(
        "http://localhost:8000/api/v1/docs/onboarding/documents/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDocuments(updated.data);
    } catch (err) {
      console.error("Error uploading document:", err);
      alert("Failed to upload document. Please try again.");
    } finally {
      setIsUploading(false); // Reset loading state
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-start">
        Manage Provider Documents
      </h2>

      {/* Upload Section */}
      <div className="border border-gray-200 rounded-lg p-6 mb-8 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Upload New Document
        </h3>
        <div className="mb-4">
          <label htmlFor="doc-type" className="block text-sm font-medium text-gray-700 mb-2">
            Select Document Type
          </label>
          <select
            id="doc-type"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
          >
            <option value="BAA">Business Associate Agreement</option>
            <option value="PURCHASE_AGREEMENT">Purchase Agreement</option>
            <option value="MANUFACTURER_DOC">Manufacturer Onboarding Doc</option>
          </select>
        </div>

        <div className="mb-4">
          <UploadDropzone
            uploader={uploader}
            options={{ multi: false }}
            width="600px"
            height="250px"
            onUpdate={(files) => {
              if (files.length > 0) {
                setUploadFile(files[0]);
              } else {
                setUploadFile(null); // Clear if no file selected
              }
            }}
            // REFLECTED CHANGES: Reduced padding here from p-2 to py-1 px-2 for a more compact look
            className="border border-gray-300 rounded-md py-1 px-2 text-center text-gray-500 hover:border-blue-500 hover:bg-gray-100 transition duration-200 cursor-pointer group"
          >
            {/* REFLECTED CHANGES: Reduced vertical padding here from py-2 to py-1 */}
            <div className="flex items-center justify-center space-x-2 py-1">
              <UploadIcon />
              <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors duration-200">
                {uploadFile ? (
                  <span className="text-blue-700">File selected: {uploadFile.originalFile.file.name}</span>
                ) : (
                  "Click to select file (PDF, DOCX, JPG, PNG)"
                )}
              </span>
            </div>
          </UploadDropzone>
        </div>

        <button
          onClick={handleUpload}
          disabled={!uploadFile || isUploading} // Disable button if no file or uploading
          className={`w-full py-2 px-4 rounded-md font-semibold transition duration-200 ${
            !uploadFile || isUploading
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md"
          }`}
        >
          {isUploading ? "Uploading..." : "Submit Document"}
        </button>
      </div>

      {/* Uploaded Documents List */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
          Your Uploaded Documents
        </h3>
        {documents.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No documents uploaded yet. Start by adding one above!
          </p>
        ) : (
          <ul className="space-y-3">
            {documents.map((doc) => (
              <li
                key={doc.id}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-md px-4 py-3 shadow-sm"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">
                    {doc.document_type}
                  </span>
                  <span className="text-xs text-gray-500 mt-0.5">
                    Uploaded: {new Date(doc.uploaded_at).toLocaleDateString()}
                  </span>
                </div>
                {doc.file_url ? (
                  <a
                    href={doc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                  >
                    View
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 ml-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>
                ) : (
                  <span className="text-red-500 text-sm">File not available</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Documents;