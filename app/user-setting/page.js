"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, deleteUser, fetchUser } from "../../redux/slices/userSlice";
import Sidebar from "../components/sidebar";
import { useRouter } from "next/navigation";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { updateAuthUser } from "../../lib/auth"; 
import bcrypt from 'bcryptjs';

const UserSettingsPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [editField, setEditField] = useState(null);

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

    if (password && (await bcrypt.compare(password, user.password))) {
      alert("New password cannot be the same as the old password");
      return;
    }

    try {
      const emailToUpdate = email !== user.email ? email : undefined;
      const passwordToUpdate = password ? password : undefined;

      if (emailToUpdate || passwordToUpdate) {
        const { error: authUpdateError } = await updateAuthUser(emailToUpdate, passwordToUpdate);
        if (authUpdateError) throw new Error(authUpdateError.message);
      }

   
      await dispatch(updateUser({ firstName, lastName, email: emailToUpdate, password: passwordToUpdate }));

      alert("Profile updated successfully");
      setEditField(null); 


      const updatedUser = await dispatch(fetchUser()); 
      if (updatedUser) {
        setFirstName(updatedUser.first_name);
        setLastName(updatedUser.last_name);
        setEmail(updatedUser.email);
        setPassword(updateUser.password);
      }
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteUser()).unwrap();
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
            <div className="flex items-center justify-between">
              <label className="block text-gray-700">First Name</label>
              {editField === 'firstName' ? (
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-2/3 p-2 border rounded"
                />
              ) : (
                <span>{firstName}</span>
              )}
              <button
                onClick={() => setEditField(editField === 'firstName' ? null : 'firstName')}
                className="text-blue-500"
              >
                {editField === 'firstName' ? 'Save' : 'Update'}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <label className="block text-gray-700">Last Name</label>
              {editField === 'lastName' ? (
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-2/3 p-2 border rounded"
                />
              ) : (
                <span>{lastName}</span>
              )}
              <button
                onClick={() => setEditField(editField === 'lastName' ? null : 'lastName')}
                className="text-blue-500"
              >
                {editField === 'lastName' ? 'Save' : 'Update'}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <label className="block text-gray-700">Email</label>
              {editField === 'email' ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-2/3 p-2 border rounded"
                />
              ) : (
                <span>{email}</span>
              )}
              <button
                onClick={() => setEditField(editField === 'email' ? null : 'email')}
                className="text-blue-500"
              >
                {editField === 'email' ? 'Save' : 'Update'}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <label className="block text-gray-700">Password</label>
              {editField === 'password' ? (
                <>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-2/3 p-2 border rounded"
                  />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="w-2/3 mt-2 p-2 border rounded"
                  />
                </>
              ) : (
                <span>********</span>
              )}
              <button
                onClick={() => setEditField(editField === 'password' ? null : 'password')}
                className="text-blue-500"
              >
                {editField === 'password' ? 'Save' : 'Update'}
              </button>
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