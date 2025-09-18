import Dashboard from "./components/dashboard/Dashboard";
import SalesRepDashboard from './components/salesRepDashboard/SalesRepDashboard'
import Register from "./components/register/Register";
import { Route, HashRouter, Routes, useLocation } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
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
import ForgotPassword from "./components/login/ForgotPassword";
import ResetPassword from "./components/login/ResetPassword";
import IvrForm from "./components/dashboard/patient/IvrForm";

function AppWrapper() {
  const location = useLocation();
  const hiddenPaths = [
    "/login",
    "/register",
    "/mfa",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
  ];
  const shouldHideNavAndFooter = hiddenPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  const { logout, user } = useContext(AuthContext);
  const warningTimeoutRef = useRef(null);
  const logoutTimeoutRef = useRef(null);

  console.log('AUTH USER: ', user)

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

    resetTimers();

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
      <div className="flex flex-col min-h-screen">
        {!shouldHideNavAndFooter && <Navbar />}

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ivr-form" element={<IvrForm />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mfa" element={<MFA />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />

            {/* --- Private Routes with Role-Based Redirection --- */}
            
            {/* The existing Provider Dashboard route */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            
            {/* The new Sales Rep Dashboard route */}
            <Route
              path="/sales-rep/dashboard"
              element={
                <PrivateRoute>
                  <SalesRepDashboard />
                </PrivateRoute>
              }
            />

            {/* Other private routes */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProviderProfileCard />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>

        {!shouldHideNavAndFooter && <Footer />}
      </div>
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