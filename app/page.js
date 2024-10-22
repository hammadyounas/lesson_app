"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import { Send } from "lucide-react";
import { useSelector } from "react-redux";
import Navbar from "@/components/LandingPage/Navbar";
import DemoSection from "@/components/LandingPage/DemoSection";
import TryNowSection from "@/components/LandingPage/TryNowSection";
import PricingSection from "@/components/LandingPage/PricingSection";
import ContactUs from "@/components/LandingPage/ContactUs";
import Footer from "@/components/LandingPage/Footer";
import LessonSection from "@/components/LandingPage/LessonSection";
import { ToastContainer } from "react-toastify";

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


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <ToastContainer />
      <Navbar />
      <LessonSection />
      <DemoSection />
      <TryNowSection />
      <PricingSection />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default HomePage;
