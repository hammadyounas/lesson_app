import React, { useState, useRef, useEffect } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function ContactUs() {
  const form = useRef();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

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
          toast.success("Message sent successfully!");
          e.target.reset();
          setFormDetails({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        },
        (error) => {
          toast.error("Failed to send message. Please try again.");
        }
      );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
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
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className="bg-white text-gray-800"
    >
      {/* Contact Us Heading */}
      <motion.div
        className="text-center py-10"
        initial={{ x: "100vw" }}
        animate={isVisible ? { x: 0 } : { x: "100vw" }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
        <motion.p
          className="text-lg text-gray-600"
          initial={{ x: "-100vw" }}
          animate={isVisible ? { x: 0 } : { x: "-100vw" }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </motion.p>
      </motion.div>

      <div className="container mx-auto px-5 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column */}
          <motion.div
            className="space-y-5"
            initial={{ x: "-100vw" }}
            animate={isVisible ? { x: 0 } : { x: "-100vw" }}
            transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold">Get In Touch</h2>
            <p>Sed sit amet accumsan arcu, sit amet auctor nunc.</p>
            <div className="space-y-2">
              <p>
                <strong>Address:</strong> 123 Main St, Anytown, USA
              </p>
              <p>
                <strong>Phone Number:</strong> (123) 456-7890
              </p>
              <p>
                <strong>Email:</strong> support@example.com
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4 text-2xl">
              <a href="#" className="text-primary hover:text-green-500">
                <FaFacebookF />
              </a>
              <a href="#" className="text-primary hover:text-green-500">
                <FaTwitter />
              </a>
              <a href="#" className="text-primary hover:text-green-500">
                <FaInstagram />
              </a>
              <a href="#" className="text-primary hover:text-green-500">
                <FaYoutube />
              </a>
            </div>
          </motion.div>

          {/* Right Column (Form) */}
          <motion.div
            className="bg-gray-100 p-6 rounded-lg shadow-lg"
            initial={{ x: "100vw" }}
            animate={isVisible ? { x: 0 } : { x: "100vw" }}
            transition={{ type: "spring", stiffness: 100, delay: 1.2 }}
          >
            <form ref={form} onSubmit={sendEmail}>
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  value={formDetails.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail address"
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  value={formDetails.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  value={formDetails.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <textarea
                  name="message"
                  placeholder="Message"
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  value={formDetails.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-primary text-white rounded-lg transition duration-300 ease-in-out transform hover:shadow-lg hover:ring-2 hover:ring-offset-2 hover:ring-primary"
              >
                Submit
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <div className="mt-10 mb-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.2094823248096!2d-122.40135028468263!3d37.79397297975721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064d2edb3ef%3A0xeda6a72f1b6215af!2s123%20Main%20St%2C%20San%20Francisco%2C%20CA%2094105%2C%20USA!5e0!3m2!1sen!2s!4v1634458545905!5m2!1sen!2s"
          className="w-full h-64 border-0"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </motion.div>
  );
}


// import React, { useState, useRef, useEffect } from "react";
// import emailjs from "emailjs-com";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion } from "framer-motion"; // Import framer-motion for animations

// export default function ContactUs() {
//   const form = useRef();

//   // State to store form values
//   const [formDetails, setFormDetails] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   // Handle input change
//   const handleChange = (e) => {
//     setFormDetails({
//       ...formDetails,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const sendEmail = (e) => {
//     e.preventDefault();

//     emailjs
//       .sendForm(
//         process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
//         process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
//         form.current,
//         process.env.NEXT_PUBLIC_EMAILJS_USER_ID
//       )
//       .then(
//         (result) => {
//           console.log("Email successfully sent!", result.text);
//           e.target.reset(); // Reset form after submission
//           toast.success("Message sent successfully!");
//           setFormDetails({
//             name: "",
//             email: "",
//             phone: "",
//             message: "",
//           });
//         },
//         (error) => {
//           console.log("Failed to send email", error.text);
//           toast.error("Failed to send message. Please try again.");
//         }
//       );
//   };

//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true); // Set to true when the section is visible
//         } else {
//           setIsVisible(false); // Reset when it goes out of view
//         }
//       },
//       { threshold: 0.5 } // Trigger when 50% of the component is in view
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, []);

//   return (
//     <div ref={sectionRef}>
//       <main className="flex-grow flex flex-col bg-white text-black min-2xl:h-auto max-2xl:min-h-screen items-center justify-center text-center xl:p-20 sm:p-5">
//         <motion.div
//           className="w-full"
//           initial={{ opacity: 0, y: -30 }} // Initial state for animation
//           animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }} // Animate on visibility
//           transition={{ duration: 0.3, ease: "easeInOut" }} // Faster transition
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             {/* Left Column - Contact Details */}
//             <motion.div
//               className="flex flex-col justify-start p-6 border-r-2 text-left"
//               initial={{ opacity: 0, x: -50 }} // Slide in from left
//               animate={
//                 isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
//               } // Animate on visibility
//               transition={{ duration: 0.3 }} // Faster transition
//             >
//               <h1 className="lg:text-7xl text-5xl font-bold  sm:mb-10 mb-5">
//                 Contact Us
//               </h1>
//               <p className="sm:text-lg  mb-2">
//                 Location: 123 Main St, Anytown, USA
//               </p>
//               <p className="sm:text-lg  mb-2">
//                 Email: support@example.com
//               </p>
//               <p className="sm:text-lg  mb-2">
//                 Phone: (123) 456-7890
//               </p>
//             </motion.div>

//             {/* Right Column - Contact Form */}
//             <motion.div
//               className="flex flex-col sm:p-6"
//               initial={{ opacity: 0, x: 50 }} // Slide in from right
//               animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }} // Animate on visibility
//               transition={{ duration: 0.3 }} // Faster transition
//             >
//               <motion.form
//                 ref={form}
//                 onSubmit={sendEmail}
//                 className="text-black xl:px-14 px-4"
//                 initial={{ opacity: 0, y: 20 }} // Initial state for form animation
//                 animate={
//                   isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
//                 } // Animate on visibility
//                 transition={{ duration: 0.3 }} // Faster transition
//               >
//                 <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
//                   <div>
//                     <input
//                       type="text"
//                       name="name"
//                       className="mt-2 p-3 border-b-2 border-black placeholder:text-black text-black bg-transparent rounded-md w-full focus:outline-none"
//                       placeholder="Your Name"
//                       required
//                       value={formDetails.name}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div>
//                     <input
//                       type="email"
//                       name="email"
//                       className="mt-2 p-3 border-b-2 border-black bg-transparent placeholder:text-black text-black rounded-md w-full focus:outline-none"
//                       placeholder="Your Email"
//                       required
//                       value={formDetails.email}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div>
//                     <input
//                       type="tel"
//                       name="phone"
//                       className="mt-2 p-3 border-b-2 border-black bg-transparent placeholder:text-black text-black rounded-md w-full focus:outline-none"
//                       placeholder="Your Phone Number"
//                       required
//                       value={formDetails.phone}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="mt-6">
//                   <textarea
//                     name="message"
//                     className="mt-2 p-3 border border-black w-full h-32 focus:outline-none"
//                     placeholder="Your Message"
//                     required
//                     value={formDetails.message}
//                     onChange={handleChange}
//                   ></textarea>
//                 </div>
//                 <motion.button
//                   type="submit"
//                   className="mt-6 max-sm:mb-6 w-1/2 py-3 bg-primary text-white rounded-md hover:bg-black hover:text-white transition"
//                   whileHover={{ scale: 1.05, transition: { duration: 0.3 } }} // Scale effect on hover
//                 >
//                   Send Message
//                 </motion.button>
//               </motion.form>
//             </motion.div>
//           </div>
//         </motion.div>
//       </main>
//     </div>
//   );
// }
