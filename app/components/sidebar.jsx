"use client";

import { useState } from "react";
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
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default is false to hide on mobile view
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      await dispatch(clearUser());
    } catch (err) {
      console.error("Error logging out:", err.message);
    }
  };

  return (
    <div className="relative">
      {/* Nav Button for Mobile View */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden absolute top-4 left-4 z-50 bg-blue-800 text-white p-2 rounded-full"
      >
        <Bars3Icon className="w-6 h-6" />
      </button>

      <aside
        className={`fixed lg:relative top-0 left-0 w-[300px] bg-blue-800 text-white p-4 h-screen shadow flex flex-col transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-[100px]`}
      >
        {/* <h2 className="text-lg font-bold mb-4">Lesson App</h2> */}
        <ul className="px-2 py-1 flex flex-col justify-center items-center flex-grow space-y-5">
          <li>
            <Link
              href="/"
              className="w-full flex items-center space-x-2 px-2 py-1 hover:bg-gray-700 rounded-xl"
            >
              <HomeIcon className="w-8 h-8" />
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="w-full flex items-center space-x-2 px-2 py-1 hover:bg-gray-700 rounded-xl"
            >
              <Cog8ToothIcon className="w-8 h-8" />
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 px-2 py-1 hover:bg-gray-700 rounded-xl text-red-400"
            >
              <ArrowRightEndOnRectangleIcon className="w-8 h-8" />
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;


// "use client";

// import { useRouter } from "next/navigation";
// import { supabase } from "../../lib/supabase";
// import { useDispatch } from "react-redux";
// import { clearUser } from "../../redux/slices/userSlice";
// import Link from "next/link";

// import {
//   HomeIcon,
//   Cog8ToothIcon,
//   ArrowRightEndOnRectangleIcon ,
// } from "@heroicons/react/24/outline";

// const Sidebar = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const handleLogout = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;

//       await dispatch(clearUser());
//     } catch (err) {
//       console.error("Error logging out:", err.message);
//     }
//   };

//   return (
//     <aside className="w-full sm:w-1/4 md:w-1/6 lg:w-1/12 bg-blue-800 text-white p-4 h-screen shadow flex flex-col">
//       {/* <h2 className="text-lg font-bold mb-4">Lesson App</h2> */}
//       <ul className="px-2 py-1 flex flex-col justify-center items-center flex-grow space-y-5">
//         <li>
//           <Link
//             href="/"
//             className="w-full flex items-center space-x-2 px-2 py-1 hover:bg-gray-700 rounded-xl"
//           >
//             <HomeIcon className="w-8 h-8" />
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/"
//             className="w-full flex items-center space-x-2 px-2 py-1 hover:bg-gray-700 rounded-xl"
//           >
//             <Cog8ToothIcon className="w-8 h-8" />
//           </Link>
//         </li>
//         <li>
//           <Link
//             href="/login"
//             onClick={handleLogout}
//             className="w-full flex items-center space-x-2 px-2 py-1 hover:bg-gray-700 rounded-xl text-red-400"
//           >
//             <ArrowRightEndOnRectangleIcon  className="w-8 h-8" />
//           </Link>
//         </li>
//       </ul>
//     </aside>
//   );
// };

// export default Sidebar;
