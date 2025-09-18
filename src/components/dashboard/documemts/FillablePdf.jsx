// src/components/dashboard/documemts/FillablePdf.jsx

import React, { useState, useEffect } from "react";
import authRequest from "../../../utils/axios";
import toast from "react-hot-toast";
import EditPdfFormModal from "./EditPdfFormModal";

const FillablePdf = ({ selectedPatientId, onClose }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [formData, setFormData] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [loading, setLoading] = useState(true);

  // Helper function to get SAS URL for a blob.
  const fetchSasUrl = async (containerName, blobName) => {
    try {
      const axiosInstance = authRequest();
      const encodedBlobName = encodeURIComponent(blobName);
      const res = await axiosInstance.get(
        `/onboarding/forms/sas-url/${containerName}/${encodedBlobName}/`
      );
      return res.data.sas_url;
    } catch (error) {
      console.error("Failed to fetch SAS URL:", error);
      toast.error("Could not get secure link to PDF.");
      return null;
    }
  };

  // The main function to load an existing PDF or generate a new one.
  const loadOrCreatePdf = async () => {
    if (!selectedPatientId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const axiosInstance = authRequest();

      // Attempt to fetch existing data and blob path.
      const dataResponse = await axiosInstance.get(
        `/onboarding/forms/prepopulate-data/`,
        {
          params: {
            patient_id: selectedPatientId,
            form_type: "IVR_FORM",
          },
        }
      );
      setFormData(dataResponse.data);

      const blobPath = dataResponse.data.completed_form_blob_path;
      if (blobPath) {
        // If a blob path exists, get the SAS URL for the existing PDF.
        const sasUrl = await fetchSasUrl("media", blobPath);
        if (sasUrl) {
          setPdfUrl(sasUrl);
          toast.success("Existing PDF loaded successfully!");
          return;
        }
      }

      // If no existing form, generate a new one.
      const pdfResponse = await axiosInstance.get(
        `/onboarding/forms/prepopulate/`,
        {
          params: {
            patient_id: selectedPatientId,
            form_type: "IVR_FORM",
          },
          responseType: "blob",
        }
      );
      const blob = new Blob([pdfResponse.data], { type: "application/pdf" });
      const blobUrl = URL.createObjectURL(blob);
      setPdfUrl(blobUrl);
      toast.success("New PDF generated successfully!");
    } catch (error) {
      console.error("Failed to load or generate PDF:", error);
      toast.error("Failed to load or generate PDF.");
    } finally {
      setLoading(false);
    }
  };

  // Function to save the form and wait for the blob to be created.
  const handleSavePatientIVR = async () => {
    if (!selectedPatientId) {
      toast.error("No patient selected.");
      return;
    }

    setLoading(true);
    try {
      const axiosInstance = authRequest();
      const response = await axiosInstance.post("/onboarding/forms/fill/", {
        patient_id: selectedPatientId,
        form_type: "IVR_FORM",
        form_data: formData || {},
      });
      const newBlobPath = response.data.completed_form_blob_path;

      // Start a polling loop to wait for the blob to exist.
      const pollInterval = setInterval(async () => {
        try {
          const axiosInstance = authRequest();
          const containerName = "media";
          const encodedBlobName = encodeURIComponent(newBlobPath);

          // Check the status of the blob.
          const statusRes = await axiosInstance.get(
            `/onboarding/forms/check-blob/${containerName}/${encodedBlobName}/`
          );

          if (statusRes.data.exists) {
            clearInterval(pollInterval);
            const sasUrl = await fetchSasUrl(containerName, newBlobPath);
            setPdfUrl(sasUrl);
            setLoading(false);
            toast.success("Patient IVR form saved to cloud!");
          }
        } catch (error) {
          console.error("Polling for blob failed:", error);
          // Stop polling on a catastrophic error.
          clearInterval(pollInterval);
          setLoading(false);
          toast.error("Error saving and checking form.");
        }
      }, 3000); // Poll every 3 seconds.
    } catch (error) {
      console.error("Failed to save form:", error);
      setLoading(false);
      toast.error("Error saving form.");
    }
  };

  const handleEditorSuccess = async (newPdfUrl, updatedData) => {
    setFormData(updatedData);
    setPdfUrl(newPdfUrl);
    setLoading(false);
    setShowEditor(false);
    toast.success("PDF preview re-generated successfully!");
  };

  useEffect(() => {
    if (selectedPatientId) {
      loadOrCreatePdf();
    }
  }, [selectedPatientId]);

  return (
    <div className="pdf-fill-container" style={{ padding: "2rem" }}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {loading && <p>Loading PDF...</p>}

      {!loading && pdfUrl && (
        <>
          <h3>Preview:</h3>
          <iframe
            src={pdfUrl}
            width="100%"
            height="600px"
            title="PDF Preview"
            style={{ border: "1px solid #ccc" }}
          ></iframe>
          {/* <iframe
            src='https://form.jotform.com/252594933893069'
            width="100%"
            height="600px"
            title="PDF Preview"
            style={{ border: "1px solid #ccc" }}
          ></iframe> */}
          <div className="mt-4 flex gap-4">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Download PDF
            </a>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setShowEditor(true)}
            >
              Edit PDF Fields
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={handleSavePatientIVR}
            >
              Save Patient IVR
            </button>
          </div>
        </>
      )}

      {showEditor && (
        <EditPdfFormModal
          formData={formData || {}}
          patientId={selectedPatientId}
          onClose={() => setShowEditor(false)}
          onSuccess={handleEditorSuccess}
        />
      )}
    </div>
  );
};

export default FillablePdf;