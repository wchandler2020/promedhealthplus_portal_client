import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import OrderManagement from "./orders/OrderManagement";
import Documents from "./documemts/Documents";
import Patients from "./patient/Patient";
import { IoChatbubblesOutline } from "react-icons/io5";
import ContactModal from "../contact/contactModal/ContactModal";

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex-1">
      <div className="px-4 sm:px-6 ml-6 font-bold">
        <button
          onClick={() => setOpenModal(true)}
          className="
      bg-red-500 text-white 
      py-1.5 px-3               /* small screens (default) */
      md:py-2 md:px-4         /* medium screens */
      lg:py-3 lg:px-6         /* large screens */
      rounded-full shadow-lg 
      hover:bg-red-400 
      transition duration-300 
      flex items-center text-xs
    "
        >
          <IoChatbubblesOutline className="text-lg mr-2" />
          Chat With Your Rep
        </button>
      </div>
      {/* Modal */}
      <ContactModal open={openModal} onClose={() => setOpenModal(false)} />

      <div
        className="px-4 sm:px-6 lg:px-12 grid gap-6
                grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        <div className="h-full">
          <Patients />
        </div>
        <div className="h-full">
          <Documents />
        </div>
        <div className="h-full">
          <OrderManagement />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
