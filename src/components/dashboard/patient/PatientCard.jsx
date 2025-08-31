// src/components/dashboard/patients/PatientCard.jsx
import React, { useState } from "react";
import { FaEye, FaEdit, FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import { format } from "date-fns";
import { formatPhoneNumber } from "react-phone-number-input";
import Notes from "../documemts/Notes";
import NewOrderForm from "../../orders/NewOrderForm";

const IVRStatusBadge = ({ status }) => {
  const colors = {
    Approved: "bg-purple-100 text-purple-700",
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
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const formattedDate = patient.date_of_birth
    ? format(new Date(patient.date_of_birth), "M/d/yyyy")
    : "N/A";
  const formattedPhoneNumber = patient.phone_number
    ? formatPhoneNumber(patient.phone_number) || patient.phone_number
    : "N/A";
  const calculateAge = (dobString) => {
    if (!dobString || !/^\d{4}-\d{2}-\d{2}$/.test(dobString)) {
      console.error("Invalid date of birth format. Please use 'YYYY-MM-DD'.");
      return null;
    }
    const dob = new Date(dobString);
    const now = new Date();
    let age = now.getFullYear() - dob.getFullYear();
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
            <FaEdit className="text-gray-500 hover:text-purple-500 cursor-pointer" />
            <FaTrashAlt className="text-gray-500 hover:text-red-500 cursor-pointer" />
          </div>
        </div>
      </div>
      <div
        className="h-[2px] w-[90%] bg-gray-200 flex m-auto opacity-550"
        style={{ marginTop: 25 }}
      ></div>
      <p className="text-sm font-semibold text-center mt-6">Patient Order</p>
      <div className="flex justify-between items-center mt-2">
        <p className="text-xs text-gray-700">Place an order for this patient.</p>
        <button
          className={`text-xs px-3 py-1 rounded-full flex items-center gap-1 transition-all
            ${
              patient.ivrStatus === "Approved"
                ? "bg-purple-500 text-white hover:bg-purple-600"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          onClick={() => setOpenOrderModal(true)}
          disabled={patient.ivrStatus !== "Approved"}
        >
           {/* <FaShoppingCart className="inline" />New Order */}
           + New Order
        </button>
      </div>
      <div
        className="h-[2px] w-[90%] bg-gray-200 flex m-auto opacity-550"
        style={{ marginTop: 25 }}
      ></div>
      <Notes key={patient.id} patientId={patient.id} />
      <NewOrderForm
        open={openOrderModal}
        onClose={() => setOpenOrderModal(false)}
        patient={patient}
      />
      
    </div>
  );
};
export default PatientCard;