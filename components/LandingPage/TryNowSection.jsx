import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion'; // Import framer-motion for animations

export default function TryNowSection() {
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
      <main className="flex-grow flex flex-col min-h-screen items-center justify-center text-center">
        <section className="flex flex-col items-center justify-center w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:space-x-40 max-w-full mx-auto xl:p-32 lg:p-10 p-5">
            {/* Left column - Text content */}
            <motion.div
              className="flex flex-col justify-center items-start text-left"
              initial={{ opacity: 0, x: -50 }} // Initial state for text animation
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }} // Animate on visibility
              transition={{ duration: 0.3, ease: "easeInOut" }} // Faster transition
            >
              <h1 className="lg:text-7xl text-5xl font-extrabold text-gray-900">
                TRY NOW!
              </h1>
              <p className='my-5 lg:text-lg text-gray-600'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam animi earum repudiandae quis, quod, obcaecati deleniti dolore sit nostrum reiciendis, cumque consectetur. Alias.
              </p>
              <div className="mt-2 max-sm:flex max-sm:justify-center max-sm:w-full">
                <motion.a
                  className="px-6 sm:py-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition transform hover:scale-105"
                  href="/freePrompts"
                  initial={{ scale: 1 }} // Initial scale
                  animate={isVisible ? { scale: 1.05 } : { scale: 1 }} // Scale on visibility
                  transition={{ duration: 0.2 }} // Keep the same duration for hover effect
                >
                  Get Started
                </motion.a>
              </div>
            </motion.div>

            {/* Right column - Image */}
            <motion.div
              className="flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.9 }} // Initial state for image animation
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }} // Animate on visibility
              transition={{ duration: 0.3, ease: "easeInOut" }} // Faster transition
            >
              <img
                src="image_3.png" // Replace this with your image path
                alt="Lesson Generator Illustration"
                className="w-full h-auto max-w-sm md:max-w-lg rounded-lg shadow-lg transition-transform transform hover:scale-105"
                style={{ margin: "0 20px" }} // Optional: add margins for extra spacing
              />
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
