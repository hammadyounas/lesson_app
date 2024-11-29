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
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });
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
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
      showCursor: true,
      cursorChar: "_",
    };

    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear field error on input change
  };

  // handle login function
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Clear previous errors
    setFieldErrors({ email: "", password: "" });
  
    // Validate required fields
    let hasError = false;
    let newFieldErrors = { email: "", password: "" };
  
    if (!formData.email) {
      newFieldErrors.email = "Email is required";
      hasError = true;
    }
  
    if (!formData.password) {
      newFieldErrors.password = "Password is required";
      hasError = true;
    } else {
      // Password validation: minimum 8 characters and at least 1 uppercase letter
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-z]).{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        newFieldErrors.password = "Password must be at least 8 characters long and one uppercase letter.";
        hasError = true;
      }
    }
  
    if (hasError) {
      setFieldErrors(newFieldErrors);
      setLoading(false); // Stop loading if there's an error
      return;
    }
  
    try {
      const resultAction = await dispatch(loginUser(formData));
  
      if (loginUser.rejected.match(resultAction)) {
        const error = resultAction.payload || "Login failed";
  
        // Display a generic error message in the toast
        toast.error("Invalid credentials");
  
        // Optional: if you want to capture other errors for logging/debugging
        console.error(error);
      } else {
        toast.success("Login successful!");
        await dispatch(fetchUser());
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
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
      
      <div className="hidden md:flex relative animate-fade-up flex-col w-1/2 items-center justify-center bg-transparent">
        <Link href={'/'} className="absolute top-6 left-6 p-1 bg-gray-300 text-black rounded-full hover:bg-primary hover:text-white z-[9999]"><ArrowLeft className="w-6 h-6"/></Link>
        <h1 className="w-full font-mono px-6 text-white mt-8 text-4xl mb-8">
          <span ref={typedRef}></span>
        </h1>
        <img src="teacher_bot2.png" alt="Graphic" className="max-w-full transform scale-x-[-1] h-3/4" />
      </div>

      <div className="w-full h-screen md:w-1/2 flex flex-col animate-fade-up gap-7 items-center justify-center bg-transparent p-6">
        <h1 className="text-4xl font-bold text-white">Sign In</h1>
        <form
          onSubmit={handleLogin}
          className="p-8 bg-white w-full rounded-lg max-w-md"
        >
          <label htmlFor="email" className="text-gray-600 ">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Type your email"
            value={formData.email}
            onChange={handleInputChange}
            // required
            className="block w-full my-4 p-3 border rounded text-black transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
          {fieldErrors.email && (
            <p className="text-red-500 text-sm -mt-2 mb-2">{fieldErrors.email}</p>
          )}

          <div className="relative mb-4">
            <label htmlFor="pwd" className="text-gray-600">
              Password
            </label>
            <input
              id="pwd"
              name="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="8+ characters, 1 capital letter"
              value={formData.password}
              onChange={handleInputChange}
              // required
              className="block w-full my-4 p-3 border rounded text-black transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
            {fieldErrors.password && (
              <p className="text-red-500 text-sm -mt-2 mb-2">{fieldErrors.password}</p>
            )}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 h-[50px] mt-[40px] flex items-center px-3 text-white bg-primary hover:bg-transparent hover:text-primary"
            >
              {passwordVisible ? (
                <Eye className="h-6 w-6" />
              ) : (
                <EyeOff className="h-6 w-6" />
              )}
            </button>
          </div>

          <div className="hover:underline text-black hover:text-primary text-right p-2">
            <Link href="/forget-password">Forgot Password?</Link>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-primary text-white rounded-lg transition duration-300 ease-in-out transform  hover:shadow-lg hover:ring-2 hover:ring-offset-2 hover:ring-primary"
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
              <Link href="/signup" className="text-primary hover:text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}