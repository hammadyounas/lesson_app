import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiChevronDown } from 'react-icons/fi';

const TypewriterText = ({ text, speed }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      if (isDeleting) {
        setDisplayedText((prev) => prev.slice(0, -1)); // Delete character
      } else {
        setDisplayedText((prev) => text.slice(0, prev.length + 1)); // Add character
      }

      // Logic to switch between typing and deleting
      if (!isDeleting && displayedText === text) {
        setTimeout(() => setIsDeleting(true), 1500); // Wait before starting to delete
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false); // Restart typing
      }
    };

    const typingSpeed = isDeleting ? speed / 2 : speed;
    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer); // Cleanup
  }, [displayedText, isDeleting, text, speed]);

  return <span>{displayedText}</span>;
};

export default function LessonSection() {
  return (
    <div>
      <main className="flex-grow  flex flex-col min-h-screen items-center justify-center text-center w-full overflow-x-hidden">
        <section className="flex relative flex-col items-center justify-center w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:space-x-40 max-w-full mx-auto xl:p-32 lg:p-10 max-lg:pt-24 max-lg:px-5">
            {/* Left column - Text content */}
            <div className="flex flex-col justify-center items-start text-left">
              <h1 className="lg:text-7xl text-5xl font-extrabold text-blue-700">
                <span className="inline">{"L"}</span>
                <TypewriterText text="esson Generator!" speed={140} />
              </h1>
              <p className="sm:mt-16 mt-10 text-lg text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="sm:mt-8 mt-4">
                <button className="px-6 sm:py-3 py-2 border-2 border-blue-600 text-blue-700 font-semibold rounded-md hover:bg-blue-700 hover:text-white hover:border-blue-700 transition">
                  Get Started
                </button>
              </div>
            </div>

            {/* Right column - Image */}
            <motion.div
              className="flex justify-center items-center"
              animate={{
                y: [0, -15, 0], // Move up and down
              }}
              transition={{
                duration: 1, // Longer duration for a smoother effect
                ease: "easeInOut", // Smooth easing for natural feel
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <img
                src="teacher_bot.png" // Replace this with your image path
                alt="Lesson Generator Illustration"
                className="w-full h-auto max-w-full md:max-w-md"
                style={{ margin: "0 20px" }} // Optional: add margins for extra spacing
              />
            </motion.div>
          </div>

          <Link href={'#demo-section'} className="w-full text-center absolute flex flex-col justify-center items-center sm:top-[90%] top-[98%] mx-auto text-black sm:animate-pulse hover:animate-bounce max-sm:hidden">
          <p className="text-xl "><FiChevronDown/></p>
          <p className="text-sm font-semibold">Find Out More</p>
          </Link>
        </section>
      </main>
    </div>
  );
}
