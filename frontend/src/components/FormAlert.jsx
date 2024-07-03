import React from "react";

const FormAlert = ({ msg, children }) => {
  return (
    <span className="text-[1.2rem] flex items-center gap-1 text-red-300 col-span-full">
      {msg && <p className="text-left text-[0.75rem]">{`Error:  ${msg}`}</p>}
      <div className="flex flex-col list-disc text-sm">{children}</div>
    </span>
  );
};

export default FormAlert;
