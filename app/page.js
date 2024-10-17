"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import { Send } from "lucide-react";
import { useSelector } from "react-redux";
import PricingCard from "./../components/PricingCard";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { user } = useSelector((state) => state.user);

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       // const { data: { session }, error } = await supabase.auth.getSession();
  //       // if (error) throw error;

  //       if (!user) {
  //         setLoading(false);
  //       } else {
  //         router.push('/dashboard');
  //       }
  //     } catch (error) {
  //       console.error('Error checking user:', error.message);
  //       router.push('/login');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkAuth();
  // }, [router]);

  // useEffect(() => {
  //   router.push("/freePrompts");
  // });
  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       Loading...
  //     </div>
  //   );
  // }

  // Pricing plans data
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
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center p-6 bg-white shadow-md fixed top-0 left-0 z-50">
        <h1 className="text-2xl text-black font-bold">Brand</h1>
        <ul className="flex space-x-9">
          <li>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Contact Us
            </a>
          </li>
          <li>
            <a
              href="./freePrompts"
              className="text-white rounded-md bg-gray-700 py-3 px-6 hover:text-gray-900 hover:bg-gray-300 transition"
            >
              Free Trial
            </a>
          </li>
          <li>
            <a
              href="./login"
              className="text-gray-600 rounded-md bg-gray-300 py-3 px-6 hover:text-white hover:bg-gray-700 transition"
            >
              Sign In
            </a>
          </li>
        </ul>
      </nav>

      {/* Lesson Section */}
      <main className="flex-grow flex flex-col min-h-screen items-center justify-center text-center">
        <section className="flex flex-col items-center justify-center w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 space-x-40 max-w-full mx-auto p-32">
            {/* Left column - Text content */}
            <div className="flex flex-col justify-center items-start text-left">
              <h1 className="text-7xl font-extrabold text-gray-900">
                Lesson Generator
              </h1>
              <p className="mt-32 text-lg text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="mt-8">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  Get Started
                </button>
              </div>
            </div>

            {/* Right column - Image */}
            <div className="flex justify-center items-center">
              <img
                src="login.svg" // Replace this with your image path
                alt="Lesson Generator Illustration"
                className="w-full h-auto max-w-sm md:max-w-md rounded-lg shadow-lg"
                style={{ margin: "0 20px" }} // Optional: add margins for extra spacing
              />
            </div>
          </div>
        </section>
      </main>

      <hr />
      {/* Demo Section */}
      <main className="flex-grow flex flex-col min-h-screen items-center justify-center text-center">
        <section className="flex flex-col w-full">
          <div className="flex flex-col items-center justify-between min-h-screen bg-gray-200 w-full mx-auto p-6">
            {/* Top - Text content */}
            <div className="flex flex-col w-1/2 justify-center items-center text-center mt-20">
              <h1 className="text-7xl font-extrabold text-gray-900">Demo</h1>
              <p className="mt-4 text-lg text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            {/* Bottom - Full Page Image */}
            <div className="flex-grow bg-gray-300 max-h-screen w-5/6 flex justify-center m-10">
              <img
                src="login.svg" // Replace this with your image path
                alt="Lesson Generator Illustration"
                className=" "
                style={{ margin: "0 20px" }} // Optional: add margins for extra spacing
              />
            </div>
          </div>
        </section>
      </main>

      <hr />
      {/* Demo Section */}
      <main className="flex-grow flex flex-col min-h-screen items-center justify-center text-center">
        <section className="flex flex-col items-center justify-center w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 space-x-40 max-w-full mx-auto p-32">
            {/* Left column - Text content */}
            <div className="flex flex-col justify-center items-start text-left">
              <h1 className="text-7xl font-extrabold text-gray-900">
                TRY NOW!
              </h1>
              <div className="mt-8">
                <a
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  href="/freePrompts"
                >
                  Get Started
                </a>
              </div>
            </div>

            {/* Right column - Image */}
            <div className="flex justify-center items-center">
              <img
                src="login.svg" // Replace this with your image path
                alt="Lesson Generator Illustration"
                className="w-full h-auto max-w-sm md:max-w-md rounded-lg shadow-lg"
                style={{ margin: "0 20px" }} // Optional: add margins for extra spacing
              />
            </div>
          </div>
        </section>
      </main>

      <hr />

      {/* Pricing Plan Section */}
      <main className="flex-grow flex flex-col min-h-screen items-center bg-gray-200 justify-center text-center p-20">
        <div className="w-1/2 mb-44">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-5">
            Find Your Perfect Plan
          </h1>
          <p className="text-lg text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-black w-2/3">
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

      <hr />

      {/* Contact Us Section */}
      <main className="flex-grow flex flex-col min-h-screen items-center justify-center text-center p-20">
        <div className="w-full mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left Column - Contact Details */}
            <div className="flex flex-col justify-start p-6 border-r-2 text-left">
              <h1 className="text-7xl font-bold text-gray-900 mb-10">
                Contact Us
              </h1>
              <p className="text-lg text-gray-700 mb-2">
                Location: 123 Main St, Anytown, USA
              </p>
              <p className="text-lg text-gray-700 mb-2">
                Email: support@example.com
              </p>
              <p className="text-lg text-gray-700 mb-2">
                Phone: (123) 456-7890
              </p>
              <div className="mt-6">
                <img
                  src="login.svg" // Replace this with your image path
                  alt="Contact Us Illustration"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="flex flex-col p-6 ">
              <form className="text-black px-14">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div>
                    <input
                      type="text"
                      className="mt-2 p-3 border-b-2 border-gray-300 bg-transparent rounded-md w-full focus:outline-none"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      className="mt-2 p-3 border-b-2 border-gray-300 bg-transparent rounded-md w-full focus:outline-none"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      className="mt-2 p-3 border-b-2 border-gray-300 bg-transparent rounded-md w-full focus:outline-none"
                      placeholder="Your Phone Number"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <textarea
                    className="mt-2 p-3 border border-gray-300 w-full h-32 focus:outline-none"
                    placeholder="Your Message"
                    required
                  ></textarea>
                </div>
                <button className="mt-6 w-1/2 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer at the bottom */}
      <footer className="w-full text-center p-6 bg-gray-800 text-white">
        © 2024 Your Company. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
