import React, { useState } from "react";
import UserLayout from "../users/UserLayout";
import Tag from "../users/components/Tag";
import FormAlert from "../../components/FormAlert";
import { Link, useNavigate } from "react-router-dom";
import { addNewGroup } from "../../controllers/groupsControllers";

const AddGroup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [groupData, setGroupData] = useState({
    name: "",
    tags: [],
  });

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
          <div className="relative">
            <label htmlFor="group-name" className="label-in-input">
              Group Name:
            </label>
            <input
              type="text"
              name="group-name"
              id="group-name"
              value={groupData.name}
              onChange={(event) =>
                setGroupData({ ...groupData, name: event.target.value })
              }
              className="input-light input-with-label w-full"
              autoFocus
            />
          </div>
          <span className="section-break"></span>
          <Tag
            title={"Player Level Tags"}
            description={"e.g.  Beginner"}
            groupData={groupData}
            setGroupData={setGroupData}
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
