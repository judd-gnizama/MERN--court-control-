import React, { useEffect, useState } from "react";

const Subheader = ({ subheadings, tab, setTab }) => {
  const handleChangeTab = (event) => {
    setTab(event.target.value);
  };

  return (
    <div className="flex text-center">
      <div className="flex">
        {subheadings &&
          subheadings.map((subhead, index) => (
            <div key={index} className="flex">
              <input
                type="radio"
                name="subhead"
                id={subhead + index}
                value={subhead}
                onChange={handleChangeTab}
                className="hidden"
              />
              <label
                htmlFor={subhead + index}
                className={`"flex flex-1 px-10 py-3 cursor-pointer " + ${
                  subhead === tab
                    ? " border-b-4 border-[var(--color-primary)]"
                    : ""
                }`}
              >
                {subhead}
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Subheader;
