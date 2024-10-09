const TextInput = ({ label, id, type, value, onChange, error, className }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="flex items-center py-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={`Enter ${label}`}
        className={`bg-transparent border-b-2 border-gray-500 p-1 focus:outline-none w-full ${className}`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default TextInput;
