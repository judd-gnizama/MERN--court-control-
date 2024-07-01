import React from "react";

const FormAlert = ({ msg }) => {
  return (
    <span className="text-[1.2rem] flex items-center gap-1 text-red-300 col-span-full">
      <p className="text-left text-[0.75rem]">{`Error:  ${msg}`}</p>
    </span>
  );
};

export default FormAlert;
