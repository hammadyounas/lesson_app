import React, { useState, useRef, useEffect } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion"; // Import framer-motion for animations

export default function ContactUs() {
  const form = useRef();

  // State to store form values
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

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
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
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

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Set to true when the section is visible
        } else {
          setIsVisible(false); // Reset when it goes out of view
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the component is in view
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef}>
      <main className="flex-grow flex flex-col bg-primary  min-2xl:h-auto max-2xl:min-h-screen items-center justify-center text-center xl:p-20 sm:p-5">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: -30 }} // Initial state for animation
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }} // Animate on visibility
          transition={{ duration: 0.3, ease: "easeInOut" }} // Faster transition
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left Column - Contact Details */}
            <motion.div
              className="flex flex-col justify-start p-6 border-r-2 text-left"
              initial={{ opacity: 0, x: -50 }} // Slide in from left
              animate={
                isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
              } // Animate on visibility
              transition={{ duration: 0.3 }} // Faster transition
            >
              <h1 className="lg:text-7xl text-5xl font-bold text-white sm:mb-10 mb-5">
                Contact Us
              </h1>
              <p className="sm:text-lg text-white mb-2">
                Location: 123 Main St, Anytown, USA
              </p>
              <p className="sm:text-lg text-white mb-2">
                Email: support@example.com
              </p>
              <p className="sm:text-lg text-white mb-2">
                Phone: (123) 456-7890
              </p>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              className="flex flex-col sm:p-6"
              initial={{ opacity: 0, x: 50 }} // Slide in from right
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }} // Animate on visibility
              transition={{ duration: 0.3 }} // Faster transition
            >
              <motion.form
                ref={form}
                onSubmit={sendEmail}
                className="text-black xl:px-14 px-4"
                initial={{ opacity: 0, y: 20 }} // Initial state for form animation
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                } // Animate on visibility
                transition={{ duration: 0.3 }} // Faster transition
              >
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      className="mt-2 p-3 border-b-2 border-gray-300 placeholder:text-white text-white bg-transparent rounded-md w-full focus:outline-none"
                      placeholder="Your Name"
                      required
                      value={formDetails.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      className="mt-2 p-3 border-b-2 border-gray-300 bg-transparent placeholder:text-white text-white rounded-md w-full focus:outline-none"
                      placeholder="Your Email"
                      required
                      value={formDetails.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      className="mt-2 p-3 border-b-2 border-gray-300 bg-transparent placeholder:text-white text-white rounded-md w-full focus:outline-none"
                      placeholder="Your Phone Number"
                      required
                      value={formDetails.phone}
                      onChange={handleChange}
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
                    onChange={handleChange}
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  className="mt-6 max-sm:mb-6 w-1/2 py-3 bg-black text-white rounded-md hover:bg-white hover:text-primary transition"
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }} // Scale effect on hover
                >
                  Send Message
                </motion.button>
              </motion.form>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
