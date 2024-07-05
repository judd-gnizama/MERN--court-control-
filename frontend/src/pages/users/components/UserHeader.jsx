import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import EditGroup from "../../groups/EditGroup";

const UserHeader = ({ children }) => {
  // get user context

  const { user, setUser } = useContext(UserContext);
  const [pageSelect, setPageSelect] = useState(window.location.pathname);
  const [showEditGroup, setShowEditGroup] = useState(false);
  const navigate = useNavigate();

  const isGroupPage = () => {
    const pathname = window.location.pathname.split("/");
    const groupId = pathname[pathname.length - 1];
    return user.groups.findIndex((group) => group._id === groupId) !== -1;
  };

  const handleSelectChange = (event) => {
    setPageSelect(event.target.value);
    navigate(event.target.value);
  };

  const handleEditGroup = () => {
    setPageSelect(window.location.pathname);
  };

  useEffect(() => {
    setPageSelect(window.location.pathname);
  }, [window.location.pathname]);

  return (
    <header className="flex flex-col gap-2 bg-[var(--color-neutral-800)] text-[var(--color-neutral-white)] p-4 pb-0">
      <div className="flex justify-between pb-0">
        {!isGroupPage() ? (
          <h1 className="text-4xl font-bold p-4">Dashboard</h1>
        ) : (
          <div className=" self-center w-max border border-[var(--color-neutral-600)] bg-[var(--color-neutral-800)] rounded-[3px] relative">
            <select
              name="page-select"
              id="page-select"
              value={pageSelect}
              onChange={handleSelectChange}
              className="text-4xl font-bold bg-inherit dropdownmenu p-4 cursor-pointer"
            >
              {/* <option value="/dashboard" className="text-base">
              Dashboard
            </option> */}
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
        )}
        {isGroupPage() && (
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setShowEditGroup(true)}
              className="flex flex-col text-sm border rounded-[3px] items-center gap-2 p-2 text-nowrap"
            >
              <span className="material-symbols-outlined filled text-2xl">
                edit_square
              </span>
              Edit Group
            </button>
            <button className="flex flex-col text-sm items-center gap-2 p-2 rounded-[3px] bg-[var(--color-neutral-300)]">
              <span className="material-symbols-outlined filled text-2xl">
                lock
              </span>
              Share
            </button>
          </div>
        )}
      </div>
      <nav>{children}</nav>
      {showEditGroup && (
        <EditGroup
          show={showEditGroup}
          setShow={setShowEditGroup}
          onEditGroup={handleEditGroup}
        />
      )}
    </header>
  );
};

export default UserHeader;
