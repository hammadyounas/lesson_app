// components/ResourceModal.js
"use client";

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadResource } from '../../redux/slices/resourceSlice'; // Adjust the import path as needed

const ResourceModal = ({ isOpen, onClose, courseId }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('pdf');
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.resources); // Get loading and error from Redux store

  const handleSubmit = async () => {
    if (file) {
      try {
        await dispatch(uploadResource(file, name, type, courseId)); // Dispatch the uploadResource action
        onClose(); // Close the modal after successful upload
      } catch (err) {
        console.error('Error handling resource:', err.message);
      }
    } else {
      console.error('No file selected');
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="max-w-sm bg-white p-6 rounded-lg shadow-md">
          <Dialog.Title className="text-lg font-bold mb-4">Add Resource</Dialog.Title>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label htmlFor="resource-name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                id="resource-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full p-2 text-black border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="resource-type" className="block text-sm font-medium text-gray-700">Type</label>
              <select
                id="resource-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 text-black block w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="pdf">PDF</option>
                <option value="word">Word</option>
                <option value="ppt">PPT</option>
                <option value="excel">Excel</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="resource-file" className="block text-sm font-medium text-gray-700">File</label>
              <input
                id="resource-file"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-md"
                disabled={loading} // Disable button when loading
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                disabled={loading} // Disable button when loading
              >
                {loading ? 'Adding...' : 'Add Resource'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ResourceModal;
