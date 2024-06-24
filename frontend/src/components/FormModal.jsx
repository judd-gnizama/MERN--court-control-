const FormModal = ({ heading, subheading, children, show, setShow }) => {
  return (
    <div
      className={`fixed bg-gray-500 bg-opacity-70 w-full h-full z-40  top-0 left-0 right-0 bottom-0 centered-element flex justify-center items-center ${
        show ? "" : "hidden"
      }`}
      onClick={() => setShow(false)}
    >
      <div
        className="grid grid-rows-[auto_1fr] bg-[var(--color-neutral-600)] text-[var(--color-neutral-white)] rounded-lg p-6 max-w-2xl min-w-96 max-h-[80%] overflow-y-hidden"
        onClick={(e) => e.stopPropagation()} // stop from exiting
      >
        <FormModalHeader heading={heading} setShow={setShow} />
        <span className="text-sm">{subheading}</span>
        <hr className="border-gray-300 mt-2" />
        <div className="mt-4 overflow-auto grid gap-4">{children}</div>
      </div>
    </div>
  );
};

const FormModalHeader = ({ heading, setShow }) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xl font-bold relative">
        {heading}
        <button
          type="button"
          onClick={() => setShow(false)}
          className="material-symbols-outlined absolute right-0 top-[50%] -translate-y-1/2 text-gray-400"
        >
          close
        </button>
      </span>
    </div>
  );
};

export const FormSection = ({ title, children }) => {
  return (
    <div className="w-full">
      <h2 className="text-sm uppercase font-bold text-[var(--color-neutral-300)]">
        {title}
      </h2>
      <div className="grid gap-2">{children}</div>
    </div>
  );
};

export default FormModal;
