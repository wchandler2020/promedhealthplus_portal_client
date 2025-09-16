import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../utils/constants";
import { FaUpload, FaFilePdf, FaFileWord, FaFileImage } from "react-icons/fa";

// Custom icons for a clean look
const UploadIcon = () => (
  <FaUpload className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
);

// File type icons for visual feedback
const FileIcon = ({ filename }) => {
  const extension = filename.split('.').pop().toLowerCase();
  switch (extension) {
    case 'pdf':
      return <FaFilePdf className="text-red-500" />;
    case 'doc':
    case 'docx':
      return <FaFileWord className="text-blue-500" />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <FaFileImage className="text-green-500" />;
    default:
      return <FaUpload className="text-gray-500" />;
  }
};

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [docType, setDocType] = useState("BAA");
  const [uploadFile, setUploadFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const token = localStorage.getItem("accessToken");
  const fileInputRef = useRef(null);

  // 📥 Fetch documents
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/onboarding/documents/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDocuments(res.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    if (token) {
      fetchDocuments();
    }
  }, [token]);

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setUploadFile(e.target.files[0]);
    } else {
      setUploadFile(null);
    }
  };

  // ⬆️ Upload selected file to backend
  const handleUpload = async () => {
    if (!uploadFile) {
      alert("Please select a file to upload.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("document_type", docType);

    try {
      await axios.post(`${API_BASE_URL}/onboarding/documents/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Document uploaded successfully!");
      setUploadFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // 🔁 Refresh document list
      const updated = await axios.get(
        `${API_BASE_URL}/onboarding/documents/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDocuments(updated.data);
    } catch (err) {
      console.error("Error uploading document:", err);
      alert("Failed to upload document. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-9 p-4 sm:p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 sm:mb-8">
        Manage Provider Documents
      </h2>

      {/* Upload Section */}
      <div className="border border-gray-200 rounded-lg p-4 sm:p-6 mb-8 bg-gray-50 transition-colors duration-200">
        <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4 text-center">
          Upload New Document
        </h3>
        
        {/* Document Type Selection */}
        <div className="mb-4">
          <label
            htmlFor="doc-type"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Document Type
          </label>
          <select
            id="doc-type"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
          >
            <option value="BAA">Business Associate Agreement</option>
            <option value="PURCHASE_AGREEMENT">Purchase Agreement</option>
            <option value="MANUFACTURER_DOC">Manufacturer Onboarding Doc</option>
            <option value="PROVIDER_REVIEW_DOC">Provider Document Review</option>
          </select>
        </div>

        {/* File Dropzone */}
        <div className="mb-4">
          <label
            htmlFor="file-upload"
            className="w-full min-h-[120px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 text-center text-gray-500 hover:border-blue-500 hover:bg-gray-100 transition-all duration-200 cursor-pointer group"
          >
            <input
              id="file-upload"
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center space-y-2">
              <span className="text-2xl text-gray-400 group-hover:text-blue-500">
                <FaUpload />
              </span>
              <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600">
                {uploadFile ? (
                  <div className="flex items-center space-x-2 text-blue-700">
                    <FileIcon filename={uploadFile.name} />
                    <span>File selected: {uploadFile.name}</span>
                  </div>
                ) : (
                  <>
                    <p className="hidden sm:block">
                      Drag & Drop files here or
                      <span className="text-blue-600 font-bold ml-1">
                        Browse
                      </span>
                    </p>
                    <p className="block sm:hidden">
                      Click here to
                      <span className="text-blue-600 font-bold ml-1">
                        Browse
                      </span>
                    </p>
                  </>
                )}
              </span>
              <span className="text-xs text-gray-400 mt-1">
                (PDF, DOCX, JPG, PNG)
              </span>
            </div>
          </label>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleUpload}
          disabled={!uploadFile || isUploading}
          className={`w-full py-2 px-4 rounded-md font-semibold transition duration-200 ${
            !uploadFile || isUploading
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
          }`}
        >
          {isUploading ? "Uploading..." : "Submit Document"}
        </button>
      </div>
      
      {/* Uploaded Documents List */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
          Your Uploaded Documents
        </h3>
        {documents.length === 0 ? (
          <p className="text-gray-500 text-center py-4 text-sm sm:text-base">
            No documents uploaded yet. Start by adding one above!
          </p>
        ) : (
          <ul className="space-y-3">
            {documents.map((doc) => (
              <li
                key={doc.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white border border-gray-200 rounded-md p-3 sm:px-4 sm:py-3 shadow-sm"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800 text-sm sm:text-base">
                    {doc.document_type}
                  </span>
                  <span className="text-xs text-gray-500 mt-0.5">
                    Uploaded: {new Date(doc.uploaded_at).toLocaleDateString()}
                  </span>
                </div>
                {doc.file ? (
                  <a
                    href={doc.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium flex items-center space-x-1 mt-2 sm:mt-0"
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
                  <span className="text-red-500 text-xs sm:text-sm mt-2 sm:mt-0">
                    File not available
                  </span>
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