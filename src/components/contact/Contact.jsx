import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoLocationOutline, IoCallOutline, IoMailOutline, IoHelpCircleOutline } from "react-icons/io5";
// Make sure states is imported properly, e.g.:
import { states } from '../../utils/data/index';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 20,
    },
  },
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    question: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log("Form submitted:", formData);
      // TODO: send to your backend / API
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-500 min-h-screen pt-20 pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-16 px-2"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-4 leading-tight"
          >
            Promed Health <span className="text-blue-500">Plus</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            We’re here to answer your questions and help you advance your practice with our wound care solutions.
          </motion.p>
        </motion.header>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid gap-12 lg:grid-cols-3"
        >
          {/* Form */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 sm:p-10 shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 transition-colors duration-300"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Provider Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Provider Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name / Practice Name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                />
              </div>

              {/* City / State / Zip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Philadelphia"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    State
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 appearance-none"
                  >
                    <option value="">Select State</option>
                    {states.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Zip
                  </label>
                  <input
                    id="zip"
                    name="zip"
                    type="text"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 19103"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  />
                </div>
              </div>

              {/* Question */}
              <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Question
                </label>
                <textarea
                  id="question"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="How can we help your practice?"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl text-base sm:text-lg transition duration-300 shadow-lg mt-4 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                }`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-colors duration-300"
            >
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white border-b pb-3 border-blue-200 dark:border-blue-700 mb-6">
                Information
              </h3>

              <div className="flex items-start space-x-4 mb-4">
                <IoLocationOutline className="text-blue-600 dark:text-blue-400 text-2xl flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">Our Main Office</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    1100 Ludlow Street<br />
                    Philadelphia, PA 19107
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-4">
                <IoCallOutline className="text-blue-600 dark:text-blue-400 text-2xl flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">Call Us</p>
                  <a href="tel:+12675551212" className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                    (267) 555-1212
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <IoMailOutline className="text-blue-600 dark:text-blue-400 text-2xl flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">General Inquiry</p>
                  <a href="mailto:info@promedhealth.com" className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                    admin@promedhealthplus.com
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full h-80 rounded-2xl overflow-hidden shadow-xl">
              <iframe
                title="Office Location"
                className="w-full h-full border-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.412150937402!2d-75.1652215846152!3d39.95258397942202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c62d0f5e1f01%3A0xc6e4b9f2d1e2b6a!2sPhiladelphia%2C%20PA!5e0!3m2!1sen!2sus!4v1628173549219!5m2!1sen!2sus"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </motion.div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="mt-20 space-y-8 px-2"
        >
          <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white text-center">
            Frequently Asked Questions
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                question: "How can I contact support?",
                answer: "Use the contact form above for immediate response, or email us directly at support@promedhealth.com.",
              },
              {
                question: "What are your support hours?",
                answer: "Our team is available Monday–Friday, 9am to 6pm EST. Critical support is available 24/7.",
              },
              {
                question: "Which states do you service?",
                answer:
                  "We proudly service all providers in the states listed in the form dropdown, with plans to expand further soon.",
              },
              {
                question: "Do you offer training?",
                answer:
                  "Yes, comprehensive training is included for all new partners, covering clinical protocols and reimbursement processes.",
              },
            ].map((faq, idx) => (
              <motion.div key={idx} variants={itemVariants} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition duration-300">
                <h4 className="font-semibold text-gray-900 dark:text-white flex items-center mb-2">
                  <IoHelpCircleOutline className="text-blue-600 dark:text-blue-400 text-xl mr-2" />
                  {faq.question}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
          <motion.div variants={itemVariants} className="text-center pt-8">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              For immediate answers, visit our{" "}
              <a href="/help-center" className="text-blue-600 dark:text-blue-400 font-bold hover:underline transition">
                Help Center
              </a>.
            </p>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default Contact;
