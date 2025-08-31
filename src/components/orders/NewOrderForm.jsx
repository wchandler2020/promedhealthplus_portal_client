import React, { useState, useContext } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
} from "@mui/material";
import default_item from "../../assets/images/default_item.png";
import { AuthContext } from '../../utils/auth';

const itemsData = [
  {
    id: 1,
    title: "Graph 1cm x 2cm",
    manufacturer: "Bioventus",
    available: true,
    price: 4.99,
    image: default_item,
  },
  {
    id: 2,
    title: "Graph 2cm x 4cm",
    manufacturer: "Bioventus",
    available: false,
    price: 6.49,
    image: default_item,
  },
  {
    id: 3,
    title: "Graph 4cm x 6cm",
    manufacturer: "Bioventus",
    available: true,
    price: 8.99,
    image: default_item,
  },
  {
    id: 4,
    title: "Graph 5cm x 5cm",
    manufacturer: "Bioventus",
    available: true,
    price: 10.99,
    image: default_item,
  },
];

const OrderItem = ({ item, quantity, onQuantityChange }) => (
  <div className="flex items-center justify-between border-b py-4">
    <div className="flex items-center">
      <img
        src={item.image}
        alt={item.title}
        className="w-16 h-16 rounded border object-cover mr-4"
      />
      <div>
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <span
          className={`text-sm font-medium ${
            item.available ? "text-purple-600" : "text-red-500"
          }`}
        >
          {item.available ? "Available" : "Unavailable"}
        </span>
      </div>
    </div>
    <div className="text-right">
      <p className="text-md font-medium mb-1">${item.price.toFixed(2)}</p>
      <select
        className="border rounded px-2 py-1"
        value={quantity}
        onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value))}
        disabled={!item.available}
      >
        {[0, 1, 2, 3, 4, 5].map((qty) => (
          <option key={qty} value={qty}>
            {qty}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const OrderSummary = ({ total }) => (
  <div className="mt-6 p-4 border-t">
    <h3 className="text-xl font-semibold">Order Summary</h3>
    <p className="mt-2 text-gray-700">
      Total: <span className="font-bold">${total.toFixed(2)}</span>
    </p>
  </div>
);

const NewOrderForm = ({ open, onClose, patient, onCreateOrder }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const { user } = useContext(AuthContext);
  const [quantities, setQuantities] = useState(
    itemsData.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {})
  );

  const formData = {
    provider_full_name: user?.full_name || "",
    provider_phone_number: user?.profile?.phone_number || "",
    facility_name: user?.profile?.facility || "",
    facility_street: user?.profile?.street || "",
    facility_city: user?.profile?.city || "",
    facility_zip_code: user?.profile?.zip_code || "",
    patient_id: patient.id,
    patient_name: `${patient.first_name} ${patient.last_name}`,
    patient_dob: patient.date_of_birth,
    patient_phone: patient.phone_number,
    patient_address: `${patient.address}, ${patient.city}, ${patient.state} ${patient.zip_code}`,
  };

  const handleQuantityChange = (id, quantity) => {
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
  };

  const total = itemsData.reduce(
    (sum, item) => sum + item.price * quantities[item.id],
    0
  );

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleOrderNow = async () => {
    if (total === 0) {
      alert("Please select at least one item.");
      return;
    }

    const orderItems = itemsData
      .filter((item) => quantities[item.id] > 0)
      .map((item) => ({
        product_name: item.title,
        manufacturer: item.manufacturer,
        quantity: quantities[item.id],
        mft_price: item.price,
      }));

    const orderPayload = {
      provider_id: user.id, // Assuming user.id is the provider's ID
      patient_id: formData.patient_id,
      total_price: total,
      facility_name: formData.facility_name,
      phone_number: formData.provider_phone_number,
      street: formData.facility_street,
      city: formData.facility_city,
      zip_code: formData.facility_zip_code,
      country: user.profile.country || "USA",
      items: orderItems,
    };

    try {
      if (onCreateOrder) {
        await onCreateOrder(orderPayload);
        alert("Order placed successfully!");
        setStep(1);
        onClose();
      }
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="p-4 space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">
              Provider Information
            </h3>
            <TextField
              fullWidth
              label="Provider Name"
              value={formData.provider_full_name}
              disabled
              className="bg-gray-100"
            />
            <TextField
              fullWidth
              label="Facility Name"
              value={formData.facility_name}
              disabled
              className="bg-gray-100"
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={formData.provider_phone_number}
              disabled
              className="bg-gray-100"
            />
            <TextField
              fullWidth
              label="Address"
              value={formData.facility_street}
              disabled
              className="bg-gray-100"
            />
          </div>
        );
      case 2:
        return (
          <div className="p-4 space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">
              Patient Information
            </h3>
            <TextField
              fullWidth
              label="Patient Name"
              value={formData.patient_name}
              disabled
              className="bg-gray-100"
            />
            <TextField
              fullWidth
              label="Date of Birth"
              value={formData.patient_dob}
              disabled
              className="bg-gray-100"
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={formData.patient_phone}
              disabled
              className="bg-gray-100"
            />
            <TextField
              fullWidth
              label="Address"
              value={formData.patient_address}
              disabled
              className="bg-gray-100"
            />
          </div>
        );
      case 3:
        return (
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Order Items
            </h3>
            {itemsData.map((item) => (
              <OrderItem
                key={item.id}
                item={item}
                quantity={quantities[item.id]}
                onQuantityChange={handleQuantityChange}
              />
            ))}
            <OrderSummary total={total} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 600,
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '16px',
          bgcolor: 'white',
          boxShadow: 24,
          p: 4,
        }}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 text-gray-500 hover:text-gray-800 transition"
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
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            New Order
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Complete the steps to place a new order.
          </p>

          <div className="space-y-6">
            {renderStepContent()}
          </div>
          
          <div className="flex justify-center items-center mt-6 space-x-2 sm:space-x-4">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="px-2 py-1 sm:px-3 sm:py-2 rounded-full border bg-gray-100 disabled:opacity-50 text-gray-700 hover:bg-gray-200 transition-colors duration-300"
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
            
            {step < totalSteps ? (
                <span className="text-sm font-medium text-gray-600 px-3 py-1 sm:px-4 sm:py-2 rounded-full border border-gray-300">
                    Step {step} of {totalSteps}
                </span>
            ) : (
                <Button
                    onClick={handleOrderNow}
                    variant="contained"
                    className="bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-transform transform hover:scale-105"
                    disabled={total === 0}
                >
                    Place Order
                </Button>
            )}

            <button
              onClick={handleNext}
              disabled={step === totalSteps}
              className="px-2 py-1 sm:px-3 sm:py-2 rounded-full border bg-gray-100 disabled:opacity-50 text-gray-700 hover:bg-gray-200 transition-colors duration-300"
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
        </div>
      </Box>
    </Modal>
  );
};

export default NewOrderForm;