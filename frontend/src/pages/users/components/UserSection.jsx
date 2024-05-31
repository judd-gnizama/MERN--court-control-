import React from "react";

const UserSection = ({ title, children, start, end }) => {
  return (
    <div className="w-full bg-[var(--color-neutral-600)] p-4 rounded-[3px]">
      <h2 className="text-sm font-bold text-[var(--color-neutral-100)]">
        {title}
      </h2>
      <div className="">{children}</div>
    </div>
  );
};

export default UserSection;
