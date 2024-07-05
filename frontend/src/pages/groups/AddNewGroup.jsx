import React, { useContext, useEffect, useState } from "react";
import FormModal, { FormSection } from "../../components/FormModal";
import Input from "../../components/Input";
import Tag from "../users/components/Tag";
import {
  addNewGroup,
  getUserGroups,
} from "../../controllers/groupsControllers";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import FormAlert from "../../components/FormAlert";

const AddNewGroup = ({ show, setShow, onAdd }) => {
  const [currentGroup, setCurrentGroup] = useState({ name: "", tags: [] });
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const resetCurrentGroup = () => {
    setCurrentGroup({ name: "", tags: [] });
  };

  const _getUsers = async () => {
    const groups = await getUserGroups();
    setUser({ ...user, groups });
  };

  const validateForm = () => {
    const { name, tags } = currentGroup;
    const _errors = [];
    // check for errors
    if (!name.trim()) {
      _errors.push("Name. Must not be empty.");
    }
    if (tags.length <= 0) {
      _errors.push("Player Tags. Must not be empty.");
    }
    return _errors;
  };

  const handleSubmit = async () => {
    const _errors = validateForm();
    if (_errors.length <= 0) {
      try {
        // submit changes
        await addNewGroup(currentGroup);
        // update usercontext
        await _getUsers();
        // close modal
        setShow(false);
        resetCurrentGroup();
        navigate("/dashboard");
      } catch (error) {
        console.error(error);
        setErrors([...errors, error.message]);
      }
    } else {
      setErrors(_errors);
    }
  };

  useEffect(() => {
    if (!show) {
      resetCurrentGroup();
      setErrors([]);
    }
  }, [show]);

  return (
    <FormModal
      heading={"Create New Group"}
      show={show}
      setShow={setShow}
      maxWidth={"max-w-min"}
    >
      <FormSection title={"Group Name"}>
        <Input
          placeholder={"Enter Group Name"}
          labelClassName={"flex flex-col"}
          inputValue={currentGroup.name}
          setInputValue={(newName) =>
            setCurrentGroup({ ...currentGroup, name: newName })
          }
        />
      </FormSection>
      <FormSection title={"Player Tags"}>
        <Tag
          placeholder={"e.g.  Beginner"}
          inputValue={currentGroup.tags}
          setInputValue={(newTags) =>
            setCurrentGroup({ ...currentGroup, tags: newTags })
          }
        />
      </FormSection>
      {errors.length > 0 && (
        <FormAlert>
          <h2>Errors:</h2>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </FormAlert>
      )}
      <div className="flex gap-2 justify-end mt-5">
        <button onClick={handleSubmit} className="CTA">
          Create
        </button>
        <button onClick={() => setShow(false)} className="CTA2">
          Cancel
        </button>
      </div>
    </FormModal>
  );
};

export default AddNewGroup;
