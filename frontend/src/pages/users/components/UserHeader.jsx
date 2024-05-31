import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";

const UserHeader = () => {
  // get user context

  const { user } = useContext(UserContext);

  return (
    <header className="bg-[var(--color-neutral-800)] text-[var(--color-neutral-white)]">
      <div className="m-2 w-max border border-[var(--color-neutral-600)] bg-[var(--color-neutral-800)] rounded-[3px] relative">
        <select
          name=""
          id=""
          className="text-4xl font-bold bg-inherit dropdownmenu p-4 cursor-pointer"
        >
          <option value="" className="text-base text-[var(--color-primary)]">
            Add New Group
          </option>
          <optgroup label="Groups" className=" text-base">
            {user.groups?.map((group) => (
              <option key={group._id} value={group._id}>
                {group.name}
              </option>
            ))}
          </optgroup>
        </select>
        <span className="material-symbols-outlined absolute top-[50%] translate-y-[-50%] right-3 text-white pointer-events-none">
          keyboard_arrow_down
        </span>
      </div>
      <nav className="flex items-center bg-[var(--color-neutral-black)]">
        <Link className="px-10 py-4 border-b-4 border-[var(--color-primary)]">
          Announcements
        </Link>
        <Link className="px-10 py-4 border-b-4">Events</Link>
        <Link className="px-10 py-4 border-b-4">Players</Link>
        <Link className="px-10 py-4 border-b-4">Payments</Link>
      </nav>
    </header>
  );
};

export default UserHeader;
