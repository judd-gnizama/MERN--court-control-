import React, { useState } from "react";

const Tag = ({ title, description, groupData, setGroupData }) => {
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");

  const handleSubmit = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      const _tag = event.target.value.trim();
      const index = tags?.indexOf(_tag);
      if (index === -1) {
        setTags([...tags, _tag]);
        setGroupData({ ...groupData, tags: [...tags, _tag] });
      }
      setCurrentTag("");
    }
  };

  const handleDelete = (tagToDelete) => {
    const newTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(newTags);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 border text-black bg-white text-[0.8rem] pt-8 p-2 pl-[1rem] flex-wrap rounded-[3px] relative">
        <label className="label-in-input top-0.5 left-0.5">{title}</label>
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
          className="border-none focus:outline-none flex-1"
        />
      </div>
      <a
        className="text-[0.8rem] cursor-pointer w-fit text-[var(--color-primary)] font-bold self-end"
        onClick={() => setTags([])}
      >
        Remove All
      </a>
    </div>
  );
};

export default Tag;
