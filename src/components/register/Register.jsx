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
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

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

    const result = await register(fullName, email, password, password2);

    if (result.success) {
      setSuccessMsg("Account created successfully!");
      setFullName("");
      setEmail("");
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
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-30 z-10"></div>

          {/* Back arrow */}
          <Link
            to="/"
            className="absolute top-6 left-6 z-50 text-white hover:text-blue-300 transition duration-200"
            title="Back to Home"
          >
            <IoArrowBack size={28} />
          </Link>

          <div className="flex items-center h-full px-20 bg-gray-9600 bg-opacity-40 relative z-20">
            <div>
              <h2 className="text-4xl font-bold text-black">
                ProMed Health Plus
              </h2>
              <p className="max-w-xl mt-3 text-gray-900">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                autem ipsa, nulla laboriosam dolores, repellendus perferendis
                libero suscipit nam temporibus molestiae
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
                Brand
              </h2>
              <p className="mt-3 text-gray-900 text-xl font-bold">
                Create your account
              </p>
            </div>

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
                    htmlFor="password"
                    className="block mb-2 text-sm text-gray-800"
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring focus:ring-blue-400 focus:outline-none focus:ring-opacity-40"
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
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Repeat your password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:bg-white dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring focus:ring-blue-400 focus:outline-none focus:ring-opacity-40"
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

              <p className="mt-6 text-sm text-center text-gray-400">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-emerald-500 focus:outline-none focus:underline hover:underline"
                >
                  Log in
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
