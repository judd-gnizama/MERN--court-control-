import React from "react";

const BackToTop = () => {
  return (
    <div className="">
      <a
        href="#"
        className="flex rounded-lg p-2 fixed bottom-5 right-5 text-3xl text-[var(--color-neutral-white)] bg-[var(--color-neutral-600)] hover:translate-y-[-4px] transition-transform ease-in-out"
      >
        <ion-icon name="arrow-up-outline"></ion-icon>
      </a>
    </div>
  );
};

export default BackToTop;
