const UpdatesSection = ({ updates }) => {
    return (
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Updates</h3>
        <ul className="space-y-3">
          {updates?.map((update, index) => (
            <li
              key={index}
              className="flex flex-col p-6 bg-white shadow-md rounded-lg border border-gray-200"
            >
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 text-lg">•</span>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{update?.title}</p>
                  <p className="text-sm text-gray-500">{update?.time}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default UpdatesSection;
  