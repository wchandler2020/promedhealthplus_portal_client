import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Register from "./components/register/Register";
import { Route, BrowserRouter, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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

function ErrorButton() {
  return (
    <button
      onClick={() => {
        throw new Error('This is your first error!');
      }}
    >
      Break the world
    </button>
  );
}

function AppWrapper() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register', '/register/', '/mfa'];

  const shouldHideNavAndFooter = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      <Toaster />
      {!shouldHideNavAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
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
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
