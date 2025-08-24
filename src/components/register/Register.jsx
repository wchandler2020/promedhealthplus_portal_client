// Register.js

import React, { useState, useContext } from "react";
import { AuthContext } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import bg_image from "../../assets/images/bg_image_01.jpg";
import { Link } from "react-router-dom";
import { IoArrowBack, IoCheckmarkCircleOutline } from "react-icons/io5";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // Add new state for phone number
  const [countryCode, setCountryCode] = useState("+1"); // Add new state for country code with a default
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  // You would need a list of country codes here for the dropdown
  const countryCodes = [
    { code: "+1", name: "United States" },
    { code: "+44", name: "United Kingdom" },
    { code: "+91", name: "India" },
    // Add all other countries from your Django model here
  ];
  
  // Validation functions
  const hasMinLength = password.length >= 12;
  const hasUppercase = (password.match(/[A-Z]/g) || []).length >= 2;
  const hasLowercase = (password.match(/[a-z]/g) || []).length >= 2;
  const hasNumbers = (password.match(/[0-9]/g) || []).length >= 2;
  const hasSpecialChars = (password.match(/[^A-Za-z0-9]/g) || []).length >= 2;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    // Pass the new fields to the register function
    const result = await register(fullName, email, phoneNumber, countryCode, password, password2);

    if (result.success) {
      setSuccessMsg("Account created successfully!");
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setCountryCode("+1");
      setPassword("");
      setPassword2("");
      navigate("/login");
    } else {
      const error = result.error;
      if (typeof error === "object") {
        const messages = Object.values(error).flat().join(" ");
        setErrorMsg(messages);
      } else {
        setErrorMsg(error);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-white dark:bg-white">
      <div className="flex justify-center h-screen">
        {/* Left Side with Background */}
        <div
          className="relative hidden bg-cover lg:block lg:w-2/3"
          style={{ backgroundImage: `url(${bg_image})` }}
        >
          {/* ... (existing code) ... */}
        </div>

        {/* Right Side Form */}
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            {/* ... (existing code) ... */}
            <div className="mt-8">
              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm text-gray-800"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring focus:ring-blue-400 focus:outline-none focus:ring-opacity-40"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-800"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="example@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring focus:ring-blue-400 focus:outline-none focus:ring-opacity-40"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-2 text-sm text-gray-800"
                  >
                    Phone Number
                  </label>
                  <div className="flex">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="block w-auto px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-l-md dark:bg-white dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring focus:ring-blue-400 focus:outline-none focus:ring-opacity-40"
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      id="phoneNumber"
                      placeholder="555-555-5555"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-r-md dark:bg-white dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring focus:ring-blue-400 focus:outline-none focus:ring-opacity-40"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm text-gray-800"
                  >
                    Password
                  </label>
                  {/* ... (existing password input and validation) ... */}
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm text-gray-800"
                  >
                    Confirm Password
                  </label>
                  {/* ... (existing confirm password input) ... */}
                </div>

                <div className="mt-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Show Password
                    </span>
                  </label>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-emerald-500 rounded-md hover:bg-emerald-400 focus:outline-none focus:bg-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
                  >
                    {isLoading ? "Registering..." : "Register"}
                  </button>

                  {errorMsg && (
                    <p className="mt-2 text-sm text-red-500">{errorMsg}</p>
                  )}
                  {successMsg && (
                    <p className="mt-2 text-sm text-green-500">{successMsg}</p>
                  )}
                </div>
              </form>

              {/* ... (existing code) ... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;