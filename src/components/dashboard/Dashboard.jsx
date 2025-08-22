import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import Orders from "./orders/Orders";
import Documents from "./documemts/Documents";
import Patients from "./patient/Patient";
import { IoChatbubblesOutline } from "react-icons/io5";
import ContactModal from '../contact/contactModal/ContactModal'

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex-1">
      <div className="px-4 sm:px-6 ml-6 font-bold">
        <button
          onClick={() => setOpenModal(true)}
          className="bg-red-500 text-white py-3 px-6 rounded-full shadow-lg hover:bg-red-400 transition duration-300 flex items-center"
        >
          <IoChatbubblesOutline className="text-lg mr-2" /> Chat With Your Rep
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
          <Orders />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
