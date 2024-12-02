import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LessonSection() {
  // Animation variants
  const textVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const buttonVariant = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    transition: { delay: 0.2 },
  };

  const imageVariant = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    transition: { delay: 0.4 },
  };

  return (
    <div className="flex max-sm:flex-col justify-around items-center w-[90%] mx-auto overflow-hidden max-2xl:min-h-screen">
      {/* Left side */}
      <motion.div
        className="flex flex-col text-left lg:w-[60%] md:w-[60%]"
        initial="hidden"
        whileInView="visible"  // Trigger animation when element comes into view
        variants={textVariant}
        viewport={{ once: false, amount: 0.2 }}  // Once false so it triggers on scroll, 0.2 for early trigger
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl sm:text-4xl 2xl:text-6xl font-bold leading-snug max-sm:mt-10 text-gray-900">
          Simplify Learning with <br />
          <span className="text-primary">Lesson Generator</span>
        </h1>
        <p className="sm:my-10 my-5 xl:text-xl sm:text-lg text-gray-600">
          Create customized, engaging lessons effortlessly. Whether you're a
          student, a professional, or just exploring a new topic, our app makes
          learning simple and fun.
        </p>
        {/* Buttons */}
        <motion.div
          className="sm:mt-8 mt-4 flex space-x-4"
          initial="hidden"
          whileInView="visible"
          variants={buttonVariant}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Link
            href={"/freePrompts"}
            className="px-6 sm:py-3 py-2 border-2 bg-gray-100 border-primary text-primary font-semibold hover:bg-primary hover:text-white  hover:shadow-lg hover:ring-2 hover:ring-offset-2 hover:ring-primary"
          >
            Get Started
          </Link>
          <Link
            href={"#"}
            className="px-6 sm:py-3 py-2 border-2 border-primary text-white hover:text-primary font-semibold bg-primary hover:bg-gray-100 text-whitehover:shadow-lg hover:ring-2 hover:ring-offset-2 hover:ring-primary"
          >
            Learn More
          </Link>
        </motion.div>
      </motion.div>

      {/* Right side */}
      <motion.div
        className=""
        initial="hidden"
        whileInView="visible"
        variants={imageVariant}
        viewport={{ once: false, amount: 0.2 }}  // Trigger on scroll
        transition={{ duration: 1 }}
      >
        <img
          src="/landingPage/section_one.png" // Replace this with your image path
          alt="Lesson Generator Illustration"
          className="w-full h-auto max-w-full md:max-w-md"
          style={{ margin: "0 20px" }} // Optional: add margins for extra spacing
        />
      </motion.div>
    </div>
  );
}
