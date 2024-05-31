import React from "react";

const FormAlert = ({ msg }) => {
  return (
    <span className="text-[1.2rem] flex items-center gap-1 text-red-400">
      <ion-icon name="alert-circle-outline"></ion-icon>
      <p className="text-left text-[0.75rem] capitalize">{`Error:  ${msg}`}</p>
    </span>
  );
};

export default FormAlert;
