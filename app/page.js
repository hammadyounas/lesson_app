'use client';

import Navbar from "@/components/LandingPage/Navbar";
import FAQSection from "@/components/LandingPage/faq";
import PricingSection from "@/components/LandingPage/PricingSection";
import ContactUs from "@/components/LandingPage/ContactUs";
import Footer from "@/components/LandingPage/Footer";
import { ToastContainer } from "react-toastify";
import LessonSection from "@/components/LandingPageNew/LessonSection";
import ExploreCategories from "@/components/LandingPageNew/ExploreCategories";
import WeOffering from "@/components/LandingPageNew/WeOffering";

const HomePage = () => {

  return (
    <div className="flex flex-col min-h-screen bg-white w-full overflow-x-hidden">
      <ToastContainer />
      <Navbar />
      <LessonSection />
      <ExploreCategories />
      <WeOffering />
      <PricingSection />
      <FAQSection />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default HomePage;
