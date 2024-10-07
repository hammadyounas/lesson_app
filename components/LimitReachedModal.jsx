import { useRouter } from "next/navigation";

const LimitReachedModal = ({ onClose }) => {
  const router = useRouter();

  const handleExplorePlans = () => {
    router.push("/pricing");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center text-black bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-lg font-semibold mb-4">
          Free Responses Limit Reached
        </h2>
        <p className="mb-6">
          You have used all your free responses. Please explore our pricing
          plans for unlimited access.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleExplorePlans}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
          >
            Explore Pricing Plans
          </button>
          <button
            onClick={onClose}
            className="text-white bg-gray-400 px-4 py-2 rounded-xl hover:text-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LimitReachedModal;
