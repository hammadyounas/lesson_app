"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/slices/userSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowLeft } from "lucide-react";
import Typed from "typed.js";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
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

  useEffect(() => {
    // Extract the email from the URL
    const emailFromURL = searchParams.get("email");
    if (emailFromURL) {
      setEmail(emailFromURL);
    } else {
      toast.error("Invalid or missing email in reset link");
      router.push("/login");
    }
  }, [searchParams, router]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Dispatch the resetPassword thunk with the email and new password
      const resultAction = await dispatch(resetPassword({ email, newPassword }));

      if (resetPassword.rejected.match(resultAction)) {
        toast.error(resultAction.payload || "Password reset failed");
      } else {
        toast.success("Password reset successfully!");
        router.push("/login");
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
      <Link href={'/'} className="absolute top-6 left-6 p-1 bg-gray-300 text-black rounded-full hover:bg-gray-100 z-[9999]"><ArrowLeft className="w-6 h-6"/></Link>
        <h1 className="w-full font-mono px-6 text-white text-4xl mt-8 mb-8">
          <span ref={typedRef}></span>
        </h1>

        <img src="/teacher_bot2.png" alt="Graphic" className="max-w-full h-3/4 transform scale-x-[-1]" />
      </div>


    <div className="w-full h-screen md:w-1/2 flex flex-col items-center animate-fade-up justify-center p-6">
      <h1 className="text-3xl text-white font-bold mb-4">Reset Password</h1>
      <form onSubmit={handleResetPassword} className="w-full max-w-md bg-white text-black p-6 rounded shadow-md">
        <label htmlFor="newPassword" className="text-gray-600">New Password</label>
        <input
          id="newPassword"
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="block w-full my-4 p-3 border rounded"
        />

        <label htmlFor="confirmPassword" className="text-gray-600">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="block w-full my-4 p-3 border rounded"
        />

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? "Processing..." : "Reset Password"}
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
