import { Check } from 'lucide-react';
import React from 'react';

const PricingCard = ({ 
  title, 
  price, 
  description, 
  features, 
  buttonText, 
  buttonLink, 
  isSchoolPlan 
}) => {
  return (
    <div className="flex flex-col justify-between items-center rounded-lg h-full w-full shadow-xl hover:shadow-xl transition-shadow duration-1000 ease-in-out p-6 bg-[#0b734e] animate-fade-up animate-delay-700">
      <div className="flex-grow">
        <h2 className="text-2xl font-semibold text-white mb-2">{title}</h2>
        {isSchoolPlan ? (
          <div className="mt-4 text-5xl">
            <span className="text-white text-6xl">🏫</span>
          </div>
        ) : (
          <p className="mt-4 text-5xl font-extrabold tracking-tight text-white">
            €{price}
            <span className={`ml-1 text-xl font-semibold ${title === 'Free Books' ? 'text-transparent' : 'text-white'}`}>
              / month
            </span>
          </p>
        )}
        <p className="mt-4 text-white">{description}</p>
        <ul className="mt-6 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-white">
              <Check color="#61bd62" />
              <span className="ml-3">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="bg-black text-white hover:bg-white hover:text-primary mt-8 block w-full py-3 px-6 rounded-md text-center font-medium transition-colors duration-1000 ease-in-out"
        href={buttonLink}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;
