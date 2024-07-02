import React, { useEffect, useState } from "react";
import FormModal, { FormSection } from "../../components/FormModal";
import Input from "../../components/Input";
import CustomDatePicker from "../../components/CustomDatePicker";
import Tag from "../users/components/Tag";

const EVENT_TYPES = ["Regular", "Fun Game", "Tournament"];
const EVENT_ICONS = ["event_repeat", "mood", "trophy"];
const INITIAL_EVENT = {
  name: "",
  date: [
    {
      startDatetime: new Date(),
      endDatetime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
    },
  ],
  venue: "",
  eventType: EVENT_TYPES[0],
  isDone: false,
  playerTeams: [],
  matches: [],
  description: "",
  scoreboards: [],
};

const AddEvent = ({ show, setShow }) => {
  const [addEventData, setAddEventData] = useState(INITIAL_EVENT);

  const handleChangeEventType = (event) => {
    setAddEventData({ ...addEventData, eventType: event.target.value });
  };

  const handleChangeName = (name) => {
    setAddEventData({ ...addEventData, name });
  };
  const handleChangeVenue = (venue) => {
    setAddEventData({ ...addEventData, venue });
  };
  const handleChangeStartDatetime = ({ _startDate, _endDate }) => {};

  const handleAddDateTime = () => {
    setAddEventData({
      ...addEventData,
      date: [...addEventData.date, INITIAL_EVENT.date[0]],
    });
  };

  const handleDeleteDate = (indexToDelete) => {
    console.log(indexToDelete);
    console.log(addEventData.date);
    const newDates = addEventData.date.filter(
      (_date, index) => index !== parseInt(indexToDelete)
    );
    setAddEventData({ ...addEventData, date: newDates });
  };

  // useEffect(() => {
  //   console.log(addEventData);
  // }, [addEventData]);

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
        <div className="grid grid-cols-3 gap-2">
          {EVENT_TYPES.map((type, index) => (
            <label
              key={index}
              htmlFor={`eventType ${index}`}
              className={`flex-1 flex flex-col text-nowrap items-center p-2 rounded-[3px]  ${
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
        <div className="grid grid-cols-[1fr_.75fr_auto_.75fr_1fr_auto] gap-2 place-items-center">
          {addEventData.date.map((_date, index) => (
            <>
              <CustomDatePicker
                key={index}
                dates={addEventData.date}
                setDates={(e) => handleChangeStartDatetime(e.target.key)}
              />
              <button
                type="button"
                className="material-symbols-outlined text-gray-400"
              >
                close
              </button>
            </>
          ))}
        </div>
        <button
          onClick={handleAddDateTime}
          className="font-bold justify-self-start text-[var(--color-primary)] text-sm"
        >
          Add date / time
        </button>
      </FormSection>

      <FormSection title={"who?"}>
        <label htmlFor="player-cap" className="flex gap-2 items-center">
          Max Players:
          <input
            type="number"
            id="player-cap"
            name="player-cap"
            className="font-bold p-2 bg-[var(--color-neutral-300)] text-[var(--color-neutral-white)] placeholder:text-white max-w-24 pr-2 rounded-[3px] focus:outline-none"
          />
        </label>
        {/* <Tag title={"Event Player Groups"} description={"e.g. Group A"} inputValue={} setInputValue={} /> */}
      </FormSection>

      <FormSection title={"Event description"}>
        <textarea
          name="event-description"
          id="event-description"
          placeholder="Enter description"
          rows={5}
          className="p-2 bg-[var(--color-neutral-300)] text-[var(--color-neutral-white)] placeholder:text-white placeholder:opacity-70 rounded-[3px] focus:outline-none"
          spellCheck={false}
        />
      </FormSection>

      <FormSection>
        <div className="flex gap-2 justify-end mt-5">
          <button className="CTA">Create Event</button>
          <button onClick={() => setShow(false)} className="CTA2">
            Cancel
          </button>
        </div>
      </FormSection>
    </FormModal>
  );
};

export default AddEvent;
