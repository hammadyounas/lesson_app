"use client";

import { useState, useEffect, useMemo } from 'react';
import CourseModal from './CourseModal'; 
import EditCourseModal from './EditCourseModal'; // Import the EditCourseModal
import { PlusIcon, PencilIcon } from '@heroicons/react/24/outline'; // Import PencilIcon
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses, addCourse, updateCourse } from '../../redux/slices/courseSlice'; // Import updateCourse

const CoursesSection = ({ onSelectCourse, user }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedCourseId, setSelectedCourseId] = useState(null); // State for selected course ID
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State to manage the Add modal visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to manage the Edit modal visibility
  const [selectedCourse, setSelectedCourse] = useState(null); // State to manage the selected course for editing

  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses); // Get courses from Redux state

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCourses(user.id)); // Fetch courses when component mounts or user ID changes
    }
  }, [dispatch, user?.id]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCourseClick = (course) => {
    setSelectedCourseId(course.id); // Set the selected course ID
    onSelectCourse(course); // Pass the selected course to the parent component
  };

  const handleAddCourse = async (newCourse) => {
    try {
      await dispatch(addCourse({ 
        ...newCourse,
        user_id: user.id 
      })).unwrap();

      // Close the modal
      setIsAddModalOpen(false);
    } catch (err) {
      console.error('Error adding course:', err.message);
    }
  };

  const handleEditCourse = async (updatedCourse) => {
    try {
      await dispatch(updateCourse({
        courseId: selectedCourse.id,
        updatedCourse
      })).unwrap();

      // Close the modal
      setIsEditModalOpen(false);
      setSelectedCourse(null); // Clear selected course after editing
    } catch (err) {
      console.error('Error updating course:', err.message);
    }
  };

  const handleEditButtonClick = (course) => {
    setSelectedCourse(course); // Set the course to be edited
    setIsEditModalOpen(true); // Open the edit modal
  };

  const tabs = ['All', 'Core', 'Elective'];

  // Memoize filtered courses to avoid unnecessary re-calculation
  const filteredCourses = useMemo(() => {
    return activeTab === 'All'
      ? courses
      : courses.filter(course => course.category === activeTab);
  }, [activeTab, courses]);

  return (
    <div className="flex flex-col p-4 md:p-6 bg-white rounded-lg shadow-md md:shadow-lg h-[900px] max-w-full md:w-1/4">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Courses</h2>
        <button 
          onClick={() => setIsAddModalOpen(true)} // Open the Add modal
          className="bg-yellow-500 text-white p-2 rounded-full shadow-md hover:bg-yellow-600 transition-colors"
        >
          <PlusIcon className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      </div>

      {/* Tabs with Slider */}
      <div className="relative ml-12 m-4">
        <div className="relative flex items-center">
          <div className="flex space-x-2 md:space-x-4 bg-gray-200 p-1 rounded-full overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`px-3 py-1 text-xs md:text-sm rounded-full font-semibold transition-colors duration-300 ${activeTab === tab ? 'bg-white text-black' : 'bg-transparent text-gray-600'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Cards */}
      <div className="flex-1 overflow-y-auto max-h-[700px]"> {/* Adjust the height as needed */}
        {filteredCourses.length === 0 ? (
          <p className="text-gray-500">No courses available</p>
        ) : (
          filteredCourses.map(course => (
            <div
              key={course.id}
              onClick={() => handleCourseClick(course)}
              className={`flex items-center p-4 rounded-lg cursor-pointer ${selectedCourseId === course.id ? 'border-2 border-black bg-gray-100' : ''}`}
            >
              <div className="ml-4">
                <h3 className="text-sm md:text-base font-bold text-gray-600">{course.code}</h3>
                <p className="text-md md:text-lg font-bold text-black">{course.name}</p>
                <p className="text-xs md:text-sm text-gray-500">{course.category} Course</p>
              </div>
              {/* Edit Button */}
              <button
                onClick={() => handleEditButtonClick(course)} // Open the Edit modal
                className="ml-auto bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors"
              >
                <PencilIcon className="h-3 w-3 md:h-4 md:w-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Course Modal */}
      <CourseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)} // Close the modal
        onAddCourse={handleAddCourse} // Handle adding a course
        user={user} // Pass the user object to the modal
      />

      {/* Edit Course Modal */}
      {selectedCourse && (
        <EditCourseModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)} // Close the modal
          onEditCourse={handleEditCourse} // Handle editing a course
          course={selectedCourse} // Pass the selected course to the edit modal
          user={user} // Pass the user object to the modal
        />
      )}
    </div>
  );
};

export default CoursesSection;
