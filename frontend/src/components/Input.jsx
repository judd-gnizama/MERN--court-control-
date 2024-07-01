import React from "react";

const Input = ({ icon, placeholder, inputValue, setInputValue }) => {
  return (
    <div className="flex-1 rounded-[3px] overflow-hidden relative">
      <input
        type="text"
        name="search"
        id="search"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={`font-bold p-2 bg-[var(--color-neutral-300)] text-[var(--color-neutral-white)] placeholder:text-white w-full pl-3 pr-10 ${
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
  );
};

export default Input;
