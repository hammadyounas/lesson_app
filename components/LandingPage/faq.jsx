import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const FAQItem = ({ question, answer, delay, isInView }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-gray-300 pb-4 mb-4"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium text-black text-lg">{question}</h3>
        <motion.div
          className={`ml-2 text-black transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <FiChevronDown />
        </motion.div>
      </div>
      {isOpen && (
        <motion.div
          className="mt-2 text-gray-700 text-sm"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {answer}
        </motion.div>
      )}
    </motion.div>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "How this work?",
      answer:
        "Yet bed any for assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment.",
    },
    {
      question: "Are there any additional fees?",
      answer:
        "No, there are no hidden charges. The pricing is completely transparent and inclusive.",
    },
    {
      question: "How can I get the app?",
      answer:
        "You can download the app from the App Store or Google Play Store. Simply search for our app and follow the installation steps.",
    },
    {
      question: "What features do you offer and other not?",
      answer:
        "Our app offers exclusive features such as seamless integration, user-friendly design, and 24/7 support, which sets us apart from others.",
    },
  ];

  // Ref for the entire FAQ section
  const sectionRef = useRef(null);

  // Determine if the section is in view
  const isInView = useInView(sectionRef, { margin: "0px 0px -100px 0px", once: false });

  return (
    <div
      ref={sectionRef} // Attach the ref to the section
      className="bg-gray-200 text-black px-10 py-16 flex flex-col lg:flex-row"
    >
      {/* Left Section */}
      <motion.div
        className="lg:w-1/2 mb-10 lg:mb-0"
        initial={{ opacity: 0, x: -100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <h2 className="text-4xl font-bold mb-6">Any questions? We got you.</h2>
        <p className="text-gray-500 text-lg mb-8">
          Yet bed any for assistance indulgence unpleasing. Not thoughts all
          exercise blessing. Indulgence way everything joy alteration
          boisterous the attachment.
        </p>
        <a
          href="#"
          className="text-primary font-medium hover:underline transition"
        >
          More FAQs →
        </a>
      </motion.div>

      {/* Right Section */}
      <motion.div
        className="lg:w-1/2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeInOut", delayChildren: 0.2 }}
      >
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            delay={0.2 * (index + 1)} // Adding delay for staggered animation
            isInView={isInView}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default FAQSection;
