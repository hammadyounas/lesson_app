import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center max-h-screen bg-opacity-50 backdrop-blur-sm">
      <div className="bg-gray-800 px-6 py-8 rounded shadow-md xl:w-[30%] sm:w-[60%] w-[90%]">
        <h2 className=" font-semibold text-white">Are you sure you want to delete?</h2>
        <p className='text-sm text-white mt-2'>This confirmation will remove your current lesson. You can also modify the current lesson by updating the form fields.</p>
        <div className="mt-6 flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-300 text-black rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
