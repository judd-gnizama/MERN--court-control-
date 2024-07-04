import React, { useState } from "react";
import UserLayout from "../users/UserLayout";
import Tag from "../users/components/Tag";
import FormAlert from "../../components/FormAlert";
import { Link, useNavigate } from "react-router-dom";
import { addNewGroup } from "../../controllers/groupsControllers";
import Input from "../../components/Input";

const AddGroup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [groupData, setGroupData] = useState({
    name: "",
    tags: [],
  });

  const handleChangeName = (newName) => {
    setGroupData({ ...groupData, name: newName });
  };

  const handleChangeTags = (tags) => {
    setGroupData({ ...groupData, tags });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      addNewGroup(groupData);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <UserLayout>
      <div className="flex flex-col gap-4 bg-[var(--color-neutral-600)] p-4 rounded-[3px] max-w-xl">
        <h3 className="text-sm font-bold text-[var(--color-neutral-100)]">
          GROUP DETAILS
        </h3>
        <form className="grid gap-4">
          <Input
            labelText={"Group Name:"}
            placeholder={"Enter Group Name"}
            labelClassName={"flex flex-col"}
            inputValue={groupData.name}
            setInputValue={handleChangeName}
          />
          <span className="section-break"></span>
          <Tag
            labeltext={"Player Level Tags"}
            placeholder={"e.g.  Beginner"}
            inputValue={groupData.tags}
            setInputValue={handleChangeTags}
          />
          {error && <FormAlert msg={error} />}
          <div className="flex justify-end gap-4">
            <button type="button" onClick={handleSubmit} className="CTA">
              Create
            </button>
            <Link to="/dashboard" type="button" className="CTA2">
              Discard
            </Link>
          </div>
        </form>
      </div>
    </UserLayout>
  );
};

export default AddGroup;
