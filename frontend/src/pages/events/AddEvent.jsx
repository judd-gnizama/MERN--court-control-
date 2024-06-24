import React, { useEffect, useState } from "react";
import FormModal, { FormSection } from "../../components/FormModal";
import Input from "../../components/Input";

const EVENT_TYPES = ["Regular", "Fun Game", "Tournament"];
const EVENT_ICONS = ["event_repeat", "mood", "trophy"];

const AddEvent = ({ show, setShow }) => {
  const [addEventData, setAddEventData] = useState({
    name: "",
    date: {
      startDatetime: "",
      endDatetime: Date.now(),
    },
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
  const handleChangeStartDatetime = (event) => {
    setAddEventData({
      ...addEventData,
      date: { ...addEventData.date, startDatetime: event.target.value },
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
      <FormSection title={"what?"}>
        <Input
          placeholder={"Name"}
          inputValue={addEventData.name}
          setInputValue={handleChangeName}
        />
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
        <label htmlFor="eventDate">
          {addEventData.date.startDatetime}
          <input
            type="datetime-local"
            name="eventDate"
            id="eventDate"
            value={addEventData.date.startDatetime}
            onChange={handleChangeStartDatetime}
            className="bg-black"
            width={"3rem"}
          />
        </label>
      </FormSection>
    </FormModal>
  );
};

export default AddEvent;
