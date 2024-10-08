"use client";

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadOutline } from '../redux/slices/outlineSlice'; 
import { useState } from 'react';

const OutlineModal = ({ isOpen, onClose, courseId }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(''); 
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.outlines); 

  const handleSubmit = async () => {
    if (file) {
      try {
        await dispatch(uploadOutline({ file, courseId })); 
        setFileName(file.name); 
        onClose();
      } catch (error) {
        console.error("Error handling outline:", error.message);
      }
    } else {
      console.error("No file selected");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : ''); 
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="max-w-sm bg-white p-6 rounded-lg shadow-md">
          <DialogTitle className="text-lg font-bold mb-4">
            Add Course Outline
          </DialogTitle>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label
                htmlFor="outline-file"
                className="block text-sm font-medium text-gray-700"
              >
                File
              </label>
              <input
                id="outline-file"
                type="file"
                onChange={handleFileChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            {fileName && (
              <p className="text-green-500 text-sm mb-4">File selected: {fileName}</p>
            )}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-md"
                disabled={loading} 
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Outline'}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default OutlineModal;
