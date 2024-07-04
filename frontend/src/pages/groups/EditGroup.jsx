import React, { useContext, useEffect, useState } from "react";
import FormModal, { FormSection } from "../../components/FormModal";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const EditGroup = ({ show, setShow, onEditGroup }) => {
  const { groupId } = useParams();
  const { user } = useContext(UserContext);
  const groups = user.groups;
  const [currentGroup, setCurrentGroup] = useState(null);

  const handleSubmit = () => {};

  useEffect(() => {
    if (groupId) {
      setCurrentGroup(groups.filter((group) => group._id === groupId)[0]);
    }
  }, []);

  return (
    <>
      {currentGroup && (
        <FormModal
          show={show}
          setShow={setShow}
          heading={"Edit Group Details"}
          subheading={currentGroup.name}
        >
          <FormSection title={"Delete group"}>
            <button onClick={() => setShow(false)} className="CTA3">
              Delete
            </button>
          </FormSection>
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
