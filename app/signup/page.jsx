"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slices/userSlice";
import { Eye, EyeOff } from "lucide-react";
import Typed from "typed.js";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

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

  const validateFields = () => {
    const { email, password, confirmPassword, firstName, lastName } = formData;
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      setError("All fields are required.");
      return false;
    }
    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      setMessage("");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const resultAction = await dispatch(
        registerUser({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        })
      );
      const user = resultAction.payload;

      if (registerUser.rejected.match(resultAction)) {
        setError(user?.error?.message || "Sign up failed");
        setMessage("");
      } else {
        setMessage("Sign up successful!");
        setError("");
        setTimeout(() => {
          router.push("/login");
        }, 2000); // Delay to show success message
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Check if passwords match using the new value
    if (name === "password") {
      setPasswordsMatch(value === formData.confirmPassword);
    } else if (name === "confirmPassword") {
      setPasswordsMatch(formData.password === value);
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
      <div className="hidden md:flex flex-col w-1/2 animate-fade-up items-center justify-center">
        <h1 className="w-full font-mono px-6 text-white text-4xl mb-8">
          <span ref={typedRef}></span>
        </h1>

        <img src="/teacher_bot2.png" alt="Graphic" className="max-w-full h-3/4 transform scale-x-[-1]" />
      </div>

      {/* Right Column - Signup Form */}
      <div className="w-full h-screen md:w-1/2 flex flex-col items-center animate-fade-up justify-center p-6">
        <h1 className="text-4xl text-center font-bold mb-6 text-white">
          Sign Up
        </h1>
        <form
          onSubmit={handleSignup}
          className="p-8 bg-white rounded-xl w-full max-w-md"
        >
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="block w-full mb-4 p-3 border rounded text-black"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="block w-full mb-4 p-3 border rounded text-black"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full mb-4 p-3 border rounded text-black"
          />

          {/* Password Field with Toggle Visibility */}
          <div className="relative mb-4">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full p-3 border rounded text-black"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
            >
              {passwordVisible ? (
                <Eye className="h-6 w-6" />
              ) : (
                <EyeOff className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Confirm Password Field with Toggle Visibility */}
          <div className="relative mb-4">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="block w-full p-3 border rounded text-black"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
            >
              {confirmPasswordVisible ? (
                <Eye className="h-6 w-6" />
              ) : (
                <EyeOff className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Passwords Match Indicator */}
          {!passwordsMatch && (
            <p className="text-red-500 mb-4">Passwords do not match.</p>
          )}

          <button
            type="submit"
            className="w-full p-3 bg-black text-white rounded"
          >
            {loading ? (
              <span className="flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v3a5 5 0 000 10v3a8 8 0 01-8-8z"
                  ></path>
                </svg>
                Signing Up...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Go to login
              </a>
            </p>
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {message && (
            <div>
              <p className="text-green-500 mt-4">{message}</p>
              <button
                onClick={() => router.push("/login")}
                className="mt-4 w-full p-2 bg-gray-500 text-white rounded"
              >
                Back to Login
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
