import React from "react";

const BackToTop = () => {
  return (
    <>
      <a
        href="#"
        className="flex rounded-full fixed bottom-5 right-5 text-4xl text-[var(--color-neutral-white)] bg-[var(--color-neutral-600)]"
      >
        <ion-icon name="chevron-up-circle-outline"></ion-icon>
      </a>
    </>
  );
};

export default BackToTop;
