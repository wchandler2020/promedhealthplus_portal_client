import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../utils/auth";
import { FaRegEdit } from "react-icons/fa";
import { formatPhoneNumber } from "react-phone-number-input";
import axiosAuth from "../../utils/axios";
import ProviderProfileEdit from "./ProviderProfileEdit";
import { Modal, Box } from "@mui/material";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const ProviderProfileCard = () => {
  const { verifyToken } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    const { success, data } = await verifyToken(
      localStorage.getItem("accessToken")
    );
    if (success) {
      setProfile(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [verifyToken]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setError(null);
  };

  const handleSave = async (updatedData) => {
    setSaving(true);
    setError(null);
    try {
      const axiosInstance = axiosAuth();
      const response = await axiosInstance.put("/provider/profile/", updatedData);
      setProfile(response.data);http://localhost:3000/login#/
      setIsEditing(false);
      toast.success('Profile edit is complete.')
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Date formatting and other derived state should be done here
  if (loading)
    return (
      <div className="text-center mt-20 text-gray-600 text-lg">Loading...</div>
    );
  if (!profile)
    return (
      <div className="text-center mt-20 text-red-500 text-lg">
        Profile not found.
      </div>
    );
  
  const fullDateTime = profile.date_created;
  const profileCreatedDate = fullDateTime ? fullDateTime.split("T")[0] : "N/A";
  
  const formatUSPhoneNumber = (number) => {
    if (!number || typeof number !== "string" || number.length !== 10) {
      return number;
    }
    const areaCode = number.substring(0, 3);
    const middle = number.substring(3, 6);
    const last = number.substring(6, 10);
    return `(${areaCode}) ${middle} - ${last}`;
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-3xl">
        <div className="relative flex flex-col items-center py-10 px-6">
          <img
            src={
              profile.image?.startsWith("http")
                ? profile.image
                : `${process.env.REACT_APP_MEDIA_URL}${profile.image}`
            }
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg transform transition-transform duration-300 hover:scale-105 mt-2 object-cover object-top"
          />
          <h1 className="mt-4 text-2xl md:text-3xl font-extrabold text-gray-800">
            {profile.full_name || profile.user?.full_name}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {profile.city}, {profile.country}
          </p>
          <button
            onClick={handleEdit}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <FaRegEdit />
            Edit Profile
          </button>
          <div className="flex mt-8 w-full border-t border-gray-200 items-center"></div>
          <div className="flex mt-8 w-full">
            <h3 className="text-base font-bold text-gray-700 mr-2">Role: </h3>
            <p className="text-gray-600 text-base">
              {profile.role || "No Role provided."}
            </p>
          </div>
          <div className="flex mt-2 w-full">
            <h3 className="text-base font-bold text-gray-700 mr-2">Facility: </h3>
            <p className="text-gray-600 text-base">
              {profile.facility || "No Facility provided."}
            </p>
          </div>
          <div className="flex mt-2 w-full">
            <h3 className="text-base font-bold text-gray-700 mr-2">
              Facility Phone Number:{" "}
            </h3>
            <p className="text-gray-600 text-base">
              {formatUSPhoneNumber(profile.facility_phone_number) ||
                "No facility phone number provided."}
            </p>
          </div>
          <div className="flex mt-2 w-full">
            <h3 className="text-base font-bold text-gray-700 mr-2">
              Date Joined:{" "}
            </h3>
            <p className="text-gray-600 text-base">
              {profileCreatedDate || "No date provided."}
            </p>
          </div>
        </div>
      </div>
      <Modal open={isEditing} onClose={handleCancelEdit}>
        <Box sx={style}>
          <ProviderProfileEdit
            profile={profile}
            onSave={handleSave}
            onCancel={handleCancelEdit}
            isLoading={saving}
            error={error}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default ProviderProfileCard;