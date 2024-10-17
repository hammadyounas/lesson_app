"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setResponse } from "../../redux/slices/responseSlice";
import Sidebar from "../../components/Sidebar";
import Form from "../../components/Form";
import ResponseSection from "../../components/ResponseSection";

const DashboardPage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const { response } = useSelector((state) => state.response);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  const handleFormSubmit = (res) => {
    dispatch(setResponse(res));
    setIsLoading(false);
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };                                                       

  return (
    <div className="min-w-screen flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar className="md:w-1/4 w-full" />

      <div className="max-w-full md:w-full h-auto lg:ml-24 m-4 bg-gray-100 rounded-xl flex flex-col md:flex-row">
        {/* Show the Form only when in editing mode */}
        <div
          className={`flex flex-col items-center justify-center shadow-lg rounded-xl m-2 max-w-full md:w-2/3 transition-all duration-300 ${
            isEditing
              ? "animate-fade-right opacity-100 translate-x-0 animate-delay-300"
              : "animate-fade-left opacity-0 translate-x-full hidden"
          }`}
        >
          <Form
            onSubmit={handleFormSubmit}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </div>

        <div
          className={`rounded-xl max-h-full m-2 flex flex-col transition-all duration-300 ${
            isEditing
              ? "md:w-full animate-fade-right"
              : "w-full animate-fade-left"
          }`}
        >
          <ResponseSection
            handleEditToggle={handleEditToggle}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
