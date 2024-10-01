const SkeletonLoader = () => {
    return (
      <div className="animate-pulse p-4 bg-gray-300 rounded-xl h-[700px]">
        <div className="h-6 bg-gray-400 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-400 rounded mb-2"></div>
        <div className="h-4 bg-gray-400 rounded mb-2"></div>
        <div className="h-4 bg-gray-400 rounded mb-2"></div>
        <div className="h-4 bg-gray-400 rounded mb-2"></div>
        <div className="h-4 bg-gray-400 rounded mb-2"></div>
      </div>
    );
  };
  
  export default SkeletonLoader;