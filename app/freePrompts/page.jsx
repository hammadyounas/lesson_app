"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setResponse } from "../../redux/slices/responseSlice";
import Sidebar from "../../components/Sidebar";
import Form from "../../components/Form";
import ResponseSection from "../../components/ResponseSection";
import LimitReachedModal from "../../components/LimitReachedModal";

const FREE_RESPONSE_LIMIT = 2;

const FreeDashboardPage = () => {
  const dispatch = useDispatch();

  // Set initial state directly from localStorage
  const initialCount =
    typeof window !== "undefined"
      ? parseInt(localStorage.getItem("freeResponseCount")) || 0
      : 0;
  const [freeResponseCount, setFreeResponseCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [showLimitModal, setShowLimitModal] = useState(
    localStorage.getItem("limitReached") === "true" &&
      initialCount >= FREE_RESPONSE_LIMIT
  );

  // Save to localStorage only when freeResponseCount changes
  useEffect(() => {
    localStorage.setItem("freeResponseCount", freeResponseCount);

    // If the limit is reached, update the limit status in localStorage
    if (freeResponseCount >= FREE_RESPONSE_LIMIT) {
      localStorage.setItem("limitReached", "true");
      setShowLimitModal(true);
    } else {
      localStorage.removeItem("limitReached");
    }
  }, [freeResponseCount]);

  const handleFormSubmit = (res) => {
    if (freeResponseCount < FREE_RESPONSE_LIMIT) {
      dispatch(setResponse(res));
      setFreeResponseCount((prev) => prev + 1);
      setIsLoading(false);
    } else {
      setShowLimitModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowLimitModal(false);
  };

  return (
    <div className="min-w-screen flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar className="md:w-1/4 w-full" />

      <div className="md:w-full h-auto lg:ml-24 m-4 bg-gray-100 rounded-xl flex flex-col md:flex-row">
        <div className="flex flex-col items-center justify-center animate-fade-right rounded-xl m-2 max-w-full md:w-3/5 transition-all duration-300">
          {/* Display free response count */}
          <div className="text-gray-700 font-medium mb-2">
            Free responses used: {freeResponseCount} / {FREE_RESPONSE_LIMIT}
          </div>
          <Form
            onSubmit={handleFormSubmit}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            disableGenerate={freeResponseCount >= FREE_RESPONSE_LIMIT}
          />
        </div>

        <div className="rounded-xl animate-fade-right md:m-2 flex flex-col w-full overflow-auto">
          <ResponseSection
            handleEditToggle={() => {}}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isLoading={isLoading}
            disableEdit={true} // Disable edit button for free users
          />
        </div>
      </div>

      {/* Show modal when limit is reached */}
      {showLimitModal && <LimitReachedModal onClose={handleCloseModal} />}
    </div>
  );
};

export default FreeDashboardPage;
