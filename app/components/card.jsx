// components/Card.js
"use client";
const Card = ({ title, children, className }) => {
    return (
      <div className={`bg-white rounded-lg p-4 mb-4 ${className}`}>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div>{children}</div>
      </div>
    );
  };
  
  export default Card;
  