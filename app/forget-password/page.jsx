"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { requestPasswordReset } from "../../redux/slices/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();

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
    <div className="relative w-full min-h-screen bg-gray-100 p-6">
      {/* Top-left button for login page */}
      <button
        onClick={() => router.push("/login")}
        className="absolute top-6 left-6 p-2 bg-gray-300 text-black rounded-full hover:bg-gray-100"
      >
        <ArrowLeft />
      </button>

      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-black text-3xl font-bold mb-4">Password Reset</h1>
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
