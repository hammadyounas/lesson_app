import React, { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-white w-full sm:py-4 max-sm:p-2 relative z-50">
      {/* Navbar */}
      <nav className="flex flex-wrap justify-between items-center lg:w-[90%] w-full mx-auto">
        {/* Logo */}
        <div className="flex items-center w-full md:w-auto justify-between">
          <h1 className="sm:text-2xl text-black font-sans font-bold">
            Lesson Generator
          </h1>

          {/* Hamburger Icon */}
          <button
            className="md:hidden block text-gray-800 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`md:flex ${
            isMenuOpen ? "flex items-center  justify-center h-[80vh]" : "hidden"
          } md:items-center md:justify-center md:w-auto w-full flex-col md:flex-row md:space-x-6`}
        >
          <ul className="flex flex-col md:flex-row w-full lg:w-auto items-center lg:space-x-6 md:space-x-2 mt-4 lg:mt-0">
            <li>
              <a
                href="#"
                className="text-gray-800 sm:hover:text-primary font-semibold sm:hover:border-b-2 border-primary max-sm:hover:bg-primary max-sm:w-full max-sm:mb-2 max-sm:px-2 hover:text-white transition duration-500 "
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-800 sm:hover:text-primary font-semibold sm:hover:border-b-2 border-primary max-sm:hover:bg-primary max-sm:w-full max-sm:mb-2 max-sm:px-2 hover:text-white transition duration-500 "
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-800 sm:hover:text-primary font-semibold sm:hover:border-b-2 border-primary max-sm:hover:bg-primary max-sm:w-full max-sm:mb-2 max-sm:px-2 hover:text-white transition duration-500 "
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="./freePrompts"
                className="text-gray-800 sm:hover:text-primary font-semibold sm:hover:border-b-2 border-primary max-sm:hover:bg-primary max-sm:w-full max-sm:mb-2 max-sm:px-2 hover:text-white transition duration-500 "
              >
                Free Trial
              </a>
            </li>
            <li className="md:hidden">
              <a
                href="./login"
                className=" text-gray-800 sm:hover:text-primary font-semibold sm:hover:border-b-2 border-primary max-sm:hover:bg-primary max-sm:w-full max-sm:mb-2 max-sm:px-2 hover:text-white transition duration-500 "
              >
                Sign In
              </a>
            </li>
          </ul>
        </div>

        <div>
          <ul className="max-md:hidden">
          <li>
              <a
                href="./login"
                className="bg-primary py-2 px-4 text-white transition"
              >
                Sign In
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
