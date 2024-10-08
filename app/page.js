"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar'; 
import { Send } from 'lucide-react';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { user } = useSelector((state) => state.user );

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       // const { data: { session }, error } = await supabase.auth.getSession();
  //       // if (error) throw error;

  //       if (!user) {
  //         setLoading(false); 
  //       } else {
  //         router.push('/dashboard'); 
  //       }
  //     } catch (error) {
  //       console.error('Error checking user:', error.message);
  //       router.push('/login'); 
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkAuth();
  // }, [router]);

  useEffect(()=> {
    router.push('/freePrompts');
  })
  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-200">
      {/* Sidebar Integration */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-grow flex items-center justify-center w-full">
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 max-w-lg">
          <div className="flex items-center w-full p-2 bg-gray-500 border border-gray-500 rounded-full shadow-md">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow p-2 text-white bg-gray-500 border-none focus:outline-none placeholder:text-gray-200"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 text-black bg-white rounded-full hover:bg-gray-200 focus:outline-black"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

