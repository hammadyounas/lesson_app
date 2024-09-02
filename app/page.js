"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import { PaperAirplaneIcon   } from '@heroicons/react/24/solid'; // Import send icon from Heroicons

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Retrieve session data from Supabase
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;

        // Redirect based on session status
        if (!session) {
          setLoading(false); // Stop loading if not authenticated
        } else {
          router.push('/dashboard'); // Redirect to dashboard if authenticated
        }
      } catch (error) {
        console.error('Error checking session:', error.message);
        router.push('/login'); // Redirect to login in case of error
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      // Integrate ChatGPT API call or other logic here
      setMessage(''); // Clear the input after sending
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="relative flex flex-col justify-between min-h-screen bg-gray-900">
      {/* Header with Sign In and Register buttons */}
      <header className="absolute top-0 right-0 p-4">
        <button
          onClick={() => router.push('/login')}
          className="px-4 py-2 mx-2 text-black bg-white rounded-full hover:bg-gray-200"
        >
          Log In
        </button>
        <button
          onClick={() => router.push('/signup')}
          className="px-4 py-2 mx-2 text-white bg-gray-500 rounded-full hover:bg-gray-600"
        >
          Register
        </button>
      </header>

      {/* Chat Input at the Bottom Center */}
      <div className="flex items-center justify-center w-full h-full">
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 max-w-lg">
          <div className="flex items-center w-full p-2 bg-gray-500 border border-gray-500 rounded-full shadow-md">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow p-2 text-white bg-gray-500 border-none focus:outline-none placeholder:text-black"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 text-black bg-white rounded-full hover:bg-gray-200 focus:outline-black"
            >
              <PaperAirplaneIcon   className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
