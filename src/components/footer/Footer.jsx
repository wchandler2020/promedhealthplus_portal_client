import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white text-gray-800 flex-1 px-6 mt-55 lg:mt-10">
      <div className="flex items-center justify-center border-b-2 border-gray-200 p-6 lg:justify-between">
        <div className="mr-12 hidden lg:block">
          <span>
            {" "}
            <strong className="font-semibold uppercase text-sm">Connected on social media:</strong>
          </span>
        </div>
        {/* */}
        <div className="flex justify-center">
          <a
            className="mr-6 text-gray-800 hover:text-purple-500 hover:text-purple-500"
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 lg:h-4 lg:w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>
          <a className="mr-6 text-gray-800 hover:text-purple-500" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 lg:h-4 lg:w-4"
              viewBox="0 0 1200 1227"
              fill="currentColor"
            >
              <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
            </svg>
          </a>
          <a className="mr-6 text-gray-800 hover:text-purple-500" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 lg:h-4 lg:w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a className="mr-6 text-gray-800 hover:text-purple-500" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 lg:h-4 lg:w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
            </svg>
          </a>
        </div>
      </div>

      {/* */}
      <div className="mx-6 py-10 text-left">
        <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* */}
          <div className="">
            <h6 className="mb-4 flex items-center justify-center font-semibold md:justify-start text-lg">
              ProMed Health Plus
            </h6>
            <p className="text-xs">
              Here you can use rows and columns to organize your footer content.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
          <div className="grid-1 grid gap-8 grid-cols-2 ">
            {/* */}
            <div className="">
              <h6 className="mb-4 flex font-bold uppercase justify-start text-sm">
                Useful links
              </h6>
              <p className="mb-4 text-xs">
                <a className="text-gray-800">Pricing</a>
              </p>
              <p className="mb-4 text-xs">
                <a className="text-gray-800">Settings</a>
              </p>
              <p className="mb-4 text-xs">
                <a className="text-gray-800">Orders</a>
              </p>
              <p className="text-xs">
                <a className="text-gray-800">Help</a>
              </p>
            </div>
            {/* */}
            <div>
              <h6 className="mb-4 flex font-bold uppercase justify-start text-sm">
                Contact Us
              </h6>
              <p className="mb-4 flex items-center justify-start text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-3 h-4 w-4"
                >
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
                Philadelphia, PA 19107, US
              </p>
              <p className="mb-4 flex items-center justify-start text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-3 h-4 w-4"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
                info@example.com
              </p>
              <p className="mb-4 flex items-center justify-start text-xs">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-3 h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                    clipRule="evenodd"
                  />
                </svg>
                (215) 555 - 1212
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* */}
      <div className="bg-white p-6 text-center flex flex-row items-center justify-center">
        <p className="text-xs font-semibold text-gray-800 mr-1">© {year} Copyright </p>
        <Link
          className="text-gray-800 text-xs font-semibold"
          to="/"
        > 
          ProMed Health Plus
        </Link>
      </div>
    </footer>
  );
};

export default Footer;