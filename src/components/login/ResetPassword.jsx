import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { IoCheckmarkCircleOutline, IoArrowBack } from "react-icons/io5";
import { API_BASE_URL } from "../../utils/constants";
import login_bg_img from "../../assets/images/login_img.jpg";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Password checks
  const hasMinLength = password.length >= 12;
  const hasUppercase = (password.match(/[A-Z]/g) || []).length >= 2;
  const hasLowercase = (password.match(/[a-z]/g) || []).length >= 2;
  const hasNumbers = (password.match(/[0-9]/g) || []).length >= 2;
  const hasSpecialChars = (password.match(/[^A-Za-z0-9]/g) || []).length >= 2;

  const allValid =
    hasMinLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumbers &&
    hasSpecialChars &&
    password === password2;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    if (!allValid) {
      setError("Password does not meet all requirements or does not match.");
      setIsLoading(false);
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/provider/reset-password/${token}/`, {
        password,
        confirm_password: password2,
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.error || "There was an error resetting your password."
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
            to="/forgot-password"
            className="absolute top-6 left-6 z-20 text-white hover:text-blue-300 transition duration-200 z-50"
            title="Back to Forgot Password"
          >
            <IoArrowBack size={28} />
          </Link>

          <div className="flex items-center h-full px-20 bg-gray-9600 bg-opacity-40 relative z-20">
            <div>
              <h2 className="text-5xl font-semibold text-white">
                ProMed Health Plus
              </h2>
              <p className="max-w-xl mt-3 text-white text-xl font-light">
                Improving Patient Outcomes with Proven Wound Care Solutions 
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <p className="mt-3 text-gray-900 text-xl font-semibold uppercase">
                Reset Your Password
              </p>
            </div>
            <div className="mt-8">
              {success ? (
                <div className="p-4 bg-green-50 rounded-md">
                  <p className="text-green-600 text-center font-medium">
                    Password reset successful! Redirecting to login...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm text-gray-800"
                    >
                      New Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Create a new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-600 placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      required
                    />

                    <div className="mt-2 text-sm">
                      <ul className="list-disc list-inside text-gray-500">
                        <li
                          className={
                            hasMinLength
                              ? "text-green-600 flex items-center"
                              : "flex items-center"
                          }
                        >
                          {hasMinLength && (
                            <IoCheckmarkCircleOutline className="mr-1 text-green-600" />
                          )}
                          Minimum 12 characters
                        </li>
                        <li
                          className={
                            hasUppercase
                              ? "text-green-600 flex items-center"
                              : "flex items-center"
                          }
                        >
                          {hasUppercase && (
                            <IoCheckmarkCircleOutline className="mr-1 text-green-600" />
                          )}
                          At least two uppercase letters
                        </li>
                        <li
                          className={
                            hasLowercase
                              ? "text-green-600 flex items-center"
                              : "flex items-center"
                          }
                        >
                          {hasLowercase && (
                            <IoCheckmarkCircleOutline className="mr-1 text-green-600" />
                          )}
                          At least two lowercase letters
                        </li>
                        <li
                          className={
                            hasNumbers
                            ? "text-green-600 flex items-center"
                              : "flex items-center"
                          }
                        >
                          {hasNumbers && (
                            <IoCheckmarkCircleOutline className="mr-1 text-green-600" />
                          )}
                          At least two numbers
                        </li>
                        <li
                          className={
                            hasSpecialChars
                              ? "text-green-600 flex items-center"
                              : "flex items-center"
                          }
                        >
                          {hasSpecialChars && (
                            <IoCheckmarkCircleOutline className="mr-1 text-green-600" />
                          )}
                          At least two special characters
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-2 text-sm text-gray-800"
                    >
                      Confirm New Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      placeholder="Repeat your password"
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-600 placeholder-gray-500 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                      />
                      <span className="ml-2 text-sm text-gray-600">Show Password</span>
                    </label>
                  </div>

                  <div className="mt-6">
                    <button
                      disabled={!allValid || isLoading}
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 uppercase"
                      type="submit"
                    >
                      {isLoading ? "Resetting..." : "Reset Password"}
                    </button>
                    {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;