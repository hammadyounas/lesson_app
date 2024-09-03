"use client";

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateCourse, deleteCourse } from '../../redux/slices/courseSlice'; 
import { TrashIcon } from '@heroicons/react/24/outline'; 

const EditCourseModal = ({ isOpen, onClose, course, user }) => {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseCategory, setCourseCategory] = useState('Core');
  const [courseDescription, setCourseDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [error, setError] = useState(null); 

  const dispatch = useDispatch();

  useEffect(() => {
    if (course) {
      setCourseName(course.name || '');
      setCourseCode(course.code || '');
      setCourseCategory(course.category || 'Core');
      setCourseDescription(course.description || '');
    }
  }, [course]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await dispatch(updateCourse({
        id: course.id, 
        name: courseName,
        code: courseCode,
        category: courseCategory,
        description: courseDescription,
      })).unwrap();

      onClose();
    } catch (err) {
      console.error('Error updating course:', err.message);
      setError('Failed to update the course. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this course?')) {
      try {
        await dispatch(deleteCourse(course.id)).unwrap(); 
        onClose(); 
      } catch (err) {
        console.error('Error deleting course:', err.message);
        setError('Failed to delete the course. Please try again.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Course</h2>
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
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 text-white p-2 rounded-lg flex items-center space-x-1"
              disabled={isSubmitting}
            >
              <TrashIcon className="h-5 w-5" />
            </button>
            <div>
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
                {isSubmitting ? 'Updating...' : 'Update Course'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourseModal;
