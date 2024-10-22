import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactUs() {
  const form = useRef();

  // State to store form values
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  //   const [submittedDetails, setSubmittedDetails] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormDetails({
      ...formDetails,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, // Replace with your EmailJS service ID
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID // Replace with your EmailJS user ID
      )
      .then(
        (result) => {
          console.log("Email successfully sent!", result.text);
          e.target.reset(); // Reset form after submission
          toast.success("Message sent successfully!");
          setFormDetails({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        },
        (error) => {
          console.log("Failed to send email", error.text);
          toast.error("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div>
      <main className="flex-grow flex flex-col min-h-screen items-center justify-center text-center xl:p-20 sm:p-5">
        <div className="w-full xl:mb-20 lg:mb-10 max-lg:my-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left Column - Contact Details */}
            <div className="flex flex-col justify-start p-6 border-r-2 text-left">
              <h1 className="lg:text-7xl text-5xl font-bold text-gray-900 sm:mb-10 mb-5">
                Contact Us
              </h1>
              <p className="sm:text-lg text-gray-700 mb-2">
                Location: 123 Main St, Anytown, USA
              </p>
              <p className="sm:text-lg text-gray-700 mb-2">
                Email: support@example.com
              </p>
              <p className="sm:text-lg text-gray-700 mb-2">
                Phone: (123) 456-7890
              </p>
            </div>

            {/* Right Column - Contact Form */}
            <div className="flex flex-col sm:p-6">
              <form
                ref={form}
                onSubmit={sendEmail}
                className="text-black xl:px-14 px-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      className="mt-2 p-3 border-b-2 border-gray-300 bg-transparent rounded-md w-full focus:outline-none"
                      placeholder="Your Name"
                      required
                      value={formDetails.name}
                      onChange={handleChange} // Capture input change
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      className="mt-2 p-3 border-b-2 border-gray-300 bg-transparent rounded-md w-full focus:outline-none"
                      placeholder="Your Email"
                      required
                      value={formDetails.email}
                      onChange={handleChange} // Capture input change
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      className="mt-2 p-3 border-b-2 border-gray-300 bg-transparent rounded-md w-full focus:outline-none"
                      placeholder="Your Phone Number"
                      required
                      value={formDetails.phone}
                      onChange={handleChange} // Capture input change
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <textarea
                    name="message"
                    className="mt-2 p-3 border border-gray-300 w-full h-32 focus:outline-none"
                    placeholder="Your Message"
                    required
                    value={formDetails.message}
                    onChange={handleChange} // Capture input change
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="mt-6 w-1/2 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
