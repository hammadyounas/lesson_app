import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm , showForm}) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center max-h-screen bg-opacity-50 backdrop-blur-sm z-[9999] ${showForm ? 'w-full': 'w-full'}`}>
      <div className={`bg-gray-800 px-6 py-8 rounded shadow-md xl:w-[40%] sm:w-[50%] w-[95%] `}>
        <h2 className=" font-semibold text-white max-sm:text-sm">Are you sure you want to delete?</h2>
        <p className={` text-white mt-2 xl:text-sm text-xs`}>This confirmation will remove your current lesson. You can also modify the current lesson by updating the form fields.</p>
        <div className="mt-6 flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-300 text-black rounded text-sm" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded text-sm"
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
