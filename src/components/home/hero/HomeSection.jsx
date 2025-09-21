// src/components/hero/HomeSection.jsx

import React, { useState } from "react";
import wound_care_bg from "../../../assets/images/woundcare_bg_img.jpg";
import ContactModal from "./ContactModal";

const HeroSection = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <section className="relative px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden py-48 flex items-center min-h-screen">
        
        {/* The background image container */}
        <div className="absolute inset-0 z-0">
          <img
            src={wound_care_bg}
            alt="promed health plus"
            className="w-full h-full object-cover"
          />
        </div>

        {/* The semi-transparent overlay */}
        <div className="absolute inset-0 z-0 bg-white/50 dark:bg-gray-800/60"></div>

        {/* The content container */}
        <div className="lg:w-3/4 xl:w-2/4 relative z-10 lg:mt-16">
          <div>
            <h1 className="text-gray-800 dark:text-white text-3xl md:text-4xl xl:text-5xl font-semibold leading-tight">
              Promed Health <span className="text-blue-500 dark:text-blue-600">Plus</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-snug mt-4">
              Empowering Providers with Comprehensive Wound Care Solutions
            </p>
            <button
              onClick={handleOpen}
              className="px-8 py-4 bg-blue-500 dark:bg-blue-600 text-white rounded-lg inline-block mt-8 font-semibold hover:bg-blue-400 dark:hover:bg-blue-500 transition-colors duration-200"
            >
              CONTACT US
            </button>
          </div>
        </div>
      </section>
      <ContactModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default HeroSection;