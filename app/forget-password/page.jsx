"use client";

import { useState, useEffect, useRef  } from "react";
import { useDispatch } from "react-redux";
import { requestPasswordReset } from "../../redux/slices/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Typed from "typed.js";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();
  const typedRef = useRef(null);
  useEffect(() => {
    const options = {
      strings: [
        "Generate Lessons Through AI",
        "Create Interactive Lessons with AI",
        "Make Learning Fun with AI",
      ], // You can add more variations if you'd like
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
      showCursor: true,
      cursorChar: "_",
    };

    // Initialize Typed.js
    const typed = new Typed(typedRef.current, options);

    // Destroy Typed.js instance on cleanup
    return () => {
      typed.destroy();
    };
  }, []);

  const handleRequestPasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const resultAction = await dispatch(requestPasswordReset(email));

      if (requestPasswordReset.rejected.match(resultAction)) {
        toast.error(resultAction.payload?.error || "Invalid Email");
      } else {
        toast.success("Password reset email sent successfully");
        // Optionally redirect to login page
        setTimeout(() => {
          router.push("/login");
        }, 2000); // Delay to show success message
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
         {/* Background Animation */}
         <div className="area absolute inset-0 z-[-1]">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      {/* End Background Animation */}
      {/* Left Column - Graphic */}
      <div className="hidden relative md:flex flex-col w-1/2 animate-fade-up items-center justify-center">
      <Link href={'/login'} className="absolute top-6 left-6 p-1 bg-gray-300 text-black rounded-full hover:bg-gray-100 z-[9999]"><ArrowLeft className="w-6 h-6"/></Link>
        <h1 className="w-full font-mono px-6 text-white text-4xl mt-8 mb-8">
          <span ref={typedRef}></span>
        </h1>

        <img src="/teacher_bot2.png" alt="Graphic" className="max-w-full h-3/4 transform scale-x-[-1]" />
      </div>

      <div className="w-full h-screen md:w-1/2 flex flex-col items-center animate-fade-up justify-center p-6">
        <h1 className="text-white text-3xl font-bold mb-4">Password Reset</h1>
        <form
          onSubmit={handleRequestPasswordReset}
          className="w-full max-w-md bg-white text-black p-6 rounded shadow-md"
        >
          <label htmlFor="email" className="text-gray-600">
            Enter your email
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full my-4 p-3 border rounded"
          />

          <button
            type="submit"
            className="w-full p-3 bg-black text-white rounded"
            disabled={loading}
          >
            {loading ? "Processing..." : "Request Password Reset"}
          </button>
        </form>

        {/* Toast notifications container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
}
