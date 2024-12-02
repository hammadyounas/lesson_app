import { CircleCheckBigIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";
import AnimatedHeading from "./AnimatedHeading";

export default function WeOffering() {
  return (
    <div className="xl:p-20 sm:p-10 p-5 bg-gray-200 text-gray-800 flex max-md:flex-col justify-between items-center mx-auto overflow-hidden min-2xl:h-auto max-2xl:min-h-screen">
      {/* Image Section with movement from left to right */}
      <motion.div
        initial={{ opacity: 0, x: -100 }} // Starts off-screen to the left
        whileInView={{ opacity: 1, x: 0 }} // Moves to its original position
        viewport={{ amount: 0.2 }} // Trigger animation when 20% is in view
        transition={{ duration: 1.5, ease: "easeInOut" }} // Standard transition speed
        className="md:w-1/2 flex justify-center items-center"
      >
        <img
          src="/landingPage/offering.png"
          alt="What we offering"
          className="object-cover"
        />
      </motion.div>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 1.5, ease: "easeInOut" }} // Standard transition speed
        className="md:w-1/2"
      >
        {/* Heading */}
        <AnimatedHeading />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 1.5, ease: "easeInOut" }} // Standard transition speed
          className="sm:mt-8 mt-4"
        >
          At Lesson Generator, we offer innovative solutions to make learning
          easier and more personalized. Our platform provides customizable
          lesson plans tailored to your needs, whether you're looking to enhance
          your skills, teach others, or explore new subjects.
        </motion.p>

        {/* Features List */}
        <ul className="grid lg:grid-cols-2 grid-cols-1 mt-5">
          {/* First two list items animate from right to left */}
          {[ 
            {
              title: "Customizable Lesson Plans:",
              description: "Tailor lessons to your specific needs and goals.",
            },
            {
              title: "User-Friendly Platform:",
              description:
                "Easy-to-use tools that save time and enhance productivity.",
            },
          ].map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: 50 }} // Right to left animation
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{
                duration: 1, // Standard transition speed
                ease: "easeInOut",
                delay: index * 0.2, // Slight delay for each list item
              }}
              className="mt-2"
            >
              <p className="font-semibold mr-2 flex">
                <CircleCheckBigIcon className="mr-2 w-4" />
                {item.title}
              </p>
              {item.description}
            </motion.li>
          ))}

          {/* Last two list items animate from bottom to top */}
          {[ 
            {
              title: "High-Quality Resources:",
              description:
                "Access a range of reliable and effective learning materials.",
            },
            {
              title: "Flexible Learning:",
              description: "Learn at your own pace, anytime, anywhere.",
            },
          ].map((item, index) => (
            <motion.li
              key={index + 2} // Ensure unique keys
              initial={{ opacity: 0, y: 50 }} // Bottom to top animation
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{
                duration: 1.5, // Standard transition speed
                ease: "easeInOut",
                delay: index * 0.2, // Slight delay for each list item
              }}
              className="mt-2"
            >
              <p className="font-semibold mr-2 flex">
                <CircleCheckBigIcon className="mr-2 w-4" />
                {item.title}
              </p>
              {item.description}
            </motion.li>
          ))}
        </ul>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 1.5, ease: "easeInOut" }} // Standard transition speed
          className="sm:my-8 my-4"
        >
          <Link
            href={"#"}
            className="px-6 sm:py-3 py-2 border-2 border-primary text-white hover:text-primary font-semibold bg-primary hover:bg-gray-100 hover:shadow-lg hover:ring-2 hover:ring-offset-2 hover:ring-primary"
          >
            Learn More
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
