import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi"; // Importing the down arrow icon

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6 w-full overflow-x-hidden">
      <motion.div
        className="cursor-pointer flex justify-between items-center py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium text-gray-800">{question}</h3>
        <motion.div
          className={`ml-2 text-gray-600 text-xl transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <FiChevronDown />
        </motion.div>
      </motion.div>
      {isOpen && (
        <motion.div
          className="mt-2 text-gray-700"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p>{answer}</p>
        </motion.div>
      )}
      <hr className="my-4 border-gray-300" />{" "}
      {/* Horizontal rule for separation */}
    </div>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "What is your return policy?",
      answer:
        "You can return any item within 30 days of purchase for a full refund.",
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we offer international shipping to many countries.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order has shipped, you will receive an email with tracking information.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit cards, PayPal, and other payment methods.",
    },
  ];

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
    <div
      ref={sectionRef}
      className="bg-white xl:p-20 sm:p-10 p-5 flex max-md:flex-col justify-between items-center"
    >
      <div className="flex justify-center items-center">
        <img src="/landingPage/faq.jpg" />
      </div>

      <main className="flex-grow flex flex-col items-center">
        <motion.h2
          className="lg:text-7xl text-5xl py-9 flex-grow text-left font-bold text-primary sm:mb-10 mb-5"
          initial={{ opacity: 0, y: -30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.3 }}
        >
          People Also Ask
        </motion.h2>

        <div className="w-full max-w-xl">
          {" "}
          {/* Set a max width for all items */}
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default FAQSection;
