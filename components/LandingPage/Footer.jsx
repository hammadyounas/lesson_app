import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Subscription */}
          <div>
            <h2 className="text-xl font-bold mb-4">Be Future-Ready</h2>
            <p className="text-gray-400 text-sm mb-4">
              Get exclusive <span className="text-white">Lesson Generating</span> updates
              straight to your inbox.
            </p>
            <div className="flex items-center">
              <input
                type="email"
                placeholder="Email address"
                className="p-2 rounded-l-md text-gray-800 focus:outline-none"
              />
              <button className="bg-primary hover:bg-green-500 p-2 rounded-r-md">
                <span className="text-white font-bold">&rarr;</span>
              </button>
            </div>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>Home</li>
              <li>About</li>
              <li>Contact US</li>
              <li>Free Trial</li>
            </ul>
          </div>

          {/* Corporate Training Links */}
          <div>
            <h3 className="font-semibold mb-4">Corporate Training</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>Leaders</li>
              <li>Practitioners</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>
                📞 (123) 456-7890
              </li>
              <li>
                ✉️ support@example.com
              </li>
              <li>
                📍 123 Main St, Anytown, USA
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary pt-6 flex flex-col lg:flex-row justify-between items-center">
          {/* Social Links */}
          <div className="flex space-x-4 mb-4 lg:mb-0">
            <a
              href="#"
              className="bg-gray-800 p-2 rounded-full text-white hover:text-white hover:bg-primary"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="bg-gray-800 p-2 rounded-full text-white hover:text-white hover:bg-primary"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-gray-800 p-2 rounded-full text-white hover:text-white hover:bg-primary"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-gray-800 p-2 rounded-full text-white hover:text-white hover:bg-primary"
            >
              <FaInstagram />
            </a>
          </div>

          {/* Footer Text */}
          <p className="text-gray-400 text-sm text-center lg:text-left">
            © 2024 Lesson Generator. All Rights Reserved.
          </p>

          {/* Terms Links */}
          <div className="flex space-x-4 text-sm text-gray-300">
            <a href="#" className="hover:text-primary">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
