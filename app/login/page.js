"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { loginUser } from '../../lib/auth';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { fetchUser } from '../../redux/slices/userSlice'; // Import fetchUser action
import Link from 'next/link';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch(); // Initialize useDispatch

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { user, error } = await loginUser(email, password);
    setLoading(false);
    if (error) {
      setError(error.message);
      setMessage('');
    } else {
      setMessage('Login successful!');
      setError('');
      await dispatch(fetchUser());
      router.push('/dashboard');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Column - Graphic */}
      <div className="w-1/2 flex items-center justify-center bg-purple-600">
        {/* <img src="/login-graphic.jfif" alt="Graphic" className="max-w-full h-auto" /> */}
      </div>

      {/* Right Column - Login Form */}
      <div className="w-1/2 flex items-center justify-center">
        <form onSubmit={handleLogin} className="p-8 bg-white shadow-md rounded w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-black">Login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full mb-4 p-3 border rounded text-black"
          />

          {/* Password Field with Toggle Visibility */}
          <div className="relative mb-4">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full p-3 border rounded text-black"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
            >
              <img
                src={passwordVisible ? "/hide.png" : "/show.png"}
                alt={passwordVisible ? "Hide Password" : "Show Password"}
                className="h-6 w-6"
              />
            </button>
          </div>

          <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded">
            {loading ? (
              <span className="flex justify-center items-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v3a5 5 0 000 10v3a8 8 0 01-8-8z"></path>
                </svg>
                Logging In...
              </span>
            ) : (
              'Log In'
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
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {message && <p className="text-green-500 mt-4">{message}</p>}
        </form>
      </div>
    </div>
  );
}
