const CheckboxInput = ({ options, selectedOptions, onToggle, error, className }) => {
  return (
    <div className="flex flex-col w-full">
      <label className="flex items-center py-1 mb-2">4 C's Selection <span className="text-red-600">*</span></label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center p-1 w-full rounded-xl cursor-pointer hover:bg-gray-300 hover:text-black transition duration-200 ease-in-out"
          >
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => onToggle(option)}
              className={`m-1 appearance-none h-4 w-4 border border-primary rounded-md checked:bg-primary checked:border-transparent focus:outline-none checked:ring-black checked:ring-offset-1 checked:ring-1 transition duration-100 ease-in-out transform checked:scale-110`}
            />
            <span className="ml-2">{option}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default CheckboxInput;
