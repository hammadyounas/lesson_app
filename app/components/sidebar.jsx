import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/slices/userSlice";
import { supabase } from "../../lib/supabase";
import Link from "next/link";
import {
  House,
  Settings,
  LogOut,
  Menu,
  Maximize2,
  Minimize2,
  UserRound,
  UserRoundPen,
  Gem,
} from "lucide-react";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useSelector((state) => state.user);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);

      await dispatch(clearUser());
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
        <Menu className="w-6 h-6" />
      </button>

      <aside
        className={`fixed lg:relative top-0 left-0 bg-blue-800 text-white h-full p-4 shadow flex flex-col transition-width duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${isExpanded ? "w-64" : "w-20"} z-40`}
      >
        {/* User Profile Picture Section */}
        <div className="flex justify-center items-center mb-5">
          <img
            src={user?.profile_picture_url || "default-avatar.png"} 
            alt="Profile"
            className="rounded-full w-10 h-10 object-cover border-2 border-white"
          />
          {isExpanded && (
            <div className="ml-3">
              <span className="font-bold">{user?.first_name || "User"}</span>
              <p className="text-sm">{user?.email || "user@example.com"}</p>
            </div>
          )}
        </div>

        <ul className="flex flex-col justify-center items-center flex-grow space-y-5">
          {user?.id ? (
            <>
              <li className="flex items-center space-x-2">
                <Link
                  href="/dashboard"
                  className="w-full flex items-center space-x-2 px-2 py-1 hover:bg-white hover:text-black rounded-xl transition-all duration-300"
                >
                  <House className="w-8 h-8" />
                  {isExpanded && <span className="ml-2">Home</span>}
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Link
                  href="/user-setting"
                  className="w-full flex items-center space-x-2 px-2 py-1 hover:bg-white hover:text-black rounded-xl transition-all duration-300"
                >
                  <Settings className="w-8 h-8" />
                  {isExpanded && <span className="ml-2">Settings</span>}
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Link
                  href="/pricing"
                  className="w-full flex items-center space-x-2 px-2 py-1 hover:bg-white hover:text-black rounded-xl transition-all duration-300"
                >
                  <Gem className="w-8 h-8" />
                  {isExpanded && <span className="ml-2">Go Premium</span>}
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-2 py-1 hover:bg-white rounded-xl text-red-400 transition-all duration-300"
                >
                  <LogOut className="h-8 w-8" />
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
                  <UserRound className="w-8 h-8" />
                  {isExpanded && <span className="ml-2">Login</span>}
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Link
                  href="/signup"
                  className="w-full flex items-center space-x-2 px-2 py-1 hover:bg-white hover:text-black rounded-full transition-all duration-300"
                >
                  <UserRoundPen className="w-8 h-8" />
                  {isExpanded && <span className="ml-2">SignUp</span>}
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Expand/Collapse Button at the Bottom */}
        <div className="flex justify-center mt-auto">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 px-2 py-1 hover:bg-white hover:text-black rounded-full transition-all duration-300"
          >
            {isExpanded ? (
              <Minimize2 className="w-8 h-8" />
            ) : (
              <Maximize2 className="w-8 h-8" />
            )}
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
