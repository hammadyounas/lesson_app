import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion'; // Import framer-motion for animations
import PricingCard from '../PricingCard';

export default function PricingSection() {
  const pricingPlans = [
    {
      title: "Free Tier",
      price: "$0",
      features: [
        "Basic access to all features",
        "Limited support",
        "Community access",
        "Monthly updates",
      ],
      buttonText: "Sign Up Free",
    },
    {
      title: "Premium Plan",
      price: "$12",
      features: [
        "All Free Tier features",
        "Priority support",
        "Access to premium features",
        "Weekly updates",
      ],
      buttonText: "Get Started",
    },
    {
      title: "Free Books",
      price: "$15",
      features: [
        "All Free Books",
        "Priority support",
        "Access to premium features",
        "Monthly updates",
      ],
      buttonText: "Contact Us",
    },
  ];

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
    <div ref={sectionRef} className=' w-full overflow-x-hidden'>
      <main className="flex-grow flex flex-col min-h-screen items-center bg-gray-900 justify-center text-center sm:p-20 max-sm:py-10">
        <motion.div
          className="xl:w-1/2 lg:w-3/2 sm:mb-20 mb-10"
          initial={{ opacity: 0, y: -30 }} // Initial state for the header
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }} // Animate on visibility
          transition={{ duration: 0.5, ease: "easeInOut" }} // Even faster transition
        >
          <h1 className="sm:text-5xl text-3xl font-extrabold text-white mb-5">
            Find Your Perfect Plan
          </h1>
          <p className="sm:text-lg text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 sm:gap-10 gap-4 text-white xl:w-[80%] w-full max-sm:px-4"
          initial={{ opacity: 0, y: 30 }} // Initial state for pricing cards
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} // Animate on visibility
          transition={{ duration: 0.5, ease: "easeInOut", staggerChildren: 0.05 }} // Faster staggered animation for cards
        >
          {/* Pricing cards section */}
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }} // Initial state for each card
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} // Animate each card on visibility
              transition={{ duration: 0.2 }} // Faster transition for individual cards
            >
              <PricingCard
                title={plan.title}
                price={plan.price}
                features={plan.features}
                buttonText={plan.buttonText}
              />
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
