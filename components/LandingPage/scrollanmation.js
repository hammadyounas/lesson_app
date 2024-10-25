import React, { useEffect, useRef, useState } from 'react';

const ScrollAnimateSection = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optionally, reset visibility after animation
          setTimeout(() => setIsVisible(false), 800); // Duration matches your animation
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the component is in view
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
      className={`${isVisible ? 'animate-fade-in' : 'opacity-0'} transition-opacity duration-700`}
    >
      {children}
    </div>
  );
};

export default ScrollAnimateSection;
