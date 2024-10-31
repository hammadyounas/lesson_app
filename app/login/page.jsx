"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { loginUser, fetchUser } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Typed from "typed.js";
import { toast, ToastContainer } from "react-toastify";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const resultAction = await dispatch(loginUser(formData));

      if (loginUser.rejected.match(resultAction)) {
        setError(resultAction.payload || "Login failed");
        toast.error("Invalid Credentials" || resultAction.payload);
        setMessage("");
      } else {
        // setMessage("Login successful!");
        toast.success("Login successful!");
        setError("");

        await dispatch(fetchUser());
        router.push("/dashboard");
      }
    } catch (error) {
      setError("An unexpected error occurred");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
      <div className="hidden md:flex relative animate-fade-up flex-col w-1/2 items-center justify-center bg-transparent">
      <Link href={'/'} className="absolute top-6 left-6 p-1 bg-gray-300 text-black rounded-full hover:bg-gray-100 z-[9999]"><ArrowLeft className="w-6 h-6"/></Link>
        <h1 className="w-full font-mono px-6 text-white mt-8 text-4xl mb-8">
          <span ref={typedRef}></span>
        </h1>
        <img src="teacher_bot2.png" alt="Graphic" className="max-w-full transform scale-x-[-1] h-3/4" />
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full h-screen md:w-1/2 flex flex-col animate-fade-up gap-7 items-center justify-center bg-transparent p-6">
        <h1 className="text-4xl font-bold text-white">Sign In</h1>
        <form
          onSubmit={handleLogin}
          className="p-8 bg-white w-full rounded-lg max-w-md"
        >
          <label htmlFor="email" className="text-gray-600">
            Email
          </label>
          <input
            id="email"
            name="email" // Use name attribute
            type="email"
            placeholder="Type your email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="block w-full my-4 p-3 border rounded text-black transition duration-300 ease-in-out focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          />

          {/* Password Field with Toggle Visibility */}
          <div className="relative mb-4">
            <label htmlFor="pwd" className="text-gray-600">
              Password
            </label>
            <input
              id="pwd"
              name="password" // Use name attribute
              type={passwordVisible ? "text" : "password"}
              placeholder="8+ characters, 1 capital letter"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="block w-full my-4 p-3 border rounded text-black transition duration-200 ease-in-out focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 h-[50px] mt-[40px] flex items-center px-3 text-gray-600"
            >
              {passwordVisible ? (
                <Eye className="h-6 w-6" />
              ) : (
                <EyeOff className="h-6 w-6" />
              )}
            </button>
          </div>
          <div className="hover:underline text-black text-right p-2">
            <Link href="/forget-password">Forgot Password?</Link>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-black text-white rounded-lg transition duration-300 ease-in-out transform hover:bg-black hover:shadow-lg hover:ring-2 hover:ring-offset-2 hover:ring-black"
            disabled={loading}
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
                Signing In...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
          {/* {error && <p className="text-red-500 mt-4">{error}</p>}
          {message && <p className="text-green-500 mt-4">{message}</p>} */}
        </form>
      </div>
    </div>
  );
}
