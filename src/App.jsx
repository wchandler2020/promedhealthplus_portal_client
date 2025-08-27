import Dashboard from "./components/dashboard/Dashboard";
import Register from "./components/register/Register";
import { Route, HashRouter, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import About from "./components/about/About";
import Services from "./components/services/Services";
import Contact from "./components/contact/Contact";
import MFA from "./components/MFA/MFA";
import PrivateRoute from "./utils/privateRoutes";
import FillablePdf from "./components/dashboard/documemts/FillablePdf";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import ProviderProfileCard from "./components/profile/ProviderProfileCard";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "./utils/auth";
import "./App.css";
import VerifyEmail from "./components/verifyEmail/VerifyEmail";

function ErrorButton() {
  return (
    <button
      onClick={() => {
        throw new Error("This is your first error!");
      }}
    >
      Break the world
    </button>
  );
}

function AppWrapper() {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/register", "/register/", "/mfa"];
  const shouldHideNavAndFooter = hideNavbarPaths.includes(location.pathname);
  const { logout, user } = useContext(AuthContext);
  const timeoutRef = useRef(null);
  const warningTimeoutRef = useRef(null);
  const logoutTimeoutRef = useRef(null); // <-- Add this

  useEffect(() => {
    if (!user) return;

    const HIPAA_IDLE_TIMEOUT_MINUTES = 15;
    const WARNING_BEFORE_LOGOUT_SECONDS = 60;

    const warningDuration =
      1000 * 60 * HIPAA_IDLE_TIMEOUT_MINUTES -
      1000 * WARNING_BEFORE_LOGOUT_SECONDS;
    const logoutDuration = 1000 * 60 * HIPAA_IDLE_TIMEOUT_MINUTES;

    const logoutAndRedirect = () => {
      logout();
      window.location.href = "/login";
    };

    const showWarning = () => {
      toast("You will be logged out in 1 minute due to inactivity.", {
        icon: "⚠️",
        duration: WARNING_BEFORE_LOGOUT_SECONDS * 1000,
      });
    };

    const resetTimers = () => {
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
      if (logoutTimeoutRef.current) clearTimeout(logoutTimeoutRef.current);

      warningTimeoutRef.current = setTimeout(showWarning, warningDuration);
      logoutTimeoutRef.current = setTimeout(logoutAndRedirect, logoutDuration);
    };

    resetTimers(); // Initialize on mount

    const activityEvents = [
      "mousemove",
      "keydown",
      "click",
      "scroll",
      "touchstart",
    ];

    activityEvents.forEach((event) =>
      window.addEventListener(event, resetTimers)
    );

    return () => {
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
      if (logoutTimeoutRef.current) clearTimeout(logoutTimeoutRef.current);
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetTimers)
      );
    };
  }, [logout, user]);

  return (
    <>
      <Toaster />
      {!shouldHideNavAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} /> 
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProviderProfileCard />
            </PrivateRoute>
          }
        />
        {/* <Route path='/fillable-pdf' element={<PrivateRoute><FillablePdf /></PrivateRoute>} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/mfa" element={<MFA />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {!shouldHideNavAndFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <AppWrapper />
    </HashRouter>
  );
}

export default App;
