import React, { useState } from "react";
import { Modal, Box } from "@mui/material";

const teamMembers = [
    {
      name: 'whatever',
      postion: 'whatever position',
    },
    {
      name: 'whatever',
      postion: 'whatever position',
    },
    {
      name: 'whatever',
      postion: 'whatever position',
    },
    {
      name: 'whatever',
      postion: 'whatever position',
    },
]



const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const About = () => {
  const [open, setOpen] = useState(false);
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

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: 600,
    bgcolor: "transparent",
    boxShadow: "none",
    outline: "none",
  };
  return (
    <>
      <div>
        {/* Hero Section */}
        <header className="bg-white text-gray-800 ">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold">
              About Promed Health Plus
            </h1>
            <p className="text-lg md:text-base max-w-3xl mx-auto opacity-90">
              Where human creativity meets artificial intelligence to solve
              tomorrow's challenges
            </p>
          </div>
        </header>

        {/* Main Section */}
        <main className="container mx-auto px-6 py-16">
          {/* Our Story */}
          <section className="mb-20 mt-20 p-12">
            <div className="flex flex-col md:flex-row items-start gap-12">
              <div className="md:w-1/2">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">
                  Our Story
                </h2>
                <p className="text-gray-700 mb-4 pr-10 md:text-justify justify-center text-base">
                  Promed Health Plus was founded in 2019 with a radical idea:
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Facilis iusto esse modi sed unde. Voluptates?.
                </p>
                <p className="text-gray-700 mb-4 pr-10 md:text-justify justify-center text-base">
                  Today, we're recognized as pioneers in cognitive computing,
                  with our technology powering some of the world's most
                  innovative companies across healthcare, finance, and creative
                  industries.
                </p>
                <p className="text-gray-700 pr-10 md:text-justify justify-center text-base">
                  Our name reflects our philosophy - we synthesize human-like
                  understanding with machine precision to create truly
                  intelligent systems.
                </p>
              </div>
              <div className="md:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  alt="AI Neural Network Visualization"
                  className="rounded-lg shadow-xl w-full h-auto"
                />
              </div>
            </div>
          </section>

          {/* Our Mission */}
          <section className="bg-primary-50 rounded-xl p-12 mb-20">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-dark mb-2">Our Mission</h2>
              <p className="text-base text-gray-700 mb-12 max-w-4xl mx-auto">
                "To create symbiotic intelligence systems that amplify human
                potential while maintaining ethical boundaries and
                transparency."
              </p>
              <div className="flex justify-center gap-6 flex-col md:flex-row">
                <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
                  <div className="text-primary-600 mb-4">
                    <i className="fas fa-lightbulb text-3xl"></i>
                  </div>
                  <h3 className="font-bold text-dark mb-2">
                   
 Augmented Intelligence
                  </h3>
                  <p className="text-gray-600">
                    We build tools that enhance human cognition, not replace it.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
                  <div className="text-primary-600 mb-4">
                    <i className="fas fa-shield-alt text-3xl"></i>
                  </div>
                  <h3 className="font-bold text-dark mb-2">
                    Ethical Framework
                  </h3>
                  <p className="text-gray-600">
                    Every system undergoes rigorous ethical review before
                    deployment.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
                  <div className="text-primary-600 mb-4">
                    <i className="fas fa-project-diagram text-3xl"></i>
                  </div>
                  <h3 className="font-bold text-dark mb-2">Neural Synthesis</h3>
                  <p className="text-gray-600">
                    Our proprietary architecture mimics human neural pathways.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Team */}
          <section className="mb-20  p-12">
            <h2 className="text-3xl font-bold text-dark mb-12 text-center">
              Meet The Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1590086783191-a0694c7d1e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                  alt="CEO"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl text-dark mb-1">
                    Dr. Elena Vasquez
                  </h3>
                  <p className="text-primary-600 font-medium mb-3">
                    CEO & Co-Founder
                  </p>
                  <p className="text-gray-600">
                    Cognitive computing pioneer with a PhD in Computational
                    Neuroscience from Stanford.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl text-dark mb-1">
                    Raj Patel
                  </h3>
                  <p className="text-primary-600 font-medium mb-3">
                    Chief Technology Officer
                  </p>
                  <p className="text-gray-600">
                    Former lead architect at DeepMind, specializes in
                    neural-symbolic integration.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                  alt="Chief Ethics Officer"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl text-dark mb-1">
                    Dr. Kwame Nkosi
                  </h3>
                  <p className="text-primary-600 font-medium mb-3">
                    Chief Ethics Officer
                  </p>
                  <p className="text-gray-600">
                    Author of "The Moral Algorithm" and AI policy advisor to the
                    EU Parliament.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-white text-gray-800 rounded-xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Experience the SynthMind Difference
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join forward-thinking organizations leveraging our cognitive AI
              platform.
            </p>
            <button
              onClick={() => setOpen(true)}
              className="bg-white text-emerald-500 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition duration-300 shadow-lg"
            >
              Contact Us Today
            </button>
          </section>
        </main>
      </div>
      {/* Modal with Tailwind Form */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 mx-4 border border-gray-100 relative">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
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
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
              Get In Touch
            </h2>
            <p className="text-center text-gray-500 mb-6">
              We’d love to help you. Fill out the form below and we’ll respond
              soon.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Provider Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Dr. John Smith"
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="flex gap-2">
                  <div className="w-2/3">
                    <label className="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      <option value="">Select</option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-1/3">
                    <label className="block text-sm font-medium text-gray-700">
                      Zip
                    </label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="(123) 456-7890"
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Your Question
                </label>
                <textarea
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Type your message..."
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm resize-none focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default About;
