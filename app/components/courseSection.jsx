"use client";

import { useState, useEffect, useMemo } from 'react';
import CourseModal from './CourseModal'; 
import EditCourseModal from './EditCourseModal'; 
import { PlusIcon, PencilIcon } from '@heroicons/react/24/outline'; 
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses, addCourse, updateCourse } from '../../redux/slices/courseSlice'; 

const CoursesSection = ({ onSelectCourse }) => {
  const { user } = useSelector((state) => state.user);
  const courses = useSelector((state) => state.courses.courses);

  const [activeTab, setActiveTab] = useState("All");
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCourses(user?.id));
    }
  }, [dispatch, user?.id]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCourseClick = (course) => {
    setSelectedCourseId(course.id);
    onSelectCourse(course);
  };

  const handleAddCourse = async (newCourse) => {
    try {
      await dispatch(
        addCourse({
          ...newCourse,
          user_id: user.id,
        })
      ).unwrap();

      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Error adding course:", err.message);
    }
  };

  const handleEditCourse = async (updatedCourse) => {
    try {
      await dispatch(
        updateCourse({
          courseId: selectedCourse.id,
          updatedCourse,
        })
      ).unwrap();

      setIsEditModalOpen(false);
      setSelectedCourse(null);
    } catch (err) {
      console.error("Error updating course:", err.message);
    }
  };

  const handleEditButtonClick = (course) => {
    setSelectedCourse(course);
    setIsEditModalOpen(true);
  };

  const tabs = ["All", "Core", "Elective"];

  const filteredCourses = useMemo(() => {
    return activeTab === "All"
      ? courses
      : courses.filter((course) => course.category === activeTab);
  }, [activeTab, courses]);

  return (
    <div className="flex flex-col p-4 md:p-6 bg-white rounded-lg shadow-md md:shadow-lg md:max-h-full md:w-[400px] overflow-hidden">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Courses</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-yellow-500 text-white p-2 rounded-full shadow-md hover:bg-yellow-600 transition-colors"
        >
          <PlusIcon className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      </div>

      {/* Tabs with Slider */}
      <div className="relative flex justify-center mb-4">
        <div className="flex overflow-x-auto space-x-2 md:space-x-4 bg-gray-200 p-1 rounded-full">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-3 py-1 text-xs md:text-sm rounded-full font-semibold transition-colors duration-300 ${
                activeTab === tab
                  ? "bg-white text-black"
                  : "bg-transparent text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards */}
      <div className="flex-1 overflow-y-auto h-[200px] md:max-h-[800px] lg:max-h-[700px]">
        {filteredCourses.length === 0 ? (
          <p className="text-gray-500">No courses available</p>
        ) : (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => handleCourseClick(course)}
              className={`flex md:max-w-[400px] items-center p-4 rounded-lg cursor-pointer ${
                selectedCourseId === course.id
                  ? "border-2 border-black bg-gray-100"
                  : ""
              }`}
            >
              <div className="ml-4 md:max-w-[200px]">
                <h3 className="text-sm md:text-base font-bold text-gray-600 ">
                  {course.code}
                </h3>
                <p className="text-md md:text-lg font-bold text-black ">
                  {course.name}
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  {course.category} Course
                </p>
              </div>
              {/* Edit Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditButtonClick(course);
                }}
                className="ml-auto bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors"
              >
                <PencilIcon className="h-2 w-2 md:h-3 md:w-3" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Course Modal */}
      <CourseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddCourse={handleAddCourse}
      />

      {/* Edit Course Modal */}
      {selectedCourse && (
        <EditCourseModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onEditCourse={handleEditCourse}
          course={selectedCourse || {}}
        />
      )}
    </div>
  );
};

export default CoursesSection;
