"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUser,
  deleteUser,
  fetchUser,
  uploadProfilePicture,
} from "../../redux/slices/userSlice";
import Sidebar from "../components/sidebar";
import { useRouter } from "next/navigation";
import { Save, Trash2, Camera } from "lucide-react";
import bcrypt from "bcryptjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserSettingsPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isOldPasswordVerified, setIsOldPasswordVerified] = useState(false);
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);

  const [profilePicture, setProfilePicture] = useState(null);
  const [previewPicture, setPreviewPicture] = useState("/default-avatar.png");

  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setEmail(user.email || "");
      setPreviewPicture(user.profile_picture_url || "/default-avatar.png");
    }
  }, [user]);

  const handleOldPasswordVerify = async () => {
    if (await bcrypt.compare(oldPassword, user.password)) {
      setIsOldPasswordVerified(true);
      setIsPasswordUpdating(true);
    } else {
      toast.error("Old password is incorrect");
    }
  };

  const handleUpdate = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword && (await bcrypt.compare(newPassword, user.password))) {
      toast.error("New password cannot be the same as the old password");
      return;
    }

    setIsUpdating(true);
    try {
      // Step 1: Upload profile picture if it's provided
      let profilePictureUrl = user.profile_picture_url;
      if (profilePicture) {
        const { payload, error } = await dispatch(
          uploadProfilePicture({
            userId: user.id,
            profilePictureFile: profilePicture,
          })
        );

        if (error) {
          throw new Error(error);
        }

        profilePictureUrl = payload.profilePictureUrl;
      }

      // Step 2: Update user profile with other data
      const emailToUpdate = email !== user.email ? email : user.email;
      const passwordToUpdate = newPassword ? newPassword : undefined;

      // Create an object to hold the profile update data
      const updateData = {
        userId: user.id,
        firstName,
        lastName,
        email: emailToUpdate,
        password: passwordToUpdate,
        profilePicture: profilePictureUrl,
      };

      await dispatch(updateUser(updateData));

      toast.success("Profile updated successfully");
      setIsEditing(false);
      setIsPasswordUpdating(false);
      setIsOldPasswordVerified(false);

      dispatch(fetchUser(user.id));
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteUser(user.id)).unwrap();
      toast.success("Account deleted successfully");
      router.push("/login");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Error deleting account");
    }
  };

  const cancelPasswordUpdate = () => {
    setIsPasswordUpdating(false);
    setIsOldPasswordVerified(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    setPreviewPicture(URL.createObjectURL(file));
  };

  return (
    <div className="w-full flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar className="md:w-1/4" />

      <div className="flex-1 grid place-items-center p-4 text-black md:p-6 bg-gray-100">
        <div className="bg-gray-200 rounded-lg shadow-md p-6 w-full animate-fade-up max-w-4xl">
          <h2 className="text-2xl text-center font-bold mb-4">User Settings</h2>
          {isUpdating ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center justify-center mb-4">
                <div className="relative">
                  <img
                    src={previewPicture}
                    alt="Profile"
                    className="w-44 h-44 rounded-full object-cover border"
                  />
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full cursor-pointer hover:bg-blue-600">
                      <Camera className="w-5 h-5 text-white" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                      />
                    </label>
                  )}
                </div>
                {isEditing && (
                  <span className="text-gray-600 mt-2">
                    Change Profile Picture
                  </span>
                )}
              </div>

              <div className="grid gap-4 p-4 md:grid-cols-2">
                <div className="flex flex-col gap-2 mb-4">
                  <label>First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`w-full p-2 border rounded bg-white ${
                      !isEditing ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    style={{ fontFamily: '"Courier New", monospace' }}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={`w-full p-2 border rounded bg-white ${
                      !isEditing ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    style={{ fontFamily: '"Courier New", monospace' }}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                  <label>Email</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full p-2 border rounded bg-white ${
                      !isEditing ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    style={{ fontFamily: '"Courier New", monospace' }}
                    disabled={!isEditing}
                  />
                </div>

                {!isOldPasswordVerified && (
                  <div className="flex flex-col gap-2 mb-4">
                    <label>Password</label>
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Enter Old Password"
                      className={`w-full p-2 border rounded bg-white ${
                        !isEditing ? "cursor-not-allowed" : "cursor-pointer"
                      }`}
                      style={{ fontFamily: '"Courier New", monospace' }}
                      disabled={!isEditing || isPasswordUpdating}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleOldPasswordVerify}
                        className={`w-1/3 p-1 bg-blue-200 text-blue-500 rounded-md hover:text-white hover:bg-blue-500 ${
                          !isEditing ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                        disabled={!isEditing || isPasswordUpdating}
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                )}

                {isPasswordUpdating && (
                  <div className="flex flex-col space-y-4 mt-4 animate-slideInFromBottom">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                      <label className="block text-gray-700">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                        className="w-full md:w-2/3 p-2 border rounded"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between">
                      <label className="block text-gray-700">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        className="w-full md:w-2/3 p-2 border rounded"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={cancelPasswordUpdate}
                        className="bg-gray-500 text-white p-2 rounded"
                      >
                        Cancel Password Update
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleUpdate}
                      className="bg-blue-500 text-white p-2 w-full md:w-1/4 rounded flex items-center justify-center"
                      aria-label="Update Profile"
                      disabled={isUpdating}
                    >
                      <Save className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        setPreviewPicture(
                          user.profile_picture_url || "/default-avatar.png"
                        ); // Revert to the original picture
                        setIsEditing(false);
                      }}
                      className="bg-gray-500 text-white w-full md:w-1/4 p-2 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 text-white w-full md:w-1/4 p-2 rounded"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white p-2 w-full md:w-1/4 rounded flex items-center justify-center"
                  aria-label="Delete Account"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toast notifications container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default UserSettingsPage;
