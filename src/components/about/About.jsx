import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
// 1. Import motion
import { motion } from "framer-motion";
import { IoMailOutline, IoCallOutline } from "react-icons/io5";
import { states, about_approach_data, about_team } from "../../utils/data";

// Removed local placeholder data for cleanliness, assuming data is imported correctly.

const About = () => {
  const [open, setOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    question: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: 600,
    // FIX: Added max height and overflowY for scrolling
    maxHeight: "90vh", // Max height to 90% of viewport height
    overflowY: "auto", // Enable vertical scrolling
    bgcolor: isDarkMode ? "#1f2937" : "transparent",
    boxShadow: "none",
    outline: "none",
  };

  const darkModeClass = isDarkMode ? "dark" : "";

  // --- Framer Motion Animation Variants ---

  // Fade in and slide up from below
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.15,
      },
    },
  };

  // Individual item animation
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className={darkModeClass}>
      <div className="bg-white dark:bg-gray-900 transition-colors duration-500 min-h-screen">
        {/* Hero Section (Immediate Load/Stagger) */}
        <motion.header
          className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white pt-32 pb-16 transition-colors duration-500"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-semibold"
              variants={itemVariants}
            >
              About Promed Health <span className="text-indigo-500">Plus</span>
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl mt-4 max-w-4xl mx-auto opacity-90 text-gray-600 dark:text-gray-300"
              variants={itemVariants}
            >
              Empowering Providers with Comprehensive Wound Care Solutions
            </motion.p>
          </div>
        </motion.header>

        {/* Main Section */}
        <main className="container mx-auto px-4 sm:px-6 py-16">
          {/* Our Story (Mission & Image) */}
          <motion.section
            className="mb-20 p-6 md:p-12 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-inner dark:shadow-none transition-colors duration-500"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div className="md:w-1/2" variants={itemVariants}>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
                  At **ProMed Health Plus**, we are dedicated to transforming
                  wound care by equipping private practices with the tools and
                  support they need to thrive. With over 80% of our services
                  dedicated to empowering independent providers, we guide you
                  from initial setup through seamless reimbursement—with expert
                  support at every step. Our streamlined processes, selective
                  partnerships, and unwavering commitment to excellence ensure
                  superior patient outcomes and practice success.
                </p>
              </motion.div>
              <motion.div
                className="md:w-1/2 mt-8 md:mt-0"
                variants={itemVariants}
              >
                <img
                  src="https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  alt="Wound Care Visualization"
                  className="rounded-xl shadow-2xl w-full h-auto border-4 border-indigo-500/50 dark:border-indigo-400/50"
                />
              </motion.div>
            </div>
          </motion.section>

          {/* Our Approach (The Three Cards) */}
          <motion.section
            className="bg-indigo-50 dark:bg-gray-800 rounded-2xl p-6 md:p-12 mb-20 transition-colors duration-500"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <div className="text-center">
              <motion.h2
                className="text-3xl font-bold text-gray-800 dark:text-white mb-12"
                variants={itemVariants}
              >
                Improving Patient Outcomes with Proven Wound Care Solutions
              </motion.h2>

              <div className="flex justify-center gap-6 flex-col lg:flex-row">
                {about_approach_data.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transform transition-all duration-300 w-full lg:w-1/3 border-t-4 border-indigo-500 dark:border-indigo-400"
                    variants={itemVariants}
                  >
                    <div className="text-indigo-600 dark:text-indigo-400 mb-4">
                      {/* Using a placeholder icon assuming font-awesome is linked. You should replace this with a modern icon library (e.g., Lucide, React Icons) */}
                      <i
                        className={`fas fa-${
                          index === 0
                            ? "lightbulb"
                            : index === 1
                            ? "shield-alt"
                            : "project-diagram"
                        } text-4xl`}
                      ></i>
                    </div>
                    <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
          <motion.section
            className="mb-20 p-6 md:p-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            <motion.h2
              className="text-3xl font-bold text-gray-800 dark:text-white mb-12 text-center"
              variants={itemVariants}
            >
              Meet Our Leadership
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {about_team.map((member, index) => (
                <motion.div
                  key={member.id}
                  className="perspective-1000 h-full" // h-full ensures all cards align in height, but the inner container is the one that sets the fixed height.
                  variants={itemVariants}
                >
                  {/* Main Flippable Container - 🎯 FIX: Changed h-96 to a custom h-[440px] and ensured image height is h-64 */}
                  <motion.div
                    className="relative w-full h-[440px]" // Use a custom height that comfortably contains the original content
                    // Framer Motion properties for 3D flip on hover
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: "preserve-3d" }} // Required for 3D effect
                  >
                    {/* Front of the Card (Visible by default) */}
                    <div
                      className="absolute inset-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-2xl overflow-hidden transition-colors duration-300"
                      style={{ backfaceVisibility: "hidden" }} // Hides the back of the front card during flip
                    >
                      <div className="overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          // RESTORED ORIGINAL IMAGE HEIGHT
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-1">
                          {member.name}
                        </h3>
                        <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">
                          {member.title}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {member.bio}
                        </p>
                      </div>
                    </div>

                    {/* Back of the Card (Flipped over - Contact Info) */}
                    <div
                      className="absolute inset-0 bg-indigo-600 rounded-xl shadow-lg dark:shadow-2xl overflow-hidden text-white flex flex-col justify-center items-center p-6"
                      style={{
                        backfaceVisibility: "hidden", // Hides the back of the back card
                        transform: "rotateY(180deg)", // Initially flipped to the back
                      }}
                    >
                      <h3 className="font-extrabold text-2xl mb-4">
                        Contact Info
                      </h3>

                      {/* Email Address */}
                      <div className="flex items-center space-x-3 mb-4 text-center">
                        <IoMailOutline size={24} className="flex-shrink-0" />
                        <a
                          href={`mailto:${member.email}`}
                          className="text-lg font-light hover:underline"
                        >
                          {member.email}
                        </a>
                      </div>

                      {/* Phone Number */}
                      <div className="flex items-center space-x-3 mb-4 text-center">
                        <IoCallOutline size={24} className="flex-shrink-0" />
                        <a
                          href={`tel:${member.phone.replace(/[^0-9+]/g, "")}`}
                          className="text-lg font-light hover:underline"
                        >
                          {member.phone}
                        </a>
                      </div>

                      <p className="mt-4 text-indigo-200 text-sm italic">
                        {member.name}'s direct line
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.section
            className="bg-indigo-600 text-white rounded-2xl p-10 md:p-16 text-center shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Advance Your Practice?
            </h2>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
              Partner with ProMed Health Plus for unparalleled wound care
              support and reimbursement success.
            </p>
            <motion.button
              onClick={() => setOpen(true)}
              className="bg-white text-indigo-700 font-bold px-10 py-4 rounded-full hover:bg-gray-100 transition duration-300 shadow-xl text-lg uppercase tracking-wide"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us Today
            </motion.button>
          </motion.section>
        </main>
      </div>

      {/* Modal with Tailwind Form */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-none p-8 mx-4 border border-gray-100 dark:border-gray-700 relative transition-colors duration-300">
            {/* Close button (The 'X') */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header */}
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">
              Get In Touch
            </h2>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
              We’d love to help you. Fill out the form below and we’ll respond
              soon.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Provider Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Dr. John Smith"
                  className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  />
                </div>

                <div className="flex gap-2">
                  <div className="w-2/3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      State
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="" className="bg-white dark:bg-gray-700">
                        Select
                      </option>
                      {states.map((state) => (
                        <option
                          key={state}
                          value={state}
                          className="bg-white dark:bg-gray-700"
                        >
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-1/3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Zip
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="(123) 456-7890"
                  className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Question
                </label>
                <textarea
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Type your message..."
                  className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                ></textarea>
              </div>
              
              {/* Submission Button - Now full width since the Cancel button is removed */}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default About;