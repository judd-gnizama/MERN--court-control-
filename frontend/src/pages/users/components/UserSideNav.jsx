import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { cc_logo_transparent } from "../../../assets/images/images";
import Accordion from "../../../components/Accordion";
import { UserContext } from "../../../contexts/UserContext";

const UserSideNav = () => {
  const { user, setUser } = useContext(UserContext);
  console.log(user);

  return (
    <>
      <aside className="bg-[var(--color-neutral-600)] text-[var(--color-neutral-white)] flex flex-col p-6 gap-6">
        <Link to="/" className="grid grid-cols-[auto_1fr] gap-2 items-center">
          <img src={cc_logo_transparent} alt="cc_logo" className="w-10" />
          <span className="font-bold text-[1.3rem]">Court Control</span>
        </Link>
        <div>
          <Link className="grid grid-cols-[auto_1fr] gap-2 items-center">
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
          </h3>
          <Link className="material-symbols-outlined text-[1.5rem]">add</Link>
        </div>
        <Accordion />
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
