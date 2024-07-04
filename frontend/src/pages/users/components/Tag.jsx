import React, { useState } from "react";
import FormAlert from "../../../components/FormAlert";

const Tag = ({ title, description, inputValue, setInputValue }) => {
  const [tags, setTags] = useState(inputValue);
  const [currentTag, setCurrentTag] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      const _tag = event.target.value.trim();
      const index = tags?.indexOf(_tag);
      if (index === -1) {
        setTags([...tags, _tag]);
        setInputValue([...tags, _tag]);
        setError("");
        setCurrentTag("");
      } else {
        setError("Already on the list");
      }
    }
  };

  const handleDelete = (tagToDelete) => {
    const newTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(newTags);
    setInputValue(newTags);
  };

  const handleDeleteAll = () => {
    setCurrentTag("");
    setTags([]);
    setInputValue([]);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm">{title}</label>
      <div className="flex gap-1 border-none bg-[var(--color-neutral-300)] text-[var(--color-neutral-white)]text-[0.8rem] p-2 flex-wrap rounded-[3px] relative">
        {tags?.map((tag, index) => (
          <li
            key={index}
            className="flex items-center gap-1 p-1 px-2 bg-[var(--color-primary)] rounded-full text-[var(--color-neutral-white)] font-bold"
          >
            {tag}
            <a
              className="material-symbols-outlined text-[0.6rem] bg-[var(--color-secondary)] rounded-full p-[0.1rem] cursor-pointer"
              onClick={() => handleDelete(tag)}
            >
              close
            </a>
          </li>
        ))}
        <input
          type="text"
          name="tag"
          id="tag"
          placeholder={description}
          value={currentTag}
          onChange={(event) => setCurrentTag(event.target.value)}
          onKeyUp={handleSubmit}
          className="border-none focus:outline-none flex-1 bg-[var(--color-neutral-300)] text-[var(--color-neutral-white)] placeholder:text-white placeholder:opacity-70 font-bold pl-2"
        />
      </div>
      {error && <FormAlert msg={error} />}
      <a
        className="text-[0.8rem] cursor-pointer w-fit text-[var(--color-primary)] font-bold self-end"
        onClick={() => handleDeleteAll()}
      >
        Remove All
      </a>
    </div>
  );
};

export default Tag;
