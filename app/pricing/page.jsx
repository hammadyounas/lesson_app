"use client";

import { ArrowLeft, Check} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

// Define the pricing plans with dynamic features
const pricingPlans = [
  {
    title: "Free Tier",
    price: "$0",
    description: "Perfect for individuals just getting started.",
    features: [
      "Basic access to all features",
      "Limited support",
      "Community access",
      "Monthly updates",
    ],
    buttonText: "Sign Up Free",
    buttonLink: "/pricing",
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
    buttonLink: "/pricing",
  },
  {
    title: "Free Books",
      price: "",
      features: [
        "All Free Books",
        "Priority support",
        "Access to premium features",
        "Monthly updates",
      ],
      buttonText: "Contact Us",
    buttonLink: "/pricing",
  },
];

// Reusable PricingCard component
const PricingCard = ({
  title,
  price,
  description,
  features,
  buttonText,
  buttonLink,
}) => {
  return (
    <div className="flex flex-col justify-between items-center border-2 rounded-lg max-h-full w-full border-gray-200 p-6 animate-fade-up animate-delay-300">
      <div className="flex-grow">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="mt-4 text-5xl font-extrabold tracking-tight">
          {price}
          <span className={`ml-1 text-xl font-semibold  ${title === 'Free Books' ? 'text-transparent': ''}`}>/ month</span>
        </p>
        <p className="mt-4">{description}</p>
        <ul className="mt-6 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check color="#61bd62" />
              <span className="ml-3">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <a
        className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
        href={buttonLink}
      >
        {buttonText}
      </a>
    </div>
  );
};

const PricingPage = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  return (
    <div className="relative flex flex-col space-y-10 justify-center items-center bg-white text-black min-h-screen p-8">
      {/* Back to Dashboard Button */}
      <button
        onClick={() => {
          if (user) router.push("/dashboard");
          else router.push("/freePrompts");
        }}
        className="absolute top-4 left-4 bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-md shadow-md"
      >
        <ArrowLeft />
      </button>

      {/* Header section */}
      <div className="text-center animate-fade-up space-y-3">
        <h1 className="text-4xl font-bold">Pricing Plans</h1>
        <p>Get started on our free plan and upgrade when you're ready.</p>
      </div>

      {/* Pricing cards section */}
      <div className="flex flex-col md:flex-row w-full md:w-4/5 space-y-4 md:space-x-4 md:space-y-0">
        {pricingPlans.map((plan, index) => (
          <PricingCard
            key={index}
            title={plan.title}
            price={plan.price}
            description={plan.description}
            features={plan.features}
            buttonText={plan.buttonText}
            buttonLink={plan.buttonLink}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
