import React from "react";

const Input = ({
  icon,
  placeholder,
  inputValue,
  setInputValue,
  labelText,
  labelClassName,
}) => {
  return (
    <div className={labelClassName}>
      {labelText && (
        <label className="text-sm mr-2" htmlFor={`search-${placeholder}`}>
          {labelText}
        </label>
      )}
      <div className="flex-1 rounded-[3px] overflow-hidden relative">
        <input
          type="text"
          name="search"
          id={`search-${placeholder}`}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={`font-bold p-2 bg-[var(--color-neutral-300)] text-[var(--color-neutral-white)] focus:outline-none placeholder:text-white placeholder:opacity-70 w-full pl-3 pr-10 ${
            icon && "px-10"
          }`}
        />
        {icon && (
          <span className="material-symbols-outlined filled top-[50%] -translate-y-1/2 left-3 absolute">
            {icon}
          </span>
        )}
        {inputValue && (
          <button
            type="button"
            onClick={() => setInputValue("")}
            className="material-symbols-outlined filled top-[50%] -translate-y-1/2 right-3 absolute"
          >
            close
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
