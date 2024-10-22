const TextareaInput = ({
  id,
  label,
  value,
  onChange,
  maxLength,
  charactersTyped,
  className,
  error,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="flex items-center py-1">
        {label}
      </label>
      <textarea
        id={id}
        className={`bg-transparent border-2 border-gray-500 p-1 focus:outline-none w-full resize-none ${className}`}
        maxLength={maxLength}
        rows="4"
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <span className="w-full">
        {charactersTyped}/{maxLength}
      </span>
    </div>
  );
};

export default TextareaInput;
