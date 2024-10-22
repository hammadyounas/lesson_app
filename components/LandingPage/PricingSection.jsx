import React from 'react'
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
      ];

  return (
    <div>
       <main className="flex-grow flex flex-col min-h-screen items-center bg-gray-900 justify-center text-center sm:p-20 max-sm:py-10">
        <div className="xl:w-1/2 lg:w-3/2 sm:mb-20 mb-10">
          <h1 className="sm:text-5xl text-3xl font-extrabold text-white mb-5">
            Find Your Perfect Plan
          </h1>
          <p className="sm:text-lg text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-10 gap-4 text-white xl:w-2/3 w-full max-sm:px-4">
          {/* Pricing cards section */}
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
      </main>
    </div>
  )
}
