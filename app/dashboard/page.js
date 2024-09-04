"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../../redux/slices/courseSlice";
import Sidebar from "../components/sidebar";
import CoursesSection from "../components/courseSection";
import CourseModal from '../components/CourseModal';
import UpdatesSection from "../components/UpdatesSection";
import AssignmentsSection from "../components/AssignmentsSection";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

const sampleUpdates = [
  { title: "New material added to this course", time: "12 Mins ago" },
  { title: "Class date has been adjusted", time: "Yesterday" },
  { title: "Course outline item deleted", time: "January 2, 2019" },
];

const sampleAssignments = [
  {
    title: "The standards of Technology in Education",
    dueDate: "Submit today",
    dueSoon: true,
  },
  {
    title: "The standards of Technology in Education",
    dueDate: "Submit Tomorrow",
    dueSoon: true,
  },
  {
    title: "The standards of Technology in Education",
    dueDate: "Next Week",
    dueSoon: false,
  },
];

const DashboardPage = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();

  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.user);
  const {
    courses,
    status: coursesStatus,
    error: coursesError,
  } = useSelector((state) => state.courses);

  useEffect(() => {
    if (user) {
      dispatch(fetchCourses(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!userLoading && userError) {
      router.push("/login");
    }
  }, [userLoading, userError, router]);

  const handleAddCourse = useCallback(() => {
    setIsCourseModalOpen(true);
  }, []);

  const handleSaveCourse = useCallback(
    (newCourse) => {
      if (user) {
        dispatch(addCourse({ ...newCourse, user_id: user.id }));
      }
      setIsCourseModalOpen(false);
    },
    [dispatch, user]
  );

  const handleUpdateCourse = useCallback(
    (updatedCourse) => {
      if (selectedCourse) {
        dispatch(updateCourse({ id: selectedCourse.id, ...updatedCourse }));
      }
    },
    [dispatch, selectedCourse]
  );

  const handleDeleteCourse = useCallback(() => {
    if (selectedCourse) {
      dispatch(deleteCourse(selectedCourse.id));
      setSelectedCourse(null);
    }
  }, [dispatch, selectedCourse]);

  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message, sender: "user" }]);

    setTimeout(() => {
      setMessages([
        ...messages,
        { text: message, sender: "user" },
        { text: `Response to: ${message}`, sender: "chatgpt" },
      ]);
    }, 1000);
  };

  return (
    <div className="w-full flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar className="md:w-1/4" />

      <div className="flex-1 flex flex-col md:flex-row bg-gray-100">
        <div className="flex-1 p-4 text-black md:p-6 bg-gray-100">
          {/* Conditional Rendering for Courses */}
          {courses.length > 0 ? (
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
              <CoursesSection onSelectCourse={setSelectedCourse} user={user} />

              {/* Main content divided into two sections */}
              <div className="flex flex-1 flex-col md:flex-row md:space-x-5 md:space-y-0 max-sm:space-y-5">
                {/* Left Div: Course Details */}
                <div className="flex-1 flex flex-col space-y-4 bg-white p-4 md:ml-5 rounded-lg shadow-lg">
                  {/* Top Section: Course Title and Description */}
                  <div className="flex flex-col mb-4">
                    {selectedCourse ? (
                      <div>
                        <div className="flex flex-col md:flex-row items-center">
                          <div className="flex-1 p-4">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                              {selectedCourse.name}
                            </h2>
                            <div className="flex items-center space-x-6 mb-4">
                              <p className="text-lg text-gray-400">
                                {selectedCourse.code}
                              </p>
                              <p className="text-lg text-gray-400">
                                {selectedCourse.category}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-center text-gray-400">
                        Select a course to view its details.
                      </p>
                    )}
                  </div>

                  {/* Chat Section: Conditionally Rendered */}
                  {selectedCourse && (
                    <div className="flex-1 flex flex-col h-full max-h-[700px] bg-blue-100 rounded-lg p-4 shadow-inner overflow-y-auto mb-4 md:mb-0">
                      {/* Chat Messages */}
                      <div className="flex-1 overflow-y-auto mb-4">
                        {messages.map((msg, index) => (
                          <div
                            key={index}
                            className={`mb-2 ${
                              msg.sender === "user" ? "text-right" : ""
                            }`}
                          >
                            <div
                              className={`p-2 rounded-lg ${
                                msg.sender === "user"
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-200"
                              }`}
                            >
                              {msg.text}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Chat Input */}
                      <div className="flex items-center mt-auto">
                        <input
                          type="text"
                          placeholder="Type your message..."
                          className="flex-1 p-2 border rounded-full p-3"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSendMessage(e.target.value);
                              e.target.value = "";
                            }
                          }}
                        />
                        <button
                          className="ml-2 bg-blue-500 text-white p-2 rounded-full"
                          onClick={() => {
                            const input = document.querySelector("input");
                            handleSendMessage(input.value);
                            input.value = "";
                          }}
                        >
                          <PaperAirplaneIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Div: Updates and Assignments */}
                <div className="flex-1 flex-col lg:flex-row space-x-0 space-y-4 lg:space-y-3 md:max-w-[350px] ">
                  {/* Updates and Assignments stacked vertically on large screens */}
                  <div className="flex-1">
                    <UpdatesSection updates={sampleUpdates} />
                  </div>
                  <div className="flex-1">
                    <AssignmentsSection assignments={sampleAssignments} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center mt-8">
              <button
                className="bg-blue-500 text-white rounded-md px-6 py-3 text-lg font-bold"
                onClick={handleAddCourse}
              >
                Add Course
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Course Modal */}
      <CourseModal
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        onSave={handleSaveCourse}
        onUpdate={handleUpdateCourse}
        selectedCourse={selectedCourse}
        user={user}
      />
    </div>
  );
};

export default DashboardPage;
