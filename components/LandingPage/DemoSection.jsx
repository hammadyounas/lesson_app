import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion'; // Import framer-motion for animations

export default function DemoSection() {
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
      {/* Demo Section */}
      <main className="flex-grow flex flex-col min-h-screen items-center justify-center text-center">
        <section className="flex flex-col w-full">
          <div className="flex flex-col items-center justify-between min-h-screen bg-gray-800 w-full mx-auto sm:p-6 p-4">
            {/* Top - Text content */}
            <motion.div
              className="flex flex-col lg:w-1/2 justify-center items-center text-center sm:mt-20 mt-10"
              initial={{ opacity: 0, x: -50 }} // Initial state for text animation
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }} // Animate on visibility
              transition={{ duration: 0.8, ease: "easeInOut" }} // Faster transition
            >
              <h1 className="sm:text-7xl text-5xl font-extrabold text-white">Demo</h1>
              <p className="mt-4 sm:text-lg text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </motion.div>

            {/* Bottom - Full Page Image */}
            <motion.div
              className="flex-grow max-h-screen w-5/6 flex justify-center m-10"
              initial={{ opacity: 0, scale: 0.9 }} // Initial state for image animation
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }} // Animate on visibility
              transition={{ duration: 0.5, ease: "easeInOut" }} // Faster transition
            >
              <img
                src="image_2.png" // Replace this with your image path
                alt="Lesson Generator Illustration"
                className="rounded-lg shadow-lg"
                style={{ margin: "0 20px" }} // Optional: add margins for extra spacing
              />
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
