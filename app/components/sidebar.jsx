import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/slices/userSlice";
import Link from "next/link";
import {
  HomeIcon,
  Cog8ToothIcon,
  ArrowRightEndOnRectangleIcon,
  Bars3Icon,
  UserIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // State for expansion
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      await dispatch(clearUser());
      setIsAuthenticated(false);
      router.push("/login");
    } catch (err) {
      console.error("Error logging out:", err.message);
    }
  };

  return (
    <div className="relative">
      {/* Nav Button for Mobile View */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden absolute top-2 left-2 z-50 bg-blue-800 text-white p-2 rounded-full"
      >
        <Bars3Icon className="w-6 h-6" />
      </button>

      <aside
        className={`fixed lg:relative top-0 left-0 h-full min-h-screen bg-blue-800 text-white p-4 shadow flex flex-col transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${
          isExpanded ? "w-64" : "w-16"
        } z-40`}
      >
        <ul className="flex flex-col justify-center items-center flex-grow space-y-5">
          {isAuthenticated ? (
            <>
              <li className="flex items-center space-x-2">
                <Link
                  href="/"
                  className="w-full flex items-center space-x-2 px-2 py-1 hover:bg-gray-700 rounded-xl transition-all duration-300"
                >
                  <HomeIcon className="w-8 h-8" />
                  {isExpanded && <span className="ml-2">Home</span>}
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Link
                  href="/user-setting"
                  className="w-full flex items-center space-x-2 px-2 py-1 hover:bg-gray-700 rounded-xl transition-all duration-300"
                >
                  <Cog8ToothIcon className="w-8 h-8" />
                  {isExpanded && <span className="ml-2">Settings</span>}
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-2 py-1 hover:bg-gray-700 rounded-xl text-red-400 transition-all duration-300"
                >
                  <ArrowRightEndOnRectangleIcon className="w-8 h-8" />
                  {isExpanded && <span className="ml-2">Logout</span>}
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="w-full flex items-center space-x-2 px-2 py-1 hover:bg-white hover:text-black rounded-full transition-all duration-300"
                >
                  <UserIcon className="w-8 h-8" />
                  {isExpanded && <span className="ml-2">Login</span>}
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Link
                  href="/signup"
                  className="w-full flex items-center space-x-2 px-2 py-1 hover:bg-white hover:text-black rounded-full transition-all duration-300"
                >
                  <PencilSquareIcon className="w-8 h-8" />
                  {isExpanded && <span className="ml-2">SignUp</span>}
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Expand Button at the Bottom */}
        <div className="flex justify-center mt-auto">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 px-2 py-1 hover:bg-white hover:text-black rounded-full transition-all duration-300"
          >
            <Bars3Icon className="w-8 h-8" />
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;








// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "../../lib/supabase";
// import { useDispatch } from "react-redux";
// import { clearUser } from "../../redux/slices/userSlice";
// import Link from "next/link";
// import {
//   HomeIcon,
//   Cog8ToothIcon,
//   ArrowRightEndOnRectangleIcon,
//   Bars3Icon,
// } from "@heroicons/react/24/outline";

// const Sidebar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const router = useRouter();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const checkAuth = async () => {
//       const { data: { session } } = await supabase.auth.getSession();
//       setIsAuthenticated(!!session);
//     };

//     checkAuth();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
//       router.push("/login");
//       await dispatch(clearUser());
//       setIsAuthenticated(false);
//     } catch (err) {
//       console.error("Error logging out:", err.message);
//     }
//   };

//   return (
//     <div className="relative">
//       {/* Nav Button for Mobile View */}
//       <button
//         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         className="lg:hidden absolute top-2 left-1 z-50 bg-blue-800 text-white p-2 rounded-full"
//       >
//         <Bars3Icon className="w-6 h-6" />
//       </button>

//       <aside
//         className={`fixed lg:relative top-0 left-0 w-[100px] bg-blue-800 text-white p-4 h-full min-h-screen shadow flex flex-1 flex-col transform transition-transform duration-300 ease-in-out ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0 lg:w-[100px]`}
//       >
//         <ul className="px-2 py-1 flex flex-col justify-center items-center flex-grow space-y-5">
//           {isAuthenticated ? (
//             <>
//               <li>
//                 <Link
//                   href="/"
//                   className="w-full flex items-center space-x-2 px-2 py-1 hover:bg-gray-700 rounded-xl"
//                 >
//                   <HomeIcon className="w-8 h-8" />
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/user-setting"
//                   className="w-full flex items-center space-x-2 px-2 py-1 hover:bg-gray-700 rounded-xl"
//                 >
//                   <Cog8ToothIcon className="w-8 h-8" />
//                 </Link>
//               </li>
//               <li>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full flex items-center space-x-2 px-2 py-1 hover:bg-gray-700 rounded-xl text-red-400"
//                 >
//                   <ArrowRightEndOnRectangleIcon className="w-8 h-8" />
//                 </button>
//               </li>
//             </>
//           ) : (
//             <>
//               <li>
//                 <Link
//                   href="/login"
//                   className="w-full flex items-center space-x-2 px-2 py-1 hover:bg-white hover:text-black rounded-full"
//                 >
//                   <span className="font-bold">Login</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/signup"
//                   className="w-full flex items-center space-x-2 px-2 py-1 hover:bg-white hover:text-black rounded-full"
//                 >
//                   <span className="font-bold">SignUp</span>
//                 </Link>
//               </li>
//             </>
//           )}
//         </ul>
//       </aside>
//     </div>
//   );
// };

// export default Sidebar;