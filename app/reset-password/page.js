"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/slices/userSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

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
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl text-black font-bold mb-4">Reset Password</h1>
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
  );
}
