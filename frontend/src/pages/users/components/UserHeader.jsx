import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";

const UserHeader = ({ children }) => {
  // get user context

  const { user, setUser } = useContext(UserContext);
  const [pageSelect, setPageSelect] = useState(window.location.pathname);
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    setPageSelect(event.target.value);
    navigate(event.target.value);
  };

  return (
    <header className="bg-[var(--color-neutral-800)] text-[var(--color-neutral-white)]">
      <div className="m-2 w-max border border-[var(--color-neutral-600)] bg-[var(--color-neutral-800)] rounded-[3px] relative mb-4">
        <select
          name="page-select"
          id="page-select"
          value={pageSelect}
          onChange={handleSelectChange}
          className="text-4xl font-bold bg-inherit dropdownmenu p-4 cursor-pointer"
        >
          <option value="/dashboard" className="text-base">
            Dashboard
          </option>
          <option
            value="/addgroup"
            className="text-base text-[var(--color-primary)]"
          >
            Add New Group
          </option>
          <optgroup label="Groups" className=" text-base">
            {user.groups?.map((group) => (
              <option key={group._id} value={`/g/${group._id}`}>
                {group.name}
              </option>
            ))}
          </optgroup>
        </select>
        <span className="material-symbols-outlined absolute top-[50%] translate-y-[-50%] right-3 text-white pointer-events-none">
          keyboard_arrow_down
        </span>
      </div>
      <nav>{children}</nav>
    </header>
  );
};

export default UserHeader;
