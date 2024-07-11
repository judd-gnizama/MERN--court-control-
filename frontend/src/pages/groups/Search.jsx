import React, { useState } from "react";

const Search = ({ searchFor, searchTerm, setSearchTerm }) => {
  return (
    <div className="flex-1 max-w-lg rounded-[3px] border border-transparent overflow-hidden relative">
      <input
        type="text"
        name="search"
        id="search"
        placeholder={`Search ${searchFor ? searchFor : ""}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="font-bold p-2 bg-[var(--color-neutral-300)] text-[var(--color-neutral-white)] placeholder:text-white px-10 w-full"
      />
      <span className="material-symbols-outlined filled top-[50%] -translate-y-1/2 left-3 absolute">
        search
      </span>
      {searchTerm && (
        <button
          type="button"
          onClick={() => setSearchTerm("")}
          className="material-symbols-outlined filled top-[50%] -translate-y-1/2 right-3 absolute"
        >
          close
        </button>
      )}
    </div>
  );
};

export default Search;
