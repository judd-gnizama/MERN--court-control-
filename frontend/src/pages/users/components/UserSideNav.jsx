import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { cc_logo_transparent } from "../../../assets/images/images";
import { UserContext } from "../../../contexts/UserContext";
import { getUserGroups } from "../../../controllers/groupsControllers";

const UserSideNav = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setTimeout(async () => {
      const groups = await getUserGroups();
      setUser({ ...user, groups });
    }, 500);
  }, []);

  return (
    <>
      <aside className="bg-[var(--color-neutral-600)] text-[var(--color-neutral-white)] flex flex-col p-6 gap-4">
        <Link to="/" className="grid grid-cols-[auto_1fr] gap-2 items-center">
          <img src={cc_logo_transparent} alt="cc_logo" className="w-10" />
          <span className="font-bold text-[1.3rem]">Court Control</span>
        </Link>
        <div>
          <Link
            to="/dashboard"
            className="grid grid-cols-[auto_1fr] gap-2 items-center"
          >
            <span className="material-symbols-outlined text-[2.5rem]">
              account_circle
            </span>
            <span className="flex justify-between">
              <p className="flex flex-col leading-4">
                {user.username}
                <span className="text-[0.75rem] text-[var(--color-neutral-100)]">
                  {user.email}
                </span>
              </p>

              <span className="material-symbols-outlined text-[1.5rem]">
                more_vert
              </span>
            </span>
          </Link>
        </div>
        <div className="section-break"></div>
        <div className="flex justify-between items-center">
          <h3 className="text-[0.8rem] font-bold text-[var(--color-neutral-300)]">
            GROUPS
            <span className="ml-2 text-[var(--color-primary)]">
              {user.groups.length}
            </span>
          </h3>
          <Link
            to="/addgroup"
            className="material-symbols-outlined text-[1.5rem]"
          >
            add
          </Link>
        </div>
        {user.groups ? (
          <div className="flex flex-col gap-2 max-w-[15rem] overflow-hidden">
            {user.groups.map((group, index) => (
              <Link key={index} className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[2.5rem] ">
                  group
                </span>
                <p className=" overflow-hidden whitespace-nowrap text-ellipsis">
                  {group.name}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-sm text-[var(--color-neutral-100)]">
            No groups to show
          </div>
        )}
        <div className="section-break"></div>
        <Link className="grid grid-cols-[auto_1fr] gap-2 items-center">
          <span className="material-symbols-outlined text-[2.5rem]">
            settings
          </span>
          Settings
        </Link>
        <Link className="grid grid-cols-[auto_1fr] gap-2 items-center">
          <span className="material-symbols-outlined text-[2.5rem]">
            logout
          </span>
          Logout
        </Link>
      </aside>
    </>
  );
};

export default UserSideNav;
