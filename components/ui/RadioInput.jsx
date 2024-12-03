const RadioInput = ({ name, options, selectedValue, onChange, error }) => {
  return (
    <div className="w-full mt-2"> {/* Ensures it uses available space */}
      <label className="flex items-center py-1">{name}</label>
      <div className="flex flex-col md:flex-row gap-2">
        {options.map((option) => (
          <label
            key={option}
            className={`relative flex flex-row items-center p-2 cursor-pointer rounded-xl ${selectedValue === option ? "text-black" : "text-gray-700"
              }`}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={selectedValue === option}
              onChange={onChange}
              className="absolute opacity-0 cursor-pointer"
            />
            <span
              className={`w-5 h-5 border-2 rounded-full flex items-center justify-center mr-2 transition-colors duration-200 ${selectedValue === option
                ? option === "Low"
                  ? "border-gray-500"
                  : option === "Medium"
                    ? "border-green-500"
                    : "border-red-500"
                : "border-primary"
                }`}
            >
              {selectedValue === option && (
                <span
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${option === "Low"
                    ? "bg-gray-500"
                    : option === "Medium"
                      ? "bg-green-500"
                      : "bg-red-500"
                    }`}
                ></span>
              )}
            </span>
            {option}
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default RadioInput;
