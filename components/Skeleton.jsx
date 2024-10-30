const SkeletonLoader = () => {
    return (
      <div className="animate-pulse p-4 bg-gray-200 pt-10 rounded-xl h-full">
        <div className="h-6 bg-gray-400 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-400 rounded mb-2"></div>
        <div className="h-4 bg-gray-400 rounded mb-2"></div>
        <div className="h-4 bg-gray-400 rounded mb-2"></div>
        <div className="h-4 bg-gray-400 rounded mb-2"></div>
        <div className="h-4 bg-gray-400 rounded mb-2"></div>
        <div className="h-6 bg-gray-400 rounded w-[60%] mt-10 mb-2"></div>
        <div className="h-4 bg-gray-400 rounded mb-2"></div>
        <div className="h-4 bg-gray-400 rounded mb-2"></div>
        <div className="h-5 bg-gray-400 rounded mb-2"></div>
        <div className="h-4 bg-gray-400 rounded mb-2 w-[80%]"></div>
        <div className="h-4 bg-gray-400 rounded mb-2"></div>
        <div className="max-lg:hidden">
        <div className="h-4 bg-gray-400 rounded w-[20%] mt-10 mb-2"></div>
        <div className="h-4 bg-gray-400 rounded mb-2"></div>
        <div className="h-6 bg-gray-400 rounded mb-2 w-[95%]"></div>
        <div className="h-5 bg-gray-400 rounded mb-2 w-[70%]"></div>
        <div className="h-4 bg-gray-400 rounded mb-2 w-[80%]"></div>
        <div className="h-4 bg-gray-400 rounded mb-2"></div>
        </div>
      </div>
    );
  };
  
  export default SkeletonLoader;