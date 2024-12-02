"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slices/userSlice";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Typed from "typed.js";
import Link from "next/link";
import { Icons, toast, ToastContainer } from "react-toastify";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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
    let newError = { ...error };
  
    // Reset error states
    Object.keys(newError).forEach((key) => (newError[key] = ""));
  
    if (!firstName) newError.firstName = "First Name is required.";
    if (!lastName) newError.lastName = "Last Name is required.";
    if (!email) newError.email = "Email is required.";
    
    // Password validation
    if (!password) {
      newError.password = "Password is required.";
    } else if (password.length < 8) {
      newError.password = "Password must be at least 8 characters long.";
    } else if (!/[A-Z]/.test(password)) {
      newError.password = "Password must contain at least one uppercase letter.";
    }
  
    if (!confirmPassword) {
      newError.confirmPassword = "Confirm Password is required.";
    } else if (password && confirmPassword && password !== confirmPassword) {
      newError.confirmPassword = "Passwords do not match.";
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  
    setError(newError);
    return Object.values(newError).every((err) => err === "");
  };
  

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Clear previous errors
    setError({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });

    // Validate required fields
    if (!validateFields()) {
      setLoading(false);
      return; // Stop loading if validation fails
    }

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
        toast.error(user?.error?.message || "Sign up failed");
        setMessage("");
      } else {
        setMessage("Sign up successful!");
        toast.success("Sign up successful!");
        setError("");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      setError({ ...error, general: "An unexpected error occurred." });
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
      <ToastContainer />
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
      <Link href={'/'} className="absolute top-6 left-6 p-1 bg-gray-300 text-black rounded-full hover:bg-primary hover:text-white z-[9999]"><ArrowLeft className="w-6 h-6"/></Link>
        <h1 className="w-full font-mono px-6 text-white text-4xl mt-8 mb-8">
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
            className="block w-full mb-4 p-3 border rounded text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
              {error.firstName && <p className="text-red-500 text-sm -mt-2 mb-2">{error.firstName}</p>}
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="block w-full mb-4 p-3 border rounded text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
               {error.lastName && <p className="text-red-500 text-sm -mt-2 mb-2">{error.lastName}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full mb-4 p-3 border rounded text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
               {error.email && <p className="text-red-500 text-sm -mt-2 mb-2">{error.email}</p>}

          {/* Password Field with Toggle Visibility */}
          <div className="relative mb-4">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full p-3 border rounded text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-3  text-white bg-primary hover:bg-transparent hover:text-primary"
            >
              {passwordVisible ? (
                <Eye className="h-6 w-6" />
              ) : (
                <EyeOff className="h-6 w-6" />
              )}
            </button>
          </div>
            {error.password && <p className="text-red-500 text-sm -mt-2 mb-2">{error.password}</p>}

          {/* Confirm Password Field with Toggle Visibility */}
          <div className="relative mb-4">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="block w-full p-3 border rounded text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-white bg-primary hover:bg-transparent hover:text-primary"
            >
              {confirmPasswordVisible ? (
                <Eye className="h-6 w-6" />
              ) : (
                <EyeOff className="h-6 w-6" />
              )}
            </button>
          </div>
          {error.confirmPassword && <p className="text-red-500 text-sm -mt-2 mb-2">{error.confirmPassword}</p>}

          {/* Passwords Match Indicator */}
          {!passwordsMatch && (
            <p className="text-red-500 text-sm -mt-2 mb-2">Passwords do not match.</p>
          )}

          <button
            type="submit"
            className="w-full p-3 bg-primary text-white rounded-lg transition duration-300 ease-in-out transform  hover:shadow-lg hover:ring-2 hover:ring-offset-2 hover:ring-primary"
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
              <a href="/login" className=" text-primary hover:text-blue-500 hover:underline">
                Go to login
              </a>
            </p>
          </div>
          {/* {error && <p className="text-red-500 mt-4">{error}</p>} */}
          {message && (
            <div>
              {/* <p className="text-green-500 mt-4">{message}</p> */}
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

