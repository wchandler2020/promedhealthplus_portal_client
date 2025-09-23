import React, { useState, useContext } from "react";
import { AuthContext } from "../../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import register_bg_img_2 from '../../assets/images/register_bg_img.jpg';
import { IoArrowBack, IoCheckmarkCircleOutline } from "react-icons/io5";
import { countryCodesList } from "../../utils/data";
import toast from "react-hot-toast";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [npiNumber, setNpiNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // New state variables to match the Django model
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [facility, setFacility] = useState("");
  const [facilityPhoneNumber, setFacilityPhoneNumber] = useState("");

  // Validation rules
  const hasMinLength = password.length >= 12;
  const hasUppercase = (password.match(/[A-Z]/g) || []).length >= 2;
  const hasLowercase = (password.match(/[a-z]/g) || []).length >= 2;
  const hasNumbers = (password.match(/[0-9]/g) || []).length >= 2;
  const hasSpecialChars = (password.match(/[^A-Za-z0-9]/g) || []).length >= 2;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const formattedPhoneNumber = `${countryCode}${phoneNumber.replace(/\D/g, "")}`;
    const formattedFacilityPhoneNumber = facilityPhoneNumber.replace(/\D/g, "");

    if (password !== password2) {
      setErrorMsg("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (!(hasMinLength && hasUppercase && hasLowercase && hasNumbers && hasSpecialChars)) {
        setErrorMsg("Password does not meet all complexity requirements.");
        setIsLoading(false);
        return;
    }
    
    const formData = {
        full_name: fullName,
        email,
        phone_number: formattedPhoneNumber,
        country_code: countryCode,
        password,
        password2,
        npi_number: npiNumber,
        city,
        state,
        country,
        facility,
        facility_phone_number: formattedFacilityPhoneNumber,
    };
    
    const result = await register(formData);

    if (result.success) {
      toast.success(
        "Account created! Please check your email to verify your account."
      );
      // Reset form fields
      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setNpiNumber("");
      setCountryCode("+1");
      setPassword("");
      setPassword2("");
      setCity("");
      setState("");
      setCountry("");
      setFacility("");
      setFacilityPhoneNumber("");
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
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <div className="flex justify-center flex-col lg:flex-row relative">
        <Link
          to="/"
          className="absolute top-6 left-6 z-50 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full shadow-lg transition duration-300"
          title="Back to Home"
        >
          <IoArrowBack size={24} />
        </Link>
        <div
          className="relative hidden bg-cover lg:block lg:w-2/3"
          style={{ backgroundImage: `url(${register_bg_img_2})` }}
        >
          <div className="absolute inset-0 z-0 bg-white/60 dark:bg-gray-800/60"></div>
          <div className="flex items-center h-full px-20 relative z-20">
            <div>
              <h2 className="text-5xl font-semibold text-gray-800 dark:text-white">
                ProMed Health Plus
              </h2>
              <p className="max-w-xl mt-3 text-gray-600 dark:text-gray-300 text-xl font-light">
                Securely manage your patient care and medical supplies with a single, intuitive platform.
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-md px-6 mx-auto lg:w-2/6 bg-white dark:bg-gray-900 rounded-lg lg:h-screen lg:overflow-y-auto">
          <div className="flex-1 my-auto py-8">
            <div className="text-center">
              <p className="mt-3 text-gray-900 dark:text-gray-100 text-xl font-semibold uppercase">
                Create your account
              </p>
            </div>
            <div className="mt-8">
              <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm text-gray-800 dark:text-gray-200">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-400 focus:outline-none focus:ring-opacity-40"
                    required
                  />
                </div>
                {/* Email */}
                <div className="mt-4">
                  <label htmlFor="email" className="block mb-2 text-sm text-gray-800 dark:text-gray-200">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="example@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-400 focus:outline-none focus:ring-opacity-40"
                    required
                  />
                </div>
                {/* Phone Number */}
                <div className="mt-4">
                  <label htmlFor="phoneNumber" className="block mb-2 text-sm text-gray-800 dark:text-gray-200">
                    Phone Number
                  </label>
                  <div className="flex">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-1/3 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-l-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-400 focus:outline-none focus:ring-opacity-40"
                    >
                      {countryCodesList.map((country) => (
                        <option key={`${country.code}-${country.name}`} value={country.code}>
                          {country.flag} {country.name} ({country.code})
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      id="phoneNumber"
                      placeholder="555-555-5555"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-2/3 px-4 py-2 border border-l-0 border-gray-200 dark:border-gray-600 rounded-r-md text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 focus:border-blue-400 focus:ring focus:ring-blue-400 focus:outline-none focus:ring-opacity-40"
                    />
                  </div>
                </div>

                {/* Facility Name */}
                <div className="mt-4">
                  <label htmlFor="facility" className="block mb-2 text-sm text-gray-800 dark:text-gray-200">
                    Facility Name
                  </label>
                  <input
                    type="text"
                    id="facility"
                    placeholder="Your Clinic or Hospital Name"
                    value={facility}
                    onChange={(e) => setFacility(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-400 focus:outline-none focus:ring-opacity-40"
                    required
                  />
                </div>

                {/* Facility Phone Number */}
                <div className="mt-4">
                  <label htmlFor="facilityPhoneNumber" className="block mb-2 text-sm text-gray-800 dark:text-gray-200">
                    Facility Phone Number
                  </label>
                  <input
                    type="tel"
                    id="facilityPhoneNumber"
                    placeholder="555-555-5555"
                    value={facilityPhoneNumber}
                    onChange={(e) => setFacilityPhoneNumber(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-400 focus:outline-none focus:ring-opacity-40"
                    required
                  />
                </div>
                
                {/* City */}
                <div className="mt-4">
                  <label htmlFor="city" className="block mb-2 text-sm text-gray-800 dark:text-gray-200">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    placeholder="e.g., Chicago"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-400 focus:outline-none focus:ring-opacity-40"
                    required
                  />
                </div>

                {/* State */}
                <div className="mt-4">
                  <label htmlFor="state" className="block mb-2 text-sm text-gray-800 dark:text-gray-200">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    placeholder="e.g., IL"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-400 focus:outline-none focus:ring-opacity-40"
                    required
                  />
                </div>

                {/* Country */}
                <div className="mt-4">
                  <label htmlFor="country" className="block mb-2 text-sm text-gray-800 dark:text-gray-200">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    placeholder="e.g., United States"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-400 focus:outline-none focus:ring-opacity-40"
                    required
                  />
                </div>

                {/* NPI Number */}
                <div className="mt-4">
                  <label htmlFor="npiNumber" className="block mb-2 text-sm text-gray-800 dark:text-gray-200">
                    NPI Number
                  </label>
                  <input
                    type="text"
                    id="npiNumber"
                    placeholder="Your 10-digit NPI number"
                    value={npiNumber}
                    onChange={(e) => setNpiNumber(e.target.value)}
                    maxLength="10"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-400 focus:outline-none focus:ring-opacity-40"
                    required
                  />
                </div>

                {/* Password */}
                <div className="mt-4">
                  <label htmlFor="password" className="block mb-2 text-sm text-gray-800 dark:text-gray-200">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-400 focus:outline-none focus:ring-opacity-40"
                    required
                  />
                  <div className="mt-2 text-sm">
                    <ul className="list-disc list-inside text-gray-500 dark:text-gray-400">
                      {[
                        { valid: hasMinLength, text: "Minimum 12 characters" },
                        { valid: hasUppercase, text: "At least two uppercase letters" },
                        { valid: hasLowercase, text: "At least two lowercase letters" },
                        { valid: hasNumbers, text: "At least two numbers" },
                        { valid: hasSpecialChars, text: "At least two special characters" }
                      ].map(({ valid, text }, idx) => (
                        <li
                          key={idx}
                          className={`${valid ? "text-blue-600 dark:text-blue-400" : ""} flex items-center`}
                        >
                          {valid && (
                            <IoCheckmarkCircleOutline className="mr-1 text-blue-600 dark:text-blue-400" />
                          )}
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Confirm Password */}
                <div className="mt-4">
                  <label htmlFor="confirmPassword" className="block mb-2 text-sm text-gray-800 dark:text-gray-200">
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Repeat your password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:border-blue-400 focus:ring focus:ring-blue-400 focus:outline-none focus:ring-opacity-40"
                    required
                  />
                </div>
                {/* Show Password */}
                <div className="mt-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                    />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Show Password</span>
                  </label>
                </div>
                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 uppercase"
                  >
                    {isLoading ? "Registering..." : "Register"}
                  </button>
                  {errorMsg && (
                    <p className="mt-2 text-sm text-red-500 dark:text-red-400">
                      {errorMsg}
                    </p>
                  )}
                </div>
              </form>
              <p className="mt-6 text-sm text-center text-gray-400 dark:text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-500 dark:text-blue-400 focus:outline-none focus:underline hover:underline"
                >
                  Log in
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;