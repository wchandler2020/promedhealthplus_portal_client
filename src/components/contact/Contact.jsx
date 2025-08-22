import React, { useState } from "react";

const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
  'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY',
  'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV',
  'WI', 'WY'
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    question: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add form submission logic
  };

  return (
    <div className="container mx-auto px-6 py-20 space-y-20 max-w-7xl">
      <h2 className="text-[48px] font-bold text-center text-gray-800">Contact Us</h2>

      {/* Form + Map Section */}
      <div className="grid md:grid-cols-2 gap-12 bg-white p-10 shadow-lg rounded-xl">
        {/* Contact Form */}
        <div className="space-y-6">
          <p className="text-gray-600">
            We'd love to hear from you. Please fill out the form and we'll be in touch soon.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Provider Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-4">
                <div className="w-2/3">
                  <label className="block text-sm font-medium text-gray-700">State</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
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
                  <label className="block text-sm font-medium text-gray-700">Zip</label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Your Question</label>
              <textarea
                name="question"
                value={formData.question}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-emerald-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Map + Address */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Our Location</h3>
          <p className="text-gray-600 text-sm">
            123 Main Street, Suite 100
            <br />
            Philadelphia, PA 19103
            <br />
            (267)555 - 1212
          </p>
          <div className="w-full h-96 rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Philadelphia Office Location"
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3068.932372363136!2d-75.16522168461986!3d39.95258397942366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c88c98e5cfb1%3A0x63a04a1bbf3d78d6!2sPhiladelphia%20City%20Hall!5e0!3m2!1sen!2sus!4v1689988123456"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6 bg-white p-10 shadow-xl rounded-xl">
        <h2 className="text-xl font-semibold text-gray-800">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <h4 className="font-semibold">How can I contact support?</h4>
            <p className="text-gray-600 text-sm">
              Use the contact form above or email us at support@example.com.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <h4 className="font-semibold">What are your support hours?</h4>
            <p className="text-gray-600 text-sm">
              We’re available Monday–Friday, 9am to 6pm EST.
            </p>
          </div>
        </div>
      </div>

      {/* Help Center */}
      <div className="bg-blue-50 p-6 rounded-md shadow-sm">
        <h2 className="text-lg font-semibold text-blue-800">Need More Help?</h2>
        <p className="text-blue-700 text-sm">
          Visit our{" "}
          <a href="/help-center" className="underline font-medium">
            Help Center
          </a>{" "}
          for tutorials, documentation, and more answers.
        </p>
      </div>

      {/* CTA */}
      <div className="text-center">
        <button className="bg-green-600 text-white px-6 py-3 rounded-md text-base hover:bg-green-700 transition">
          Get Support Now
        </button>
      </div>
    </div>
  );
};

export default Contact;
