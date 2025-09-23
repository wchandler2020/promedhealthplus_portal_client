import React, { useState, useContext, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import authRequest from "../../../utils/axios";
import {AuthContext} from '../../../utils/auth'
import toast from "react-hot-toast";

const ContactRepModal = ({ open, onClose }) => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    const axiosInstance = authRequest(); 

    try {
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_PYTHONANYWHERE_API}/provider/contact-rep/`,
        // `${process.env.REACT_APP_API_URL}/provider/contact-rep/`,
        formData
      );
      console.log("Message sent successfully:", response.data);
      toast.success("Your message has been sent to your representative.")
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
    })
      onClose(); 
    } catch (error) {
      console.error(
        "Failed to send message:",
        error.response?.data || error.message
      );
      alert(
        "Failed to send message. Please try again or contact support."
      );
    }
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

    useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.full_name || "",
        phone: user.phone_number || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 mx-4 border border-gray-100 dark:border-gray-800 relative transition-colors duration-300">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 transition"
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
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">
            Contact Your Rep
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
            Fill out the form, and a representative will respond within 2–3 hours.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default ContactRepModal;