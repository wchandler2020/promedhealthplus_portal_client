// src/components/login/ForgotPassword.jsx

import React, { useState } from "react";
import { API_BASE_URL } from "../../utils/constants";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import login_bg_img from "../../assets/images/login_img.jpg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await axios.post(`${API_BASE_URL}/provider/request-password-reset/`, {
        email,
      });
      setSent(true);
    } catch (err) {
      setError(
        "There was an issue sending the reset link. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-white">
      <div className="flex justify-center h-screen">
        <div
          className="relative hidden bg-cover lg:block lg:w-2/3"
          style={{ backgroundImage: `url(${login_bg_img})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

          {/* Back arrow */}
          <Link
            to="/login"
            className="absolute top-6 left-6 z-20 text-white hover:text-blue-300 transition duration-200 z-50"
            title="Back to Login"
          >
            <IoArrowBack size={28} />
          </Link>

          <div className="flex items-center h-full px-20 bg-gray-9600 bg-opacity-40 relative z-20">
            <div>
              <h2 className="text-5xl font-semibold text-white">
                ProMed Health Plus
              </h2>
              <p className="max-w-xl mt-3 text-white text-xl font-light">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                autem ipsa, nulla laboriosam dolores, repellendus perferendis
                libero suscipit nam temporibus molestiae
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <p className="mt-3 text-gray-900 text-xl font-semibold uppercase">
                Forgot Your Password?
              </p>
              <p className="mt-2 text-gray-500 text-sm">
                Enter your email address to receive a password reset link.
              </p>
            </div>
            <div className="mt-8">
              {sent ? (
                <div className="p-4 bg-purple-50 rounded-md">
                  <p className="text-purple-500 text-center font-medium">
                    Password reset link sent! Please check your inbox.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm text-gray-800"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="example@example.com"
                      className="block w-full px-4 py-2 mt-2 text-gray-600 placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:border-purple-400 focus:ring-purple-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mt-6">
                    <button
                      disabled={isLoading}
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-500 rounded-md hover:bg-purple-400 focus:outline-none focus:bg-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 uppercase"
                      type="submit"
                    >
                      {isLoading ? "Sending..." : "Send Reset Link"}
                    </button>
                    {error && (
                      <p className="text-red-600 text-sm mt-2">{error}</p>
                    )}
                  </div>
                </form>
              )}
              <p className="mt-6 text-sm text-center text-gray-500">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="text-purple-600 focus:outline-none focus:underline hover:underline"
                >
                  Sign In
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;