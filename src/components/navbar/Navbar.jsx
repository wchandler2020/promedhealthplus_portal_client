import React, { useState, useEffect, useRef, useContext } from "react";
import default_user_img from "../../assets/images/default_user.jpg";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { AuthContext } from "../../utils/auth";
import NotificationModal from "./NotificationModal";
import axiosAuth from "../../utils/axios";

const MobileMenuIconSVG = () => (
  <svg
    className="block h-4 w-4 fill-current text-purple-400"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Mobile menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
  </svg>
);

const CloseMenuIconSVG = () => (
  <svg
    className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    ></path>
  </svg>
);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const notificationRef = useRef(null);

  // const { user, logout } = useContext(AuthContext);
  const { user, logout, verifyToken } = useContext(AuthContext);
  const isAuthenticated = !!user && user.verified;

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileRef = useRef(null);
  console.log("profile data: ", profile);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) closeMobileMenu();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const { success, data } = await verifyToken(
        localStorage.getItem("accessToken")
      );
      if (success) {
        setProfile(data);
      }
      setLoadingProfile(false);
    };

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated, verifyToken]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const axiosInstance = axiosAuth();
        const [notifRes, countRes] = await Promise.all([
          axiosInstance.get("/provider/notifications/"),
          axiosInstance.get("/provider/notifications/unread-count/"),
        ]);

        setNotifications(notifRes.data);
        setNotificationCount(countRes.data.unread_count || 0);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    if (isAuthenticated) {
      fetchNotifications();
    }
  }, [isAuthenticated]);

  function removeDuplicateMedia(url) {
    if (url && typeof url === "string") {
      const mediaUrl = "https://promedhealthplus.blob.core.windows.net/media/";
      const duplicatedSegment = "media/images/"; // The duplicated part

      // Check for the duplicated segment in the URL
      if (url.includes(duplicatedSegment)) {
        // Replace the duplicated segment with the correct one
        return url.replace(duplicatedSegment, "images/");
      }
    }
    return url;
  }

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setShowModal(true);
    markAsRead(notification.id); // Mark as read when opened
    setShowDropdown(false); // Close the notification dropdown
  };

  const markAsRead = async (id) => {
  try {
    const axiosInstance = axiosAuth();
    await axiosInstance.patch(`/${id}/provider/mark-read/`); // ✅ FIXED
    setNotificationCount((prev) => Math.max(prev - 1, 0));
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  } catch (error) {
    console.error("Failed to mark notification as read:", error);
  }
};

const deleteNotification = async (id) => {
  try {
    const axiosInstance = axiosAuth();
    await axiosInstance.delete(`/${id}/provider/delete-notification/`); // ✅ FIXED
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setShowModal(false);
  } catch (error) {
    console.error("Failed to delete notification:", error);
  }
};

  function getTimeLabel(dateCreated) {
    const now = new Date();
    const created = new Date(dateCreated);
    const diffTime = Math.abs(now - created);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return "1 week ago";
    if (diffDays < 21) return "2 weeks ago";
    if (diffDays < 30) return "3 weeks ago";
    return "More than 30 days ago";
  }

  return (
    <div className="bg-white px-6 sm:px-8 mt-2 mb-10">
      <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
        <Link
          className="text-2xl sm:text-3xl font-semibold leading-none"
          to="/"
        >
          ProMed Health Plus
        </Link>

        <div className="lg:hidden">
          <button
            className="navbar-burger flex items-center text-blue-600 p-3"
            onClick={toggleMobileMenu}
          >
            <MobileMenuIconSVG />
          </button>
        </div>

        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:space-x-6">
          <li>
            <Link
              className="text-base text-gray-800 hover:text-purple-400 font-semibold"
              to="/"
            >
              Home
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link
                className="text-base text-gray-800 hover:text-purple-400 font-semibold"
                to="/dashboard/"
              >
                Dashboard
              </Link>
            </li>
          )}
          <li>
            <Link
              className="text-base text-gray-800 hover:text-purple-400 font-semibold"
              to="/about/"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              className="text-base text-gray-800 hover:text-purple-400 font-semibold"
              to="/services/"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              className="text-base text-gray-800 hover:text-purple-400 font-semibold"
              to="/contact/"
            >
              Contact
            </Link>
          </li>
        </ul>

        {isAuthenticated ? (
          <div className="hidden lg:flex items-center space-x-4">
            <div
              className="relative notification-container"
              ref={notificationRef}
            >
              <IoIosNotificationsOutline
                className="text-3xl text-gray-500 cursor-pointer font-semibold"
                onClick={() => setShowDropdown((prev) => !prev)}
              />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out">
                  <div className="p-3 border-b text-sm font-semibold text-gray-700 text-center">
                    Notifications
                  </div>
                  <ul className="max-h-60 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <li
                          key={notif.id}
                          onClick={() => handleNotificationClick(notif)}
                          className={`px-4 py-2 text-xs flex flex-col ${
                            notif.is_read ? "text-gray-400" : "text-gray-700"
                          } hover:bg-gray-100 cursor-pointer`}
                        >
                          <div className="flex justify-between items-center">
                            <span>{notif.message}</span>
                            {notif.data && (
                              <IoEyeOutline className="text-gray-400 text-lg ml-2" />
                            )}
                          </div>
                          <span className="text-[10px] text-gray-400 mt-1 italic">
                            {getTimeLabel(notif.date_created)}
                          </span>
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-[10px] text-gray-500 text-center">
                        No notifications
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
            <div
              className="relative"
              onClick={() => setShowProfileDropdown(true)}
              // onMouseLeave={() => setShowProfileDropdown(false)}
              ref={profileRef}
            >
              <div className="flex items-center space-x-2 cursor-pointer">
                <h6 className="text-xs font-semibold text-gray-800">
                  {profile?.full_name ||
                    profile?.user?.full_name ||
                    "Dr. Kara Johnson"}
                </h6>
                <img
                  src={
                    profile?.image?.startsWith("http")
                      ? removeDuplicateMedia(profile.image)
                      : profile?.image
                      ? `${process.env.REACT_APP_MEDIA_URL}${profile.image}`
                      : default_user_img
                  }
                  alt="User Profile"
                  className="w-10 h-10 rounded-full object-cover object-top border border-gray-300 shadow-sm"
                />
              </div>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-[10px] text-gray-700 hover:bg-gray-100 cursor-pointer uppercase font-semibold"
                  >
                    <IoEyeOutline className="mr-1" />
                    View Profile
                  </Link>
                  <Link
                    onClick={logout}
                    className="flex items-center px-4 py-2 text-[10px] text-gray-700 hover:bg-gray-100 cursor-pointer uppercase font-semibold"
                  >
                    <IoMdLogOut className="mr-1" />
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/login">
              <button className="px-4 py-2 text-sm tracking-wide text-white transition-colors duration-200 transform bg-purple-500 rounded-md hover:bg-purple-400 focus:outline-none focus:bg-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 uppercase">
                Provider Login
              </button>
            </Link>
            <Link to="/register">
              <button className="px-4 py-2 text-sm tracking-wide text-purple-500 border border-purple-500 rounded-md transition-colors duration-200 hover:bg-purple-100 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-50 uppercase">
                Provider Registration
              </button>
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      <div
        className={`navbar-menu relative z-50 ${
          isMobileMenuOpen ? "" : "hidden"
        }`}
      >
        <div
          className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
          onClick={closeMobileMenu}
        ></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8 justify-between">
            <Link
              className="mr-auto text-2xl font-semibold leading-none pl-3"
              to="/"
            >
              ProMed Health Plus
            </Link>
            <button className="navbar-close" onClick={closeMobileMenu}>
              <CloseMenuIconSVG />
            </button>
          </div>

          <ul>
            <li className="mb-1">
              <Link
                className="block p-4 text-sm text-gray-800 hover:bg-purple-50 hover:text-purple-500 rounded"
                to="/"
              >
                Home
              </Link>
            </li>
            {isAuthenticated && (
              <li className="mb-1">
                <Link
                  className="block p-4 text-sm text-gray-800 hover:bg-purple-50 hover:text-purple-500 rounded"
                  to="/dashboard/"
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li className="mb-1">
              <Link
                className="block p-4 text-sm text-gray-800 hover:bg-purple-50 hover:text-purple-500 rounded"
                to="/about/"
              >
                About Us
              </Link>
            </li>
            <li className="mb-1">
              <Link
                className="block p-4 text-sm text-gray-800 hover:bg-purple-50 hover:text-purple-500 rounded"
                to="/services/"
              >
                Services
              </Link>
            </li>
            <li className="mb-1">
              <Link
                className="block p-4 text-sm text-gray-800 hover:bg-purple-50 hover:text-purple-500 rounded"
                to="/contact/"
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="mt-auto pt-6 flex flex-col">
            {isAuthenticated ? (
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4 justify-between">
                  <div className="relative">
                    <IoIosNotificationsOutline className="text-2xl text-gray-600 cursor-pointer" />
                    {notificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                        {notificationCount}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-row items-center">
                    <h6 className="text-[12px] font-semibold text-gray-800">
                      {profile?.full_name ||
                        profile?.user?.full_name ||
                        "Dr. Kara Johnson"}
                    </h6>

                    <img
                      src={
                        profile?.image?.startsWith("http")
                          ? profile.image
                          : profile?.image
                          ? `${process.env.REACT_APP_MEDIA_URL}${profile.image}`
                          : default_user_img
                      }
                      alt="User Profile"
                      className="w-10 h-10 rounded-full object-cover object-top border border-gray-300 shadow-sm"
                    />
                  </div>
                </div>

                {/* 👇 New Logout button for mobile */}
                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="w-full px-4 py-2 text-sm tracking-wide text-gray-700 border border-gray-300 rounded-md transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <Link to="/login">
                  <button className="w-full px-4 py-2 text-sm tracking-wide text-white transition-colors duration-200 transform bg-purple-500 rounded-md hover:bg-purple-400 focus:outline-none focus:bg-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 uppercase">
                    Provider Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="w-full px-4 py-2 text-sm tracking-wide text-purple-500 border border-purple-500 rounded-md transition-colors duration-200 hover:bg-purple-100 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-50 uppercase">
                    Provider Register
                  </button>
                </Link>
              </div>
            )}

            <p className="my-4 text-xs text-center text-gray-400">
              ProMed Health Plus &copy; {new Date().getFullYear()}
            </p>
          </div>
        </nav>
      </div>
      <NotificationModal
        open={showModal}
        handleClose={() => setShowModal(false)}
        notification={selectedNotification}
        handleDelete={deleteNotification}
      />
    </div>
  );
};

export default Navbar;
