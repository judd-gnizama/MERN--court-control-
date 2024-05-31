import React from "react";

const UserSectionCard = ({ title, description }) => {
  return (
    <div className="bg-[var(--color-neutral-white)] text-black rounded-[3px] p-2 flex flex-col text-center justify-center h-[15rem]">
      <span className="material-symbols-outlined text-[3rem]">
        sports_tennis
      </span>
      <h3 className="text-base font-bold">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default UserSectionCard;
