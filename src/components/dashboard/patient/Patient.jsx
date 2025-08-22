import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../utils/auth";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Modal,
} from "@mui/material";

import { format } from "date-fns";
import { formatPhoneNumber } from "react-phone-number-input";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import FillablePdf from "../documemts/FillablePdf";
import Notes from "../documemts/Notes";

const IVRStatusBadge = ({ status }) => {
  const colors = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Denied: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded ${colors[status]}`}
    >
      {status}
    </span>
  );
};

const PatientCard = ({ patient, onViewPdf }) => {
  // CORRECTED: Move formattedDate inside the component
  const formattedDate = patient.date_of_birth
    ? format(new Date(patient.date_of_birth), "M/d/yyyy")
    : "N/A";

  const formattedPhoneNumber = patient.phone_number
    ? formatPhoneNumber(patient.phone_number) || patient.phone_number
    : "N/A";

  const calculateAge = (dobString) => {
    // Check for a valid date string format.
    if (!dobString || !/^\d{4}-\d{2}-\d{2}$/.test(dobString)) {
      console.error("Invalid date of birth format. Please use 'YYYY-MM-DD'.");
      return null;
    }

    // Create Date objects for the date of birth and the current date.
    const dob = new Date(dobString);
    const now = new Date();

    // Calculate the difference in years.
    let age = now.getFullYear() - dob.getFullYear();

    // Adjust age if the birthday hasn't occurred yet this year.
    // This is a crucial step for accuracy.
    const monthDifference = now.getMonth() - dob.getMonth();
    const dayDifference = now.getDate() - dob.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age;
  };

  return (
    <div className="border p-4 rounded-lg border border-gray-200 bg-gray-50 shadow-sm space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{patient.name}</h3>
        <div className="flex items-center justify-between w-full">
          <p className="text-sm">
            <strong>Patient Name:</strong> {patient.first_name}{" "}
            {patient.last_name}, {patient.middle_initial}.
          </p>
          <strong className="text-sm">
            IVR Status: <IVRStatusBadge status={patient.ivrStatus} />
          </strong>
        </div>
      </div>
      <div
        className="text-xs text-gray-700 space-y-1"
        style={{ marginTop: -4 }}
      >
        <p className="text-xs flex" style={{ fontSize: 10 }}>
          <strong className="mr-1">Medical Record #:</strong>{" "}
          {patient.medical_record_number}
        </p>
      </div>
      <div className="text-sm text-gray-700 space-y-1" style={{ marginTop: 8 }}>
        <p className="text-xs flex">
          <strong className="mr-1">Address:</strong> {patient.address}{" "}
          {patient.city}, {patient.state} {patient.zip_code}
        </p>
      </div>
      <div
        className="text-sm text-gray-700 space-y-1"
        style={{ marginTop: -0.5 }}
      >
        <p className="text-xs flex">
          <strong className="mr-1">Phone Number:</strong> {formattedPhoneNumber}
        </p>
      </div>
      <div
        className="text-sm text-gray-700 space-y-1"
        style={{ marginTop: -0.5 }}
      >
        <p className="text-xs flex">
          <strong className="mr-1">Date of Birth:</strong> {formattedDate}
        </p>
      </div>
      <div
        className="text-sm text-gray-700 space-y-1"
        style={{ marginTop: -0.5 }}
      >
        <p className="text-xs flex">
          <strong className="mr-1">Age :</strong>{" "}
          {calculateAge(patient.date_of_birth)}
        </p>
      </div>
      <div
        className="h-[2px] w-[90%] bg-gray-200 flex m-auto opacity-550"
        style={{ marginTop: 25 }}
      ></div>
      <p className="text-sm font-semibold text-center">Insurance Information</p>
      <div className="text-sm text-gray-700 space-y-1" style={{ marginTop: 5 }}>
        <p className="text-xs flex">
          <strong className="mr-1">Primary Insurance Provider :</strong>{" "}
          {patient.primary_insurance}
        </p>
      </div>
      <div
        className="text-sm text-gray-700 space-y-1"
        style={{ marginTop: -0.5 }}
      >
        <p className="text-xs flex">
          <strong className="mr-1">Primary Insurance Number :</strong>{" "}
          {patient.primary_insurance_number}
        </p>
      </div>
      <div className="text-sm text-gray-700 space-y-1" style={{ marginTop: 3 }}>
        <p className="text-xs flex">
          <strong className="mr-1">Secondary Insurance Provider:</strong>{" "}
          {patient.secondary_insurance ? patient.secondary_insurance : "N/A"}
        </p>
      </div>
      <div
        className="text-sm text-gray-700 space-y-1"
        style={{ marginTop: -0.5 }}
      >
        <p className="text-xs flex">
          <strong className="mr-1">Secondary Insurance Number:</strong>{" "}
          {patient.secondary_insurance_number
            ? patient.secondary_insurance_number
            : "N/A"}
        </p>
      </div>
      <div className="text-sm text-gray-700 space-y-1" style={{ marginTop: 3 }}>
        <p className="text-xs flex">
          <strong className="mr-1">Secondary Insurance Provider:</strong>{" "}
          {patient.tertiary_insurance ? patient.tertiary_insurance : "N/A"}
        </p>
      </div>
      <div
        className="text-sm text-gray-700 space-y-1"
        style={{ marginTop: -0.5 }}
      >
        <p className="text-xs flex">
          <strong className="mr-1">Secondary Insurance Number:</strong>{" "}
          {patient.tertiary_insurance_number
            ? patient.tertiary_insurance_number
            : "N/A"}
        </p>
      </div>
      <div
        className="h-[2px] w-[90%] bg-gray-200 flex m-auto opacity-550"
        style={{ marginTop: 25 }}
      ></div>
      <p className="text-sm font-semibold text-center">Patient Documentation</p>

      <div className="text-sm text-gray-700 space-y-1" style={{ marginTop: 5 }}>
        <div className="flex items-center justify-between">
          <p className="text-xs flex">
            <strong>Promed Healthcare Plus IVR</strong>
          </p>
          <div className="flex space-x-2">
            <FaEye
              className="text-gray-500 hover:text-blue-500 cursor-pointer"
              onClick={() => onViewPdf(patient)}
            />
            <FaEdit className="text-gray-500 hover:text-green-500 cursor-pointer" />
            <FaTrashAlt className="text-gray-500 hover:text-red-500 cursor-pointer" />
          </div>
        </div>
      </div>
      <div
        className="h-[2px] w-[90%] bg-gray-200 flex m-auto opacity-550"
        style={{ marginTop: 25 }}
      ></div>
      <Notes key={patient.id} patientId={patient.id} />
    </div>
  );
};

const Patients = () => {
  const { getPatients, postPatient } = useContext(AuthContext);
  const [patients, setPatients] = useState([]);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewPdfModalOpen, setViewPdfModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [ivrFilter, setIvrFilter] = useState("");
  const [patientsPerPage, setPatientsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [savePage, setSavePage] = useState(1);

  // CORRECTED: Add date_of_birth field to initial state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    middle_initial: "",
    date_of_birth: "", // New field
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
  });

  const ValidateForm = () => {
    const newErrors = {};
    if (!formData.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!formData.last_name.trim())
      newErrors.last_name = "Last name is required";
    if (!formData.date_of_birth)
      newErrors.date_of_birth = "Date of birth is required";
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
    if (searchTerm || ivrFilter) {
      // Save the current page if filtering
      setSavePage(currentPage);
      setCurrentPage(1);
    } else {
      // Restore the last page
      setCurrentPage(savePage);
    }
  }, [searchTerm, ivrFilter]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "middle_initial" ? value.trim().charAt(0) : value,
    }));
  };

  const handleAddPatient = async () => {
    setErrors({});
    if (!ValidateForm()) return;

    const newPatient = { ...formData };
    try {
      const res = await postPatient(newPatient);
      if (res.success) {
        console.log("Patient added successfully:", res.data);
        setPatients((prev) => [res.data, ...prev]);
      }
    } catch (error) {
      console.error("Failed to add patient:", error);
    }

    setOpen(false);
    setFormData({
      first_name: "",
      last_name: "",
      middle_initial: "",
      date_of_birth: "", // Reset this field
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
    });
  };

  const filteredPatients = patients.filter((patient) => {
    const fullName =
      `${patient.first_name} ${patient.last_name} ${patient.middle_initial}`.toLowerCase();
    const medRecord = patient.medical_record_number?.toLowerCase() || "";
    const matchesFilter = ivrFilter ? patient.ivrStatus === ivrFilter : true;
    return (
      (fullName.includes(searchTerm.toLowerCase()) ||
        medRecord.includes(searchTerm.toLowerCase())) &&
      matchesFilter
    );
  });

  const sortedPatients = [...filteredPatients].sort((a, b) => {
    const active = (status) => ["Approved", "Pending"].includes(status);
    return active(b.ivrStatus) - active(a.ivrStatus);
  });

  // Pagination logic
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = sortedPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  const totalPages = Math.ceil(sortedPatients.length / patientsPerPage);

  const handleViewPdf = (patient) => {
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
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Patient Applications</h2>
        <button
          className="border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white px-4 py-2 rounded-md transition-all text-xs"
          onClick={() => setOpen(true)}
        >
          + New Patient
        </button>
      </div>
      <div className="relative flex items-center w-full max-w-md mb-5">
        <input
          type="text"
          placeholder="Search Patients by Name or Med Record No."
          className="w-full px-2 py-1 pl-10 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
          <FaSearch />
        </div>
      </div>
      <div className="flex items-center mb-5 pl-1">
        <label
          htmlFor="ivr-filter"
          className="mr-2 text-xs font-medium text-gray-700"
        >
          Filter by IVR Status:
        </label>
        <select
          id="ivr-filter"
          value={ivrFilter}
          onChange={(e) => setIvrFilter(e.target.value)}
          className="bg-gray-100 text-gray-800 border border-gray-300 rounded px-2 py-1 text-xs 
             focus:bg-gray-200 focus:outline-none focus:ring-2 
             focus:ring-emerald-500 focus:border-emerald-300 transition"
        >
          <option value="">All</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Denied">Denied</option>
        </select>

        <div className="ml-auto flex items-center">
          <label
            htmlFor="patients-per-page"
            className="mr-2 text-xs font-medium text-gray-700"
          >
            Patient per page:
          </label>
          <select
            id="patients-per-page"
            value={patientsPerPage}
            onChange={(e) => {
              setPatientsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="bg-gray-100 text-gray-800 border border-gray-300 rounded px-2 py-1 text-xs 
             focus:bg-gray-200 focus:outline-none focus:ring-2 
             focus:ring-emerald-500 focus:border-emerald-300 transition"
          >
            {[5, 10, 15, 25].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {currentPatients.map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            onViewPdf={handleViewPdf}
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border bg-gray-100 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="mx-2 text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded border bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 mx-4 border border-gray-100 relative">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
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

            {/* Header */}
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
              Add New Patient
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Fill out the form to register a new patient.
            </p>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddPatient();
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-sm">{errors.first_name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-sm">{errors.last_name}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Middle Initial
                  </label>
                  <input
                    type="text"
                    name="middle_initial"
                    value={formData.middle_initial}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  {errors.date_of_birth && (
                    <p className="text-red-500 text-sm">
                      {errors.date_of_birth}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-2/3">
                  <label className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-gray-700">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zip_code"
                    value={formData.zip_code}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* You can continue with Insurance fields similarly */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Primary Insurance
                  </label>
                  <input
                    type="text"
                    name="primary_insurance"
                    value={formData.primary_insurance}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Primary Insurance Number
                  </label>
                  <input
                    type="text"
                    name="primary_insurance_number"
                    value={formData.primary_insurance_number}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-emerald-400 hover:bg-emerald-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
              >
                Save Patient
              </button>
            </form>
          </div>
        </Box>
      </Modal>

      <Dialog
        open={viewPdfModalOpen}
        onClose={() => setViewPdfModalOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>📄 View IVR Form</DialogTitle>
        <DialogContent dividers>
          {selectedPatient && (
            <FillablePdf
              selectedPatientId={selectedPatient.id}
              formType="IVR_FORM"
              hidePatientSelect={true}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewPdfModalOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Patients;
