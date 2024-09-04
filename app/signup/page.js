"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../../lib/auth';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!passwordsMatch) {
      setError('Passwords do not match.');
      setMessage('');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { user, error: signupError } = await registerUser(email, password, firstName, lastName);

      if (signupError) throw signupError;

      setMessage('Sign up successful!');

    } catch (error) {
      setError(error.message);
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

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordsMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(e.target.value === password);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Column - Graphic */}
      <div className="w-1/2 flex items-center justify-center bg-purple-600">
        {/* <img src="/path/to/your/graphic.png" alt="Graphic" className="max-w-full h-auto" /> */}
      </div>

      {/* Right Column - Signup Form */}
      <div className="w-1/2 flex items-center justify-center">
        <form onSubmit={handleSignup} className="p-8 bg-white shadow-md rounded w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-black">Sign Up</h1>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="block w-full mb-4 p-3 border rounded text-black"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="block w-full mb-4 p-3 border rounded text-black"
          />
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
              onChange={handlePasswordChange}
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

          {/* Confirm Password Field with Toggle Visibility */}
          <div className="relative mb-4">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="block w-full p-3 border rounded text-black"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
            >
              <img
                src={confirmPasswordVisible ? "/hide.png" : "/show.png"}
                alt={confirmPasswordVisible ? "Hide Password" : "Show Password"}
                className="h-6 w-6"
              />
            </button>
          </div>

          {/* Passwords Match Indicator */}
          {!passwordsMatch && (
            <p className="text-red-500 mb-4">Passwords do not match.</p>
          )}

          <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded">
            {loading ? (
              <span className="flex justify-center items-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v3a5 5 0 000 10v3a8 8 0 01-8-8z"></path>
                </svg>
                Signing Up...
              </span>
            ) : (
              'Sign Up'
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
                onClick={() => router.push('/login')}
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
