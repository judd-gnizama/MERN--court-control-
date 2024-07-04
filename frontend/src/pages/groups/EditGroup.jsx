import React, { useContext, useEffect, useState } from "react";
import FormModal, { FormSection } from "../../components/FormModal";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import Input from "../../components/Input";
import Tag from "../users/components/Tag";
import { deleteGroup, updateGroup } from "../../controllers/groupsControllers";
import FormAlert from "../../components/FormAlert";

const EditGroup = ({ show, setShow, onEditGroup }) => {
  const { groupId } = useParams();
  const { user, setUser } = useContext(UserContext);
  const groups = user.groups;
  const [currentGroup, setCurrentGroup] = useState(null);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const resetCurrentGroup = () => {
    setCurrentGroup(groups.filter((group) => group._id === groupId)[0]);
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

  const updateUserContext = (update) => {
    if (update === "update") {
      setUser({
        ...user,
        groups: user.groups.map((group) => {
          if (group._id === groupId) {
            return currentGroup;
          } else {
            return group;
          }
        }),
      });
    } else if (update === "delete") {
      setUser({
        ...user,
        groups: user.groups.filter((group) => group._id !== groupId),
      });
    }
  };

  const handleSubmit = async () => {
    const _errors = validateForm();
    if (_errors.length <= 0) {
      try {
        // submit changes
        await updateGroup({
          groupId,
          newGroup: { name: currentGroup.name, tags: currentGroup.tags },
        });
        // update usercontext
        updateUserContext("update");
        // reset form
        resetCurrentGroup();
        // close modal
        setShow(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      setErrors(_errors);
    }
  };

  const handleDelete = async () => {
    try {
      setCurrentGroup(null);
      await deleteGroup({ groupId });
      updateUserContext("delete");
      setShow(false);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (groupId) {
      resetCurrentGroup();
    }
  }, []);

  useEffect(() => {
    if (!show) {
      resetCurrentGroup();
      setErrors([]);
    }
  }, [show]);

  return (
    <>
      {currentGroup && (
        <FormModal
          show={show}
          setShow={setShow}
          heading={"Edit Group Details"}
          subheading={currentGroup.name}
        >
          <FormSection title={"Group Name"}>
            <Input
              // labelText={"Group Name:"}
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

          <FormSection title={"Delete group"}>
            <button onClick={handleDelete} className="CTA3 w-fit">
              Delete Group
            </button>
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
              Update Group
            </button>
            <button onClick={() => setShow(false)} className="CTA2">
              Discard
            </button>
          </div>
        </FormModal>
      )}
    </>
  );
};

export default EditGroup;
