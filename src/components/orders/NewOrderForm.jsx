import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import { AuthContext } from "../../utils/auth";
import OrderItem from "./OrderItem";
import OrderSummary from "./OrderSummary";
import toast from "react-hot-toast";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


const NewOrderForm = ({ open, onClose, patient }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const { user, logout } = useContext(AuthContext);
  const [itemsData, setItemsData] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    providerName: user?.full_name || "",
    facilityName: user?.profile?.facility || "",
    providerPhoneNumber: user?.profile?.phone_number || "",
    providerAddress: user?.profile?.street || "",
    patientName: `${patient?.first_name || ""} ${patient?.last_name || ""}`,
    patientDob: patient?.date_of_birth || "",
    patientPhoneNumber: patient?.phone_number || "",
    patientAddress: `${patient?.address || ""}, ${patient?.city || ""}, ${
      patient?.state || ""
    } ${patient?.zip_code || ""}`,
    patientCountry: patient?.country || "",
    deliveryDate: "",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("Authentication token not found.");

      const response = await fetch(
        `${process.env.REACT_APP_PYTHONANYWHERE_API}/products/`,
        // `${process.env.REACT_APP_API_URL}/products/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          throw new Error("Session expired. Please log in again.");
        }
        throw new Error("Failed to fetch products.");
      }
      const data = await response.json();

      // Get wound size from patient prop 
      const woundLength = parseFloat(patient?.wound_size_length) || 0;
      const woundWidth = parseFloat(patient?.wound_size_width) || 0;
      const woundSize = woundLength * woundWidth;

      const dataWithWoundSize = data.map((product) => ({
        ...product,
        woundSize,
      }));

      setItemsData(dataWithWoundSize);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleItemVariantChange = (productId, variantsArray) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: Array.isArray(variantsArray) ? variantsArray : [],
    }));
  };

  const total = Object.entries(selectedVariants).reduce(
    (sum, [productId, variants]) => {
      if (!Array.isArray(variants)) return sum;

      const item = itemsData.find((i) => i.id === parseInt(productId));
      if (!item) return sum;

      for (const { variantId, quantity } of variants) {
        const variant = item.variants.find((v) => v.id === parseInt(variantId));
        if (variant && quantity > 0) {
          sum += variant.price * quantity;
        }
      }
      return sum;
    },
    0
  );

  const handleOrderNow = async () => {
    const orderItems = [];
    Object.entries(selectedVariants).forEach(([productId, variants]) => {
      variants.forEach(({ variantId, quantity }) => {
        if (quantity > 0) {
          const item = itemsData.find((i) => i.id === parseInt(productId));
          const variant = item?.variants.find(
            (v) => v.id === parseInt(variantId)
          );
          if (variant) {
            orderItems.push({
              product: parseInt(productId),
              variant: parseInt(variantId),
              quantity,
              // price_at_order: variant.price,
            });
          }
        }
      });
    });

    if (orderItems.length === 0 || total <= 0) {
      toast.error("Please select at least one item and variant with quantity.");
      return;
    }

    const orderPayload = {
      provider: user.id,
      patient: patient.id,
      total_price: parseFloat(total.toFixed(2)),
      facility_name: formData.facilityName,
      phone_number: formData.providerPhoneNumber,
      street: formData.providerAddress,
      city: patient.city,
      zip_code: patient.zip_code,
      country: formData.patientCountry,
      items: orderItems,
      delivery_date: formData.deliveryDate || null,
    };

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      const response = await fetch(
        `${process.env.REACT_APP_PYTHONANYWHERE_API}/provider/orders/`,
        // `${process.env.REACT_APP_API_URL}/provider/orders/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(orderPayload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to place order.");
      }

      toast.success("Order placed successfully!");
      onClose();
      setStep(1);
      setSelectedVariants({});
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    if (open && user && patient) {
      setFormData({
        providerName: user?.full_name || "",
        facilityName: user?.profile?.facility || "",
        providerPhoneNumber: user?.profile?.phone_number || "",
        providerAddress: user?.profile?.street || "",
        patientName: `${patient?.first_name || ""} ${patient?.last_name || ""}`,
        patientDob: patient?.date_of_birth || "",
        patientPhoneNumber: patient?.phone_number || "",
        patientAddress: `${patient?.address || ""}, ${patient?.city || ""}, ${
          patient?.state || ""
        } ${patient?.zip_code || ""}`,
        patientCountry: patient?.country || "",
      });
      fetchProducts();
    }
  }, [open, user, patient]);

  const renderStepContent = () => {
    if (loading) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="200px"
        >
          <CircularProgress />
        </Box>
      );
    }
    if (error) {
      return <div className="p-4 text-red-500 text-center">{error}</div>;
    }

    switch (step) {
      case 1:
        return (
          <div className="p-4 space-y-4">
            <TextField
              fullWidth
              label="Provider Name"
              name="providerName"
              value={formData.providerName}
              onChange={handleFormChange}
            />
            <TextField
              fullWidth
              label="Facility Name"
              name="facilityName"
              value={formData.facilityName}
              onChange={handleFormChange}
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="providerPhoneNumber"
              value={formData.providerPhoneNumber}
              onChange={handleFormChange}
            />
            <TextField
              fullWidth
              label="Address"
              name="providerAddress"
              value={formData.providerAddress}
              onChange={handleFormChange}
            />
          </div>
        );
      case 2:
        return (
          <div className="p-4 space-y-4">
            <TextField
              fullWidth
              label="Patient Name"
              name="patientName"
              value={formData.patientName}
              onChange={handleFormChange}
            />
            <TextField
              fullWidth
              label="Date of Birth"
              name="patientDob"
              value={formData.patientDob}
              onChange={handleFormChange}
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="patientPhoneNumber"
              value={formData.patientPhoneNumber}
              onChange={handleFormChange}
            />
            <TextField
              fullWidth
              label="Address"
              name="patientAddress"
              value={formData.patientAddress}
              onChange={handleFormChange}
            />
            <Select
              fullWidth
              name="patientCountry"
              value={formData.patientCountry || "United States"}
              onChange={handleFormChange}
            >
              <MenuItem value="United States">United States</MenuItem>
            </Select>
          </div>
        );
      case 3:
        return (
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Order Items
            </h3>
            {itemsData.length > 0 ? (
              itemsData.map((item) => (
                <OrderItem
                  key={item.id}
                  item={item}
                  selectedVariants={selectedVariants[item.id] || []}
                  onVariantChange={(variants) =>
                    handleItemVariantChange(item.id, variants)
                  }
                />
              ))
            ) : (
              <p className="text-gray-500 text-center">
                No available products found.
              </p>
            )}
            {/* <TextField
              fullWidth
              label="Requested Delivery Date"
              name="deliveryDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.deliveryDate}
              onChange={handleFormChange}
              // ADD THIS min ATTRIBUTE
              inputProps={{ min: new Date().toISOString().split("T")[0] }}
            /> */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Requested Delivery Date"
                value={
                  formData.deliveryDate ? new Date(formData.deliveryDate) : null
                }
                onChange={(newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    deliveryDate: newValue?.toISOString().split("T")[0] || "",
                  }));
                }}
                disablePast
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: "outlined",
                  },
                }}
              />
            </LocalizationProvider>

            <OrderSummary
              selectedVariants={selectedVariants}
              itemsData={itemsData}
              orderDate={formData.deliveryDate}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const hasSelectedItems = Object.values(selectedVariants).some((variants) =>
    variants.some(({ quantity }) => quantity > 0)
  );

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 600,
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "16px",
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
        }}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 text-gray-500 hover:text-gray-800 transition"
          >
            ✕
          </button>
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">
            New Order
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Complete the steps to place a new order.
          </p>
          {renderStepContent()}
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              onClick={() => setStep((prev) => prev - 1)}
              disabled={step === 1}
              className="px-3 py-2 rounded bg-gray-100 disabled:opacity-50"
            >
              Back
            </button>
            {step < totalSteps ? (
              <button
                onClick={() => setStep((prev) => prev + 1)}
                className="px-3 py-2 rounded bg-blue-600 text-white"
              >
                Next
              </button>
            ) : (
              <Button
                onClick={handleOrderNow}
                variant="contained"
                className="bg-blue-600 text-white font-bold"
                disabled={!hasSelectedItems}
              >
                Place Order
              </Button>
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default NewOrderForm;
