// components/CourseModal.js

"use client";

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCourse } from '../../redux/slices/courseSlice'; // Import the action from the courses slice

const CourseModal = ({ isOpen, onClose, user }) => {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseCategory, setCourseCategory] = useState('Core');
  const [courseDescription, setCourseDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage submission state
  const [error, setError] = useState(null); // State to handle errors

  const userID = user.id;
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Dispatch action to add course to the Redux store
      await dispatch(addCourse({ 
        user_id: userID,
        name: courseName,
        code: courseCode,
        category: courseCategory,
        description: courseDescription,
      })).unwrap();

      // Call onClose to close the modal after adding the course
      onClose();
    } catch (err) {
      console.error('Error adding course:', err.message);
      setError('Failed to add the course. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;



  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl text-black font-bold mb-4">Add New Course</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Course Name</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Course Code</label>
            <input
              type="text"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              value={courseCategory}
              onChange={(e) => setCourseCategory(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option>Core</option>
              <option>Mandatory</option>
              <option>Elective</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 p-2 rounded-lg mr-2"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-500 text-white p-2 rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseModal;
