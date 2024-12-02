import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import PricingCard from "../PricingCard";

export default function PricingSection() {
  const pricingPlans = [
    {
      title: "Pro Monthly",
      price: "6.99",
      features: [
        "Access to all tools",
        "Free access to CPD webinar",
        "Beautiful content downloads",
        "Time-saved tracking",
        "Access to future features",
        "Curriculum specific",
        "Slideshow generator",
        "Responsive support team",
        "Rolling AI Improvements",
      ],
      buttonText: "Continue",
    },
    {
      title: "Pro Annual",
      price: "6",
      features: [
        "Access to all tools",
        "Free access to CPD webinar",
        "Beautiful content downloads",
        "Time-saved tracking",
        "Access to future features",
        "Curriculum specific",
        "Slideshow generator",
        "Responsive support team",
        "Rolling AI Improvements",
      ],
      buttonText: "Continue",
    },
    {
      title: "Whole School Subscription",
      price: "",
      features: [
        "Reduced pricing for schools",
        "Schools manage own licenses",
        "Access to all tools",
        "Free access to CPD webinar",
        "Beautiful content downloads",
        "Time-saved tracking",
        "Access to future features",
        "Curriculum specific",
        "Slideshow generator",
        "Responsive support team",
        "Rolling AI Improvements",
      ],
      buttonText: "Find out more",
      isSchoolPlan: true,
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 } // Lower threshold for better visibility on smaller screens
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
    <div ref={sectionRef} className="w-full overflow-x-hidden">
      <main className="flex-grow flex flex-col min-h-screen items-center bg-white text-primary justify-center text-center sm:p-20 px-4 py-10">
        {/* Heading animation */}
        <motion.div
          className="xl:w-1/2 lg:w-3/2 sm:mb-20 mb-10"
          initial={{ opacity: 0, x: "100%" }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <h1 className="sm:text-5xl text-3xl font-extrabold mb-5">
            Find Your Perfect Plan
          </h1>
        </motion.div>

        {/* Paragraph animation */}
        <motion.div
          className="xl:w-1/2 lg:w-3/2 sm:mb-20 mb-10"
          initial={{ opacity: 0, x: "-100%" }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: "-100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <p className="sm:text-lg text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </motion.div>

        {/* Cards animation */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:w-[80%] w-full"
          initial={{ opacity: 0, x: "100%" }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
          transition={{ duration: 1.5 }}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className="flex h-full"
              initial={{ opacity: 0, x: "100%" }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
            >
              <PricingCard
                title={plan.title}
                price={plan.price}
                features={plan.features}
                buttonText={plan.buttonText}
                isSchoolPlan={plan.isSchoolPlan}
              />
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}



// import React, { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion"; // Import framer-motion for animations
// import PricingCard from "../PricingCard";

// export default function PricingSection() {
//   const pricingPlans = [
//     {
//       title: "Pro Monthly",
//       price: "6.99",
//       features: [
//         "Access to all tools",
//         "Free access to CPD webinar",
//         "Beautiful content downlaods",
//         "Time-saved tracking",
//         "Access to future features",
//         "Curriculum specific",
//         "Slideshow generator",
//         "Responsive support team",
//         "Rolling AI Improvements"
//       ],
//       buttonText: "Continue",
//     },
//     {
//       title: "Pro Annual",
//       price: "6",
//       features: [
//         "Access to all tools",
//         "Free access to CPD webinar",
//         "Beautiful content downlaods",
//         "Time-saved tracking",
//         "Access to future features",
//         "Curriculum specific",
//         "Slideshow generator",
//         "Responsive support team",
//         "Rolling AI Improvements"
//       ],
//       buttonText: "Continue",
//     },
//     {
//       title: "Whole School Subscription",
//       price: "",
//       features: [
//         "Reduced pricing for schools",
//         "Schools manage own licenses",
//         "Access to all tools",
//         "Free access to CPD webinar",
//         "Beautiful content downlaods",
//         "Time-saved tracking",
//         "Access to future features",
//         "Curriculum specific",
//         "Slideshow generator",
//         "Responsive support team",
//         "Rolling AI Improvements"
//       ],
//       buttonText: "Find out more",
//     },
//   ];

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
//     <div ref={sectionRef} className="w-full overflow-x-hidden">
//       <main className="flex-grow flex flex-col min-2xl:h-auto max-2xl:min-h-screen items-center bg-white text-primary justify-center text-center sm:p-20 max-sm:py-10">
//         {/* Heading animation - Slide from right to left */}
//         <motion.div
//           className="xl:w-1/2 lg:w-3/2 sm:mb-20 mb-10"
//           initial={{ opacity: 0, x: "100%" }} // Initial state (off-screen to the right)
//           animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }} // Animate on visibility
//           transition={{ duration: 1.5, ease: "easeInOut" }} // Slower transition for smoothness
//         >
//           <h1 className="sm:text-5xl text-3xl font-extrabold mb-5">
//             Find Your Perfect Plan
//           </h1>
//         </motion.div>

//         {/* Paragraph animation - Slide from left to right */}
//         <motion.div
//           className="xl:w-1/2 lg:w-3/2 sm:mb-20 mb-10"
//           initial={{ opacity: 0, x: "-100%" }} // Initial state (off-screen to the left)
//           animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: "-100%" }} // Animate on visibility
//           transition={{ duration: 1.5, ease: "easeInOut" }} // Slower transition for smoothness
//         >
//           <p className="sm:text-lg">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//           </p>
//         </motion.div>

//         {/* Cards animation - Slide from right to left */}
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:w-[80%] w-full max-sm:px-4"
//           initial={{ opacity: 0, x: "100%" }}
//           animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
//           transition={{ duration: 1.5 }}
//         >
//           {pricingPlans.map((plan, index) => (
//             <motion.div
//               key={index}
//               className="flex h-full" // Ensures cards maintain uniform height
//               initial={{ opacity: 0, x: "100%" }}
//               animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
//               transition={{ duration: 0.7, delay: index * 0.2 }}
//             >
//               <PricingCard
//                 title={plan.title}
//                 price={plan.price}
//                 description={plan.description}
//                 features={plan.features}
//                 buttonText={plan.buttonText}
//                 buttonLink={plan.buttonLink}
//                 isSchoolPlan={plan.title === "Whole School Subscription"}
//               />
//             </motion.div>
//           ))}
//         </motion.div>

//       </main>
//     </div>
//   );
// }
