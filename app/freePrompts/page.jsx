"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setResponse, clearResponse } from "../../redux/slices/responseSlice";
import Sidebar from "../../components/Sidebar";
import Form from "../../components/Form";
import ResponseSection from "../../components/ResponseSection";
import LimitReachedModal from "../../components/LimitReachedModal";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import { clearFormData } from "@/redux/slices/formSlice";

const FREE_RESPONSE_LIMIT = Infinity;

const FreeDashboardPage = () => {
  const dispatch = useDispatch();
  const response = useSelector((state) => state.response.response);

  // State variables
  const [freeResponseCount, setFreeResponseCount] = useState(
    typeof window !== "undefined"
      ? parseInt(localStorage.getItem("freeResponseCount")) || 0
      : 0
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [showForm, setShowForm] = useState(true);
  const [isFormFullscreen, setIsFormFullscreen] = useState(false); // Track fullscreen state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(
    localStorage.getItem("limitReached") === "true" &&
    freeResponseCount >= FREE_RESPONSE_LIMIT
  );

  // Save to localStorage only when freeResponseCount changes
  useEffect(() => {
    localStorage.setItem("freeResponseCount", freeResponseCount);

    if (freeResponseCount > FREE_RESPONSE_LIMIT) {
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
      setShowForm(false);
    } else {
      setShowLimitModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowLimitModal(false);
  };

  const handleDeleteConfirmation = () => {
    dispatch(clearResponse());
    dispatch(clearFormData());
    setIsEditing(true);
    setIsModalOpen(false);
  };

  return (
    <div className="min-w-screen flex flex-col md:flex-row min-h-screen bg-blue-50">
      <Sidebar className="md:w-1/4 w-full" />

      <div className="md:w-full h-auto lg:ml-24 m-4 bg-blue-50 rounded-xl flex flex-col md:flex-row">
        {/* Form Section */}
        <div
          className={`transition-all duration-500 ${isFormFullscreen ? "fixed inset-0 z-50 bg-white" : "md:w-4/5 m-2"
            } flex flex-col items-center justify-start p-4 hide-scrollbar overflow-auto rounded-xl`} // Ensure scrolling works in fullscreen
        >
          {/* Toggle Fullscreen Button */}
          <button
            onClick={() => setIsFormFullscreen(!isFormFullscreen)}
            className="absolute top-4 right-4 bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300"
          >
            {isFormFullscreen ? <ArrowBigLeft /> : <ArrowBigRight />}
          </button>

          {/* Form Content */}
          <div className="w-full max-w-8xl">
            {showForm && (
              <>
                <div className="text-gray-700 font-medium mb-2 text-sm">
                  Free responses used: {freeResponseCount} / {FREE_RESPONSE_LIMIT}
                </div>
                <Form
                  onSubmit={handleFormSubmit}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                  disableGenerate={freeResponseCount >= FREE_RESPONSE_LIMIT}
                  setShowLimitModal={setShowLimitModal}
                  freeResponseCount={freeResponseCount}
                  FREE_RESPONSE_LIMIT={FREE_RESPONSE_LIMIT}
                />
              </>
            )}
          </div>
        </div>

        {/* Response Section */}
        <div className="rounded-xl md:m-2 flex flex-col w-full hide-scrollbar overflow-auto transition-all duration-300">
          <div className="text-gray-700 font-medium mb-4"></div>
          <ResponseSection
            handleEditToggle={() => setShowForm(!showForm)}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isLoading={isLoading}
            disableEdit={false} // Disable edit button for free users
            showForm={showForm}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirmation}
        showForm={showForm}
      />

      {/* Show modal when limit is reached */}
      {showLimitModal && <LimitReachedModal onClose={handleCloseModal} />}
    </div>
  );
};

export default FreeDashboardPage;




// "use client";

// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setResponse, clearResponse } from "../../redux/slices/responseSlice";
// import Sidebar from "../../components/Sidebar";
// import Form from "../../components/Form";
// import ResponseSection from "../../components/ResponseSection";
// import LimitReachedModal from "../../components/LimitReachedModal";
// import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
// import ConfirmationModal from "@/components/ui/ConfirmationModal";
// import { clearFormData } from "@/redux/slices/formSlice";

// const FREE_RESPONSE_LIMIT = Infinity;

// const FreeDashboardPage = () => {
//   const dispatch = useDispatch();
//   const response = useSelector((state) => state.response.response); // Get the response from the Redux store

//   // Set initial state directly from localStorage
//   const initialCount =
//     typeof window !== "undefined"
//       ? parseInt(localStorage.getItem("freeResponseCount")) || 0
//       : 0;
//   const [freeResponseCount, setFreeResponseCount] = useState(initialCount);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isEditing, setIsEditing] = useState(true);
//   const [showForm, setShowForm] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showLimitModal, setShowLimitModal] = useState(
//     localStorage.getItem("limitReached") === "true" &&
//       initialCount >= FREE_RESPONSE_LIMIT
//   );

//   // Save to localStorage only when freeResponseCount changes
//   useEffect(() => {
//     localStorage.setItem("freeResponseCount", freeResponseCount);

//     // If the limit is reached, update the limit status in localStorage
//     if (freeResponseCount > FREE_RESPONSE_LIMIT) {
//       localStorage.setItem("limitReached", "true");
//       setShowLimitModal(true);
//     } else {
//       localStorage.removeItem("limitReached");
//     }
//   }, [freeResponseCount]);

//   const handleFormSubmit = (res) => {
//     if (freeResponseCount < FREE_RESPONSE_LIMIT) {
//       dispatch(setResponse(res));
//       setFreeResponseCount((prev) => prev + 1);
//       setIsLoading(false);
//       setShowForm(false);
//     } else {
//       setShowLimitModal(true);
//     }
//   };

//   const handleCloseModal = () => {
//     setShowLimitModal(false);
//   };

//   const handleDeleteConfirmation = () => {
//     // Logic for deletion
//     dispatch(clearResponse());
//     dispatch(clearFormData());
//     setIsEditing(true);
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="min-w-screen flex flex-col md:flex-row min-h-screen bg-blue-50">
//       <Sidebar className="md:w-1/4 w-full" />

//       <div className="md:w-full h-auto lg:ml-24 m-4z bg-blue-50 rounded-xl flex flex-col md:flex-row">
//         {/* Button to show the form */}
//         {/* <div className="flex items-center justify-center">
//           <button
//             onClick={() => {
//               setShowForm(!showForm);
//             }}
//             className={`bg-black text-white p-2 rounded-full hover:bg-gray-900 ${
//               !response ? "opacity-50 cursor-not-allowed hidden" : ""
//             }`} // Disable the button if there's no response
//             disabled={!response} // Disable button when no response is available
//           >
//             {showForm ? <ArrowBigLeft /> : <ArrowBigRight />}
//           </button>
//         </div> */}

//         {/* Show form only when button is clicked */}
//         {showForm && (
//           <div className="flex flex-col items-center justify-center rounded-xl m-2 max-w-full md:w-4/5 animate-fade-right animate-delay-300">
//             {/* Display free response count */}
//             <div className="text-gray-700 font-medium mb-2 max-sm:text-sm max-sm:mt-2">
//               Free responses used: {freeResponseCount} / {FREE_RESPONSE_LIMIT}
//             </div>

//             <Form
//               onSubmit={handleFormSubmit}
//               setIsLoading={setIsLoading}
//               isLoading={isLoading}
//               disableGenerate={freeResponseCount >= FREE_RESPONSE_LIMIT}
//               setShowLimitModal={setShowLimitModal}
//               freeResponseCount={freeResponseCount}
//               FREE_RESPONSE_LIMIT={FREE_RESPONSE_LIMIT}
//             />
//           </div>
//         )}

//         {/* Response Section with Fade Effects */}
//         <div
//           className={`rounded-xl md:m-2  flex flex-col w-full overflow-auto transition-all duration-300 ${
//             showForm ? "animate-fade-right" : "animate-fade-left"
//           }`}
//         >
//            <div className="text-gray-700 font-medium mb-4">
//               {" "}
//             </div>
//           <ResponseSection
//             handleEditToggle={() => { setShowForm(!showForm)}}
//             isEditing={isEditing}
//             setIsEditing={setIsEditing}
//             isLoading={isLoading}
//             disableEdit={false} // Disable edit button for free users
//             showForm={showForm}
//             setIsModalOpen={setIsModalOpen}
//           />
//         </div>

//         {/* Confirmation Modal placed here */}
//       <ConfirmationModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onConfirm={handleDeleteConfirmation}
//         showForm={showForm}
//       />
//       </div>

//       {/* Show modal when limit is reached */}
//       {showLimitModal && <LimitReachedModal onClose={handleCloseModal} />}
//     </div>
//   );
// };

// export default FreeDashboardPage;
