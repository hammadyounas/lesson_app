import { Check } from 'lucide-react';
import React from 'react';

const PricingCard = ({ 
  title, 
  price, 
  description, 
  features, 
  buttonText, 
  buttonLink 
}) => {
  return (
    <div className="flex flex-col justify-between items-center border border-gray-300 rounded-lg max-h-full w-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-6 bg-white animate-fade-up animate-delay-300">
      <div className="flex-grow">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="mt-4 text-5xl font-extrabold tracking-tight text-gray-800">
          {price}
          <span className="ml-1 text-xl font-semibold text-gray-600">/ month</span>
        </p>
        <p className="mt-4 text-gray-700">{description}</p>
        <ul className="mt-6 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-600">
              <Check color="#61bd62" />
              <span className="ml-3">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="bg-emerald-600 text-white hover:bg-emerald-700 mt-8 block w-full py-3 px-6 rounded-md text-center font-medium transition-colors duration-300 ease-in-out"
        href={buttonLink}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;
