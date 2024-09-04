"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, deleteUser } from "../../redux/slices/userSlice";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/navigation";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"; 
import { updateAuthUser } from "../../lib/auth";  // Import the new function

const UserSettingsPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleUpdate = async () => {
    if (password && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Update authentication credentials with Supabase
      const { error: authUpdateError } = await updateAuthUser(email, password);
      if (authUpdateError) throw new Error(authUpdateError.message);

      // Update additional user details in the application state and database
      await dispatch(updateUser({ firstName, lastName, email, password }));

      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteUser());
      alert("Account deleted successfully");
      router.push("/login");
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Error deleting account");
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar className="md:w-1/4" />

      <div className="flex-1 grid place-items-center p-4 text-black md:p-6 bg-gray-100">
        <div className="bg-gray-200 rounded-lg shadow-md p-6 w-[600px]">
          <h2 className="text-2xl font-bold mb-4">User Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white p-2 rounded flex items-center justify-center"
                aria-label="Update Profile"
              >
                <PencilIcon className="w-5 h-5" /> {/* Update icon */}
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white p-2 rounded flex items-center justify-center"
                aria-label="Delete Account"
              >
                <TrashIcon className="w-5 h-5" /> {/* Delete icon */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPage;
