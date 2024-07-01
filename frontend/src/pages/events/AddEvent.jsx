import React, { useEffect, useState } from "react";
import FormModal, { FormSection } from "../../components/FormModal";
import Input from "../../components/Input";
import CustomDatePicker from "../../components/CustomDatePicker";

const EVENT_TYPES = ["Regular", "Fun Game", "Tournament"];
const EVENT_ICONS = ["event_repeat", "mood", "trophy"];

const AddEvent = ({ show, setShow }) => {
  const [addEventData, setAddEventData] = useState({
    name: "",
    date: [
      {
        startDatetime: new Date(),
        endDatetime: new Date(),
      },
    ],
    venue: "",
    eventType: "",
    isDone: false,
    playerTeams: [],
    matches: [],
    description: "",
    scoreboards: [],
  });

  const handleChangeEventType = (event) => {
    setAddEventData({ ...addEventData, eventType: event.target.value });
  };

  const handleChangeName = (name) => {
    setAddEventData({ ...addEventData, name });
  };
  const handleChangeVenue = (venue) => {
    setAddEventData({ ...addEventData, venue });
  };
  const handleChangeStartDatetime = (index) => {
    const eventDate = addEventData.date[index];

    setAddEventData({
      ...addEventData,
      date: [...addEventData.date],
    });
  };

  const handleAddDateTime = () => {
    setAddEventData({
      ...addEventData,
      date: [
        ...addEventData.date,
        {
          startDatetime: new Date(),
          endDatetime: new Date(),
        },
      ],
    });
  };

  useEffect(() => {
    console.log(addEventData);
  }, [addEventData]);

  return (
    <FormModal
      heading={"Event Details"}
      subheading={"Create New"}
      show={show}
      setShow={setShow}
    >
      <Input
        placeholder={"Event Name"}
        inputValue={addEventData.name}
        setInputValue={handleChangeName}
      />
      <FormSection title={"what?"}>
        <div className="flex items-center gap-2">
          {EVENT_TYPES.map((type, index) => (
            <label
              key={index}
              htmlFor={`eventType ${index}`}
              className={`flex-1 flex flex-col items-center p-2 rounded-[3px]  ${
                type === addEventData.eventType
                  ? "bg-[var(--color-primary)]"
                  : "bg-[var(--color-neutral-300)]"
              }`}
            >
              <span className="material-symbols-outlined filled">
                {EVENT_ICONS[index]}
              </span>
              {type}
              <input
                type="radio"
                name="eventType"
                id={`eventType ${index}`}
                value={type}
                onChange={handleChangeEventType}
                className="hidden"
              />
            </label>
          ))}
        </div>
      </FormSection>

      <FormSection title={"where?"}>
        <Input
          placeholder={"Location"}
          inputValue={addEventData.venue}
          setInputValue={handleChangeVenue}
        />
      </FormSection>

      <FormSection title={"when?"}>
        <div className="grid grid-cols-[1fr_1fr_auto_1fr_1fr] gap-2 place-items-center">
          {addEventData.date.map((_date, index) => (
            <CustomDatePicker key={index} />
          ))}
        </div>
        <button
          onClick={handleAddDateTime}
          className="font-bold justify-self-start text-[var(--color-primary)] text-sm"
        >
          Add date / time
        </button>
      </FormSection>
      <FormSection>
        <div className="flex gap-2 justify-end mt-5">
          <button className="CTA">Create Event</button>
          <button className="CTA2">Cancel</button>
        </div>
      </FormSection>
    </FormModal>
  );
};

export default AddEvent;
