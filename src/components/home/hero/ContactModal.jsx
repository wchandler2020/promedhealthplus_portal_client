// src/components/ContactModal.jsx

import React, { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import toast from 'react-hot-toast';
import axios from "axios";
import { states } from "../../../utils/data";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 600,
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "transparent",
  boxShadow: "none",
  outline: "none",
};

const ContactModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    facility: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    question: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, question } = formData;
    if (!name || !email || !phone || !question) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_PYTHONANYWHERE_API}/contact-us/`,
        formData
      );
      toast.success("Your message has been sent. We'll get back to you soon!");
      handleClose();
      setFormData({
        name: "",
        facility: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        email: "",
        question: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mx-4 border border-gray-100 dark:border-gray-700 relative h-full transition-colors duration-300">
          <button
            onClick={handleClose}
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

          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">
            Get In Touch
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-300 mb-6">
            We’d love to help you. Fill out the form below and we’ll respond
            soon.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Provider Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., Dr. John Smith"
                className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Facility Name
              </label>
              <input
                type="text"
                name="facility"
                value={formData.facility}
                onChange={handleChange}
                required
                placeholder="e.g., Your clinic, hospital, or practice name"
                className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                />
              </div>

              <div className="flex gap-2">
                <div className="w-2/3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    State
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">Select</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Zip
                  </label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                  />
                </div>
              </div>
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
                placeholder="(123) 456-7890"
                className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Your Question
              </label>
              <textarea
                name="question"
                value={formData.question}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Type your message..."
                className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default ContactModal;