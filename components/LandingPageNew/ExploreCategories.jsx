import Link from "next/link";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function ExploreCategories() {
  // Animation variants
  const slideFromLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1.0 } },
  };

  const slideFromRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1.0 } },
  };

  // Refs for tracking visibility
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true }); // Animates only the first time

  return (
    <div
      ref={sectionRef}
      className="group xl:p-20 sm:p-10 p-5 bg-primary text-white flex flex-col justify-center items-center mx-auto overflow-hidden min-2xl:h-auto max-2xl:min-h-screen transform transition-transform duration-300 shadow-xl xl:shadow-2xl rounded-lg"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={slideFromLeft}
        className="transition-transform duration-300 bg-secondary rounded-lg p-8"
      >
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 duration-300">
          {/* Heading and Text */}
          <motion.div
            variants={slideFromLeft}
            className="col-span-2"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h1 className="font-bold 2xl:text-4xl lg:text-3xl sm:text-2xl text-xl">
              Explore Our Categories
            </h1>
            <p className="sm:mt-8 mt-4">
              Discover a world of possibilities with our diverse categories.
              From technology and education to health, travel, food, and art,
              there’s something for everyone. Start exploring and find what
              inspires you!
            </p>
            <div className="sm:my-8 my-4">
              <Link
                href={"#"}
                className="px-6 sm:py-3 py-2 border-2 border-primary text-primary hover:bg-white hover:text-primary font-semibold bg-gray-100 hover:border-primary transition hover:shadow-lg hover:ring-2 hover:ring-offset-2 hover:ring-gray-100"
              >
                All Categories
              </Link>
            </div>
          </motion.div>

          {/* Image Components */}
          {[
            { src: "/landingPage/category_one.jpg", alt: "first category" },
            { src: "/landingPage/category_three.jpg", alt: "second category" },
            { src: "/landingPage/category_four.jpg", alt: "third category" },
            { src: "/landingPage/category_five.jpg", alt: "fourth category" },
            { src: "/landingPage/category_two.jpg", alt: "fifth category" },
            { src: "/landingPage/category_seven.png", alt: "sixth category" },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={index < 2 ? slideFromLeft : slideFromRight}
              className="col-span-1 w-full sm:p-2 flex justify-center"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="overflow-hidden transform duration-300 rounded-lg">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
