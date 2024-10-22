import React from 'react'

export default function Navbar() {
  return (
    <div>
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center sm:p-6 max-sm:px-2 max-sm:py-4 bg-gray-100 shadow-md fixed top-0 left-0 z-50">
        <h1 className="sm:text-2xl text-black font-bold">Brand</h1>
        <ul className="flex sm:space-x-9 space-x-2  max-sm:text-sm">
          <li>
            <a href="#" className="text-gray-600 hover:text-blue-900 hover:font-semibold">
              Contact Us
            </a>
          </li>
          <li>
            <a
              href="./freePrompts"
              className="text-white rounded-md bg-blue-700 sm:py-3 py-1 sm:px-6 px-2 hover:text-gray-900 hover:bg-gray-300 transition"
            >
              Free Trial
            </a>
          </li>
          <li>
            <a
              href="./login"
              className="text-black rounded-md bg-gray-300 sm:py-3 py-1 sm:px-6 px-2 hover:text-white hover:bg-blue-700 transition"
            >
              Sign In
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
