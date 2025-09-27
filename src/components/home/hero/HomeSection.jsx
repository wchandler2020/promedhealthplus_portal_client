// src/components/hero/HomeSection.jsx

import React, { useState } from "react";
import { motion } from "framer-motion";
import wound_care_bg from "../../../assets/images/woundcare_bg_img.jpg";
import ContactModal from "./ContactModal";

const HeroSection = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Framer Motion Variants for Staggered Entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
        delayChildren: 0.3,   
      },
    },
  };

  // Variants for Content (H1, P, Button)
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 150, 
        damping: 20 
      } 
    },
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      {/* 💥 KEY CHANGE: Replaced custom padding and height with min-h-screen */}
      <section className="relative px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 overflow-hidden flex items-center min-h-screen"> 
        
        {/* The background image container with Motion for subtle scale-in */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src={wound_care_bg}
            alt="Medical professionals working on wound care"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* The semi-transparent overlay */}
        <div className="absolute inset-0 z-0 bg-gray-900/60 dark:bg-gray-900/80"></div>

        {/* The content container with Stagger animation */}
        <motion.div 
          className="lg:w-3/4 xl:w-2/4 relative z-10 py-16" // Added vertical padding for content safety
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm shadow-2xl"> 
            {/* Title - Updated classes for one line on mobile */}
            <motion.h1 
              className="text-white text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-semibold leading-tight drop-shadow-lg whitespace-nowrap"
              variants={itemVariants}
            >
              Promed Health&nbsp;<span className="text-indigo-400">Plus</span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              className="text-gray-200 text-lg md:text-1xl leading-snug mt-4 max-w-lg drop-shadow-md"
              variants={itemVariants}
            >
              Empowering Providers with Comprehensive Wound Care Solutions
            </motion.p>
            
            {/* CTA Button */}
            <motion.button
              onClick={handleOpen}
              className="px-10 py-4 bg-indigo-600 text-white rounded-lg inline-block mt-8 font-semibold text-lg uppercase tracking-wider hover:bg-indigo-700 transition-colors duration-300 shadow-xl"
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(0, 0, 0, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </section>
      <ContactModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default HeroSection;