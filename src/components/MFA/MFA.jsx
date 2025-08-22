import React, { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../../utils/auth";
import axiosAuth from "../../utils/axios";
import { API_BASE_URL } from "../../utils/constants";
import bg_image from "../../assets/images/bg_image_01.jpg";
import {useNavigate } from "react-router-dom";

const MFA = () => {
  const { verifyCode, user } = useContext(AuthContext);
  const [code, setCode] = useState(new Array(6).fill(""));
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.verified) {
      navigate("/dashboard");
    }
    
  }, [user, navigate]);
  const handleChange = (value, index) => {
    if (/^\d$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (code[index]) {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullCode = code.join("");
    verifyCode(fullCode).then((response) => {
      if (response.success) {
        setVerified(true);
        navigate("/dashboard");
        setError(null);
      }
      else {
        setError(response.error || "Verification failed. Please try again.");
      }
  }).catch((err) => {
      setError(err.response?.data?.error || "An error occurred. Please try again.");
    });
  };

  return (
    <div className="bg-white dark:bg-white">
      <div className="flex justify-center h-screen">
        <div
          className="relative hidden bg-cover lg:block lg:w-2/3"
          style={{ backgroundImage: `url(${bg_image})` }}
        >
          <div className="absolute inset-0 bg-black opacity-35"></div>
          <div className="flex items-center h-full px-20 bg-gray-9600 bg-opacity-40">
            <div>
              <h2 className="text-4xl font-bold text-black">ProMed Health Plus</h2>
              <p className="max-w-xl mt-3 text-gray-900">
                We sent you a code via SMS. Enter it below to verify your identity.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6 justify-center">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">Two-Factor Authentication</h2>
              <p className="mt-3 text-gray-900">Enter the 6-digit code sent to your phone</p>
            </div>

            {!verified ? (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="flex justify-center gap-2 sm:gap-3">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputsRef.current[index] = el)}
                      type="text"
                      maxLength="1"
                      className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-100"
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  ))}
                </div>

                <input type="hidden" name="method" value="sms" />

                <button
                  type="submit"
                  className="w-full px-4 py-2 border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white rounded-md focus:outline-none focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
                >
                  Verify Code
                </button>

                {error && <p className="text-red-600 text-sm">{error}</p>}
              </form>
            ) : (
              <h3 className="mt-6 text-green-600 text-center">Verification successful!</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MFA;
