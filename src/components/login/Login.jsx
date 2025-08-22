import React, { useState, useContext } from "react";
import { AuthContext } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import bg_image from "../../assets/images/bg_image_01.jpg";
import { Link } from "react-router-dom";
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
      // Redirect to MFA page, pass session_id and email
      navigate("/mfa", { state: { session_id: result.session_id, email } });
    } else if (result.success) {
      navigate("/dashboard"); // redirect to dashboard or home
    } else {
      setErrorMsg(result.error);
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-white dark:bg-white">
      <div className="flex justify-center h-screen">
        <div
          className="relative hidden bg-cover lg:block lg:w-2/3"
          style={{ backgroundImage: `url(${bg_image})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-30 z-10"></div>

          {/* Back arrow */}
          <Link
            to="/"
            className="absolute top-6 left-6 z-20 text-white hover:text-blue-300 transition duration-200 z-50"
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

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
                Brand
              </h2>
              <p className="mt-3 text-gray-900 text-xl font-bold">
                Sign in to access your account
              </p>
            </div>
            <div className="mt-8">
              <form onSubmit={handleLogin}>
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
                    className="block w-full px-4 py-2 mt-2 text-gray-600 placeholder-gray-500 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-white dark:text-gray-600 dark:border-gray-700 focus:border-emerald-400 dark:focus:border-emerald-400 focus:ring-emerald-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm text-gray-800">
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-sm text-gray-400 focus:text-emerald-500 hover:text-emerald-400 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-white dark:text-gray-500 dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-500 focus:outline-none focus:ring focus:ring-opacity-40"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-6">
                  <button
                    disabled={isLoading}
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-emerald-500 rounded-md hover:bg-emerald-400 focus:outline-none focus:bg-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </button>
                  {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
                </div>
              </form>
              <p className="mt-6 text-sm text-center text-gray-500">
                Don't have an account yet?{" "}
                <a
                  href="/register"
                  className="text-emerald-600 focus:outline-none focus:underline hover:underline"
                >
                  Sign up
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

export default Login;
