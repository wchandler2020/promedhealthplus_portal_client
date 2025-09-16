import React, { useState, useEffect } from "react";
import authRequest from "../../../utils/axios";
import toast from "react-hot-toast";
import EditPdfFormModal from "./EditPdfFormModal";

const FillablePdf = ({ selectedPatientId }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [formData, setFormData] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [loading, setLoading] = useState(true);

  const getBlobNameFromUrl = (url) => {
    const match = url.match(/\/[^\/]+\/(.+)$/);
    return match ? match[1] : null;
  };

  const handleSavePatientIVR = async () => {
    if (!selectedPatientId) {
      toast.error("No patient selected.");
      return;
    }
    try {
      const axiosInstance = authRequest();
      const response = await axiosInstance.post("/onboarding/forms/fill/", {
        patient_id: selectedPatientId,
        form_type: "IVR_FORM",
        form_data: formData || {},
      });
      const newBlobPath = response.data.completed_form_blob_path;
      // Polling loop to wait for the blob to exist
      const pollInterval = setInterval(async () => {
        try {
          const axiosInstance = authRequest();
          const containerName = "media";
          // const cleanedBlobPath = newBlobPath.replace(/^providers\//, ""); // strip 'providers/' if present
          const encodedBlobName = encodeURIComponent(newBlobPath);

          const statusRes = await axiosInstance.get(
            `/onboarding/forms/check-blob/${containerName}/${encodedBlobName}/`
          );

          if (statusRes.data.exists) {
            clearInterval(pollInterval);
           const sasUrl = await fetchSasUrl(containerName, encodedBlobName);
            setPdfUrl(sasUrl);
            toast.success("Patient IVR form saved to cloud!");
          }
        } catch (error) {
          console.error("Polling for blob failed:", error);
        }
      }, 3000);
    } catch (error) {
      console.error("Failed to save form:", error);
      toast.error("Error saving form.");
    }
  };
  const fetchSasUrl = async (blobName) => {
    try {
      const axiosInstance = authRequest();
      // The URL needs a trailing slash to match the Django pattern.
      // The blobName itself should NOT have a trailing slash.
      const res = await axiosInstance.get(
        `/onboarding/forms/sas-url/${blobName}/`
      );
      return res.data.sas_url;
    } catch (error) {
      console.error("Failed to fetch SAS URL:", error);
      toast.error("Could not get secure link to PDF.");
      return null;
    }
  };

  const loadBlankPdf = () => {
    const blankPdfUrl = `${process.env.REACT_APP_PYTHONANYWHERE_API}/onboarding/forms/blank/IVR_FORM/`;
    // const blankPdfUrl = `${process.env.REACT_APP_API_URL}/onboarding/forms/blank/IVR_FORM/`;
    setPdfUrl(blankPdfUrl);
    setFormData(null);
    setLoading(false);
  };

  const handleGeneratePdf = async () => {
    if (!selectedPatientId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const axiosInstance = authRequest();
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

      toast.success("PDF generated successfully!");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      toast.error("Failed to generate PDF");
    } finally {
      setLoading(false);
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
    handleGeneratePdf();
  }, [selectedPatientId]);

  return (
    <div className="pdf-fill-container" style={{ padding: "2rem" }}>
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
          onSuccess={handleEditorSuccess} // Pass the new, correct handler
        />
      )}
    </div>
  );
};

export default FillablePdf;
