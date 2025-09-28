import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../utils/auth";
import { Box, Modal } from "@mui/material";
import { motion } from "framer-motion"; // 💥 Import motion
import { format } from "date-fns";
import { FaEye, FaSearch, FaSlidersH } from "react-icons/fa";
import FillablePdf from "../documemts/FillablePdf";
import PatientCard from "./PatientCard";
import toast from "react-hot-toast";
import { states } from "../../../utils/data";

// 💥 NEW: Modal Animation Variants for smooth transition
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.25,
    },
  },
};

const ivrStatusBadge = ({ status }) => {
  const colors = {
    Approved:
      "bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-200",
    Pending:
      "bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-200",
    Denied: "bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200",
  };
  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded ${colors[status]}`}
    >
      {status}
    </span>
  );
};

// ----------------------------------------------------------------------
// Command Center Filter Modal Component (MODIFIED)
// ----------------------------------------------------------------------
const FilterCommandCenter = ({
  open,
  handleClose,
  ivrFilter,
  setIvrFilter,
  activationFilter,
  setActivationFilter,
  patientsPerPage,
  setPatientsPerPage,
}) => {
  const filterModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: 400,
    maxHeight: "90vh",
    bgcolor: "transparent",
    boxShadow: "none",
    outline: "none",
  };

  const handlePatientsPerPageChange = (e) => {
    setPatientsPerPage(Number(e.target.value));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      // 💥 Crucial for Framer Motion: disable MUI's default transition
      disablePortal
      keepMounted
      hideBackdrop={false}
    >
      <Box sx={filterModalStyle}>
        {/* 💥 FIX: Apply motion.div with variants here */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 mx-4 border border-gray-100 dark:border-gray-700 relative"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
        >
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 transition"
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

          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
            Patient Filter Command Center
          </h3>

          {/* IVR Status Filter */}
          <div className="mb-6">
            <label
              htmlFor="ivr-filter"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              Filter by IVR Status:
            </label>
            <select
              id="ivr-filter"
              value={ivrFilter}
              onChange={(e) => setIvrFilter(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:ring-teal-500 focus:border-teal-500 transition"
            >
              <option value="">All Statuses</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Denied">Denied</option>
            </select>
          </div>

          {/* Activation Filter (Radio Buttons) */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Filter by Activation:
            </label>
            <div className="flex space-x-4 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700">
              <label
                htmlFor="active-all"
                className="flex items-center text-sm text-gray-700 dark:text-gray-200"
              >
                <input
                  type="radio"
                  id="active-all"
                  name="activation-filter"
                  value=""
                  checked={activationFilter === ""}
                  onChange={(e) => setActivationFilter(e.target.value)}
                  className="mr-2 text-teal-500 focus:ring-teal-500 dark:focus:ring-teal-400"
                />
                All
              </label>
              <label
                htmlFor="active-activated"
                className="flex items-center text-sm text-gray-700 dark:text-gray-200"
              >
                <input
                  type="radio"
                  id="active-activated"
                  name="activation-filter"
                  value="Activated"
                  checked={activationFilter === "Activated"}
                  onChange={(e) => setActivationFilter(e.target.value)}
                  className="mr-2 text-teal-500 focus:ring-teal-500 dark:focus:ring-teal-400 "
                />
                Activated
              </label>
              <label
                htmlFor="active-deactivated"
                className="flex items-center text-sm text-gray-700 dark:text-gray-200"
              >
                <input
                  type="radio"
                  id="active-deactivated"
                  name="activation-filter"
                  value="Deactivated"
                  checked={activationFilter === "Deactivated"}
                  onChange={(e) => setActivationFilter(e.target.value)}
                  className="mr-2 text-teal-500 focus:ring-teal-500 dark:focus:ring-teal-400"
                />
                Deactivated
              </label>
            </div>
          </div>

          {/* Patients Per Page Filter */}
          <div>
            <label
              htmlFor="patients-per-page"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              Patients per page:
            </label>
            <select
              id="patients-per-page"
              value={patientsPerPage}
              onChange={handlePatientsPerPageChange}
              className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm focus:ring-teal-500 focus:border-teal-500 transition"
            >
              {[5, 10, 15, 25].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleClose}
            className="mt-6 w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300"
          >
            Apply Filters
          </button>
        </motion.div>
      </Box>
    </Modal>
  );
};
// ----------------------------------------------------------------------

const Patients = ({ activationFilter, setActivationFilter }) => {
  const { getPatients, postPatient, updatePatient, deletePatient } =
    useContext(AuthContext);
  const [patients, setPatients] = useState([]);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false); // For the patient details modal
  const [filterModalOpen, setFilterModalOpen] = useState(false); // State for Filter Modal
  const [searchTerm, setSearchTerm] = useState("");
  const [viewPdfModalOpen, setViewPdfModalOpen] = useState(false); // For the PDF modal
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [ivrFilter, setIvrFilter] = useState("");
  const [patientsPerPage, setPatientsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [savePage, setSavePage] = useState(1);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    middle_initial: "",
    date_of_birth: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    phone_number: "",
    primary_insurance: "",
    primary_insurance_number: "",
    secondary_insurance: "",
    secondary_insurance_number: "",
    tertiary_insurance: "",
    tertiary_insurance_number: "",
    medical_record_number: "",
    ivrStatus: "Pending",
    date_created: "",
    date_updated: "",
    wound_size_length: "",
    wound_size_width: "",
  });

  // ... (rest of your helper functions and useEffects remain unchanged) ...
  // (formatPhoneNumberToE164, ValidateForm, useEffects for fetching/filtering/pagination, handleInputChange, resetForm, handleSavePatient, handleEditPatient, handleDeletePatient, filteredPatients, sortedPatients, indexOfLastPatient, indexOfFirstPatient, currentPatients, totalPages, handleViewPdf are unchanged)

  const formatPhoneNumberToE164 = (phone) => {
    if (!phone) return "";
    const digitsOnly = phone.replace(/\D/g, "");
    if (digitsOnly.length === 10) {
      return `+1${digitsOnly}`;
    } else if (digitsOnly.length === 11 && digitsOnly.startsWith("1")) {
      return `+${digitsOnly}`;
    } else if (digitsOnly.length > 11 && digitsOnly.startsWith("1")) {
      return `+${digitsOnly.slice(0, 11)}`;
    }
    return `+${digitsOnly}`;
  };

  const ValidateForm = () => {
    const newErrors = {};
    if (!formData.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!formData.last_name.trim())
      newErrors.last_name = "Last name is required";
    if (!formData.date_of_birth)
      newErrors.date_of_birth = "Date of birth is required";
    if (formData.phone_number) {
      const digitsOnly = formData.phone_number.replace(/\D/g, "");
      if (digitsOnly.length !== 10) {
        newErrors.phone_number = "Phone number must be 10 digits (US format)";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const fetchPatients = async () => {
      if (getPatients) {
        const result = await getPatients();
        if (result.success) {
          setPatients(result.data);
        } else {
          console.error("Failed to fetch patients:", result.error);
        }
      }
    };
    fetchPatients();
  }, [getPatients]);

  useEffect(() => {
    if (searchTerm || ivrFilter || activationFilter) {
      setSavePage(currentPage);
      setCurrentPage(1);
    } else {
      setCurrentPage(savePage);
    }
  }, [searchTerm, ivrFilter, activationFilter, patientsPerPage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "middle_initial" ? value.trim().charAt(0) : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      first_name: "",
      last_name: "",
      middle_initial: "",
      date_of_birth: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zip_code: "",
      phone_number: "",
      primary_insurance: "",
      primary_insurance_number: "",
      secondary_insurance: "",
      secondary_insurance_number: "",
      tertiary_insurance: "",
      tertiary_insurance_number: "",
      medical_record_number: "",
      ivrStatus: "Pending",
      wound_size_length: "",
      wound_size_width: "",
    });
    setErrors({});
    setEditingPatient(null);
    setOpen(false);
  };

  const handleSavePatient = async () => {
    setErrors({});
    if (!ValidateForm()) return;

    const newPatientData = {
      ...formData,
      phone_number: formatPhoneNumberToE164(formData.phone_number),
    };

    try {
      if (editingPatient) {
        const res = await updatePatient(editingPatient.id, newPatientData);
        if (res.success) {
          setPatients((prev) =>
            prev.map((p) => (p.id === editingPatient.id ? res.data : p))
          );
          toast.success("Patient profile updated successfully!");
        } else {
          console.error("Failed to update patient:", res.error);
        }
      } else {
        const res = await postPatient(newPatientData);
        if (res.success) {
          setPatients((prev) => [res.data, ...prev]);
        } else {
          console.error("Failed to add patient:", res.error);
        }
      }
    } catch (error) {
      console.log("Error saving patient:", error);
    }
    resetForm();
  };

  const handleEditPatient = (patient) => {
    try {
      if (!patient || typeof patient !== "object") {
        console.error("Invalid patient data:", patient);
        return;
      }
      const sanitizedPatient = {};
      Object.entries(formData).forEach(([key, _]) => {
        let value = patient[key];
        if (key === "date_of_birth") {
          try {
            sanitizedPatient[key] = value
              ? format(new Date(value), "yyyy-MM-dd")
              : "";
          } catch (dateError) {
            console.error("Invalid date_of_birth format:", value);
            sanitizedPatient[key] = "";
          }
        } else {
          sanitizedPatient[key] = value ?? "";
        }
      });
      setFormData(sanitizedPatient);
      setEditingPatient(patient);
      setOpen(true);
    } catch (error) {
      console.error("Error in handleEditPatient:", error);
    }
  };

  const handleDeletePatient = async (patientId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this patient? This action cannot be undone."
      )
    ) {
      try {
        const res = await deletePatient(patientId);
        if (res.success) {
          setPatients((prev) => prev.filter((p) => p.id !== patientId));
        } else {
          console.error("Failed to delete patient:", res.error);
        }
      } catch (error) {
        console.error("Error deleting patient:", error);
      }
    }
  };

  const filteredPatients = patients.filter((patient) => {
    const fullName =
      `${patient.first_name} ${patient.last_name} ${patient.middle_initial}`.toLowerCase();
    const medRecord = patient.medical_record_number?.toLowerCase() || "";
    const matchesIvrFilter = ivrFilter ? patient.ivrStatus === ivrFilter : true;
    const activationMatch =
      !activationFilter || patient.activate_Account === activationFilter;
    return (
      (fullName.includes(searchTerm.toLowerCase()) ||
        medRecord.includes(searchTerm.toLowerCase())) &&
      matchesIvrFilter &&
      activationMatch
    );
  });

  const sortedPatients = [...filteredPatients].sort((a, b) => {
    const active = (status) => ["Approved", "Pending"].includes(status);
    return active(b.ivrStatus) - active(a.ivrStatus);
  });

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = sortedPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );
  const totalPages = Math.ceil(sortedPatients.length / patientsPerPage);

  const handleViewPdf = (patient) => {
    console.log("Opening PDF modal for:", patient);
    setSelectedPatient(patient);
    setViewPdfModalOpen(true);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: 600,
    bgcolor: "transparent",
    boxShadow: "none",
    outline: "none",
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Patient Applications
        </h2>
        <button
          className="border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white dark:hover:text-white dark:text-teal-400 dark:border-teal-400 dark:hover:bg-teal-500 px-4 py-2 rounded-md transition-all text-xs"
          onClick={() => {
            setEditingPatient(null);
            setOpen(true);
          }}
        >
          + New Patient
        </button>
      </div>

      {/* Search and Filter Control Block */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-5 gap-3">
        {/* Search Input */}
        <div className="relative flex items-center w-full sm:max-w-xs md:max-w-md">
          <input
            type="text"
            placeholder="Search by Name or Med Record No."
            className="w-full px-2 py-1 pl-10 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center justify-center w-8 h-8 bg-teal-500 rounded-full">
            <FaSearch className="text-white text-sm" />
          </div>
        </div>

        {/* Filter/Command Center Button */}
        <button
          onClick={() => setFilterModalOpen(true)}
          className="flex items-center gap-2 px-4 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 w-full sm:w-auto"
        >
          <FaSlidersH className="w-4 h-4" />
          <span className="flex items-center space-x-1">
            <span>Filters</span>
            <span className="text-xs font-semibold text-teal-500 dark:text-teal-400">
              ({[ivrFilter, activationFilter].filter(Boolean).length})
            </span>
          </span>
        </button>
      </div>

      <div className="space-y-6">
        {currentPatients.length > 0 ? (
          currentPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onViewPdf={handleViewPdf}
              onEdit={handleEditPatient}
              onDelete={handleDeletePatient}
            />
          ))
        ) : (
          <p className="text-center py-10 text-gray-500 dark:text-gray-400">
            No patients match the current search or filter criteria.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-2 sm:space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-2 py-1 sm:px-3 sm:py-2 rounded-full border bg-gray-100 dark:bg-gray-700 dark:border-gray-600 disabled:opacity-50 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 sm:w-5 sm:h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300 px-3 py-1 sm:px-4 sm:py-2 rounded-full border border-gray-300 dark:border-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-2 py-1 sm:px-3 sm:py-2 rounded-full border bg-gray-100 dark:bg-gray-700 dark:border-gray-600 disabled:opacity-50 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 sm:w-5 sm:h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      {/* MODAL 1: Patient Details (Unchanged) */}
      <Modal open={open} onClose={resetForm}>
        <Box sx={{ ...modalStyle, maxHeight: "90vh", overflowY: "auto" }}>
          {/* Patient form content goes here */}
        </Box>
      </Modal>

      {/* MODAL 2: Filter Command Center (Now uses Framer Motion) */}
      <FilterCommandCenter
        open={filterModalOpen}
        handleClose={() => setFilterModalOpen(false)}
        ivrFilter={ivrFilter}
        setIvrFilter={setIvrFilter}
        activationFilter={activationFilter}
        setActivationFilter={setActivationFilter}
        patientsPerPage={patientsPerPage}
        setPatientsPerPage={setPatientsPerPage}
      />

      {/* MODAL 3: PDF Viewer (Unchanged) */}
      <Modal open={viewPdfModalOpen} onClose={() => setViewPdfModalOpen(false)}>
        <Box sx={{ ...modalStyle, maxWidth: 900 }}>
          <FillablePdf
            patient={selectedPatient}
            handleClose={() => setViewPdfModalOpen(false)}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default Patients;
