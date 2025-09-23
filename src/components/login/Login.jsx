import React, { useState, useContext } from "react";
import { AuthContext } from "../../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import login_bg_img_2 from "../../assets/images/login_bg.jpg";
import { IoArrowBack } from "react-icons/io5";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const result = await login(email, password);

    if (result.mfa_required) {
      navigate("/mfa", { state: { session_id: result.session_id, email } });
    } else if (result.success) {
      navigate("/dashboard");
    } else {
      setErrorMsg(result.error);
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="flex justify-center h-screen relative">
        {/* Back arrow visible on all screen sizes */}
        <Link
          to="/"
          className="absolute top-6 left-6 z-50 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full shadow-lg transition duration-300"
          title="Back to Home"
        >
          <IoArrowBack size={24} />
        </Link>

        {/* Left image panel (only shown on large screens) */}
        <div
          className="relative hidden bg-cover lg:block lg:w-2/3"
          style={{ backgroundImage: `url(${login_bg_img_2})` }}
        >
          <div className="absolute inset-0 z-0 bg-white/60 dark:bg-gray-800/60"></div>
          <div className="flex items-center h-full px-20 relative z-20">
            <div>
              <h2 className="text-5xl font-semibold text-gray-800 dark:text-white">
                ProMed Health Plus
              </h2>
              <p className="max-w-xl mt-3 text-gray-600 dark:text-gray-300 text-xl font-light">
                Improving Patient Outcomes with Proven Wound Care Solutions
              </p>
            </div>
          </div>
        </div>

        {/* Right login panel */}
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6 bg-white dark:bg-gray-900 rounded-lg">
          <div className="flex-1">
            <div className="text-center">
              <p className="mt-3 text-gray-900 dark:text-gray-100 text-xl font-semibold uppercase">
                Sign in to access your account
              </p>
            </div>

            <div className="mt-8">
              <form onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-800 dark:text-gray-200"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@example.com"
                    className="block w-full px-4 py-2 mt-2 text-gray-600 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:border-blue-500 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm text-gray-800 dark:text-gray-200"
                    >
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-gray-400 dark:text-gray-500 focus:text-blue-500 dark:focus:text-blue-400 hover:text-blue-400 dark:hover:text-blue-300 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    className="block w-full px-4 py-2 mt-2 text-gray-600 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md focus:border-blue-500 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mt-6">
                  <button
                    disabled={isLoading}
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 uppercase"
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </button>
                  {errorMsg && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {errorMsg}
                    </p>
                  )}
                </div>
              </form>

              <p className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
                Don't have an account yet?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 dark:text-blue-400 focus:outline-none focus:underline hover:underline"
                >
                  Register
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

export default Login;
