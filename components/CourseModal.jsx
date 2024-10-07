// components/CourseModal.js

"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "../redux/slices/courseSlice";

const CourseModal = ({ isOpen, onClose }) => {
  const { user } = useSelector((state) => state.user);

  const [courseData, setCourseData] = useState({
    name: "",
    code: "",
    category: "Core",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await dispatch(
        addCourse({
          user_id: user?.id,
          ...courseData,
        })
      ).unwrap();

      onClose();
    } catch (err) {
      console.error("Error adding course:", err.message);
      setError("Failed to add the course. Please try again.");
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
              name="name"
              value={courseData.name}
              onChange={handleChange}
              className="w-full p-2 border text-black rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Course Code</label>
            <input
              type="text"
              name="code"
              value={courseData.code}
              onChange={handleChange}
              className="w-full p-2 border text-black rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={courseData.category}
              onChange={handleChange}
              className="w-full p-2 border text-black rounded-lg"
            >
              <option>Core</option>
              <option>Elective</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={courseData.description}
              onChange={handleChange}
              className="w-full p-2 border text-black rounded-lg"
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
              {isSubmitting ? "Adding..." : "Add Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseModal;
