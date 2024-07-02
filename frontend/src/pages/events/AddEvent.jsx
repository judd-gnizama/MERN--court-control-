import React, { useEffect, useState } from "react";
import FormModal, { FormSection } from "../../components/FormModal";
import Input from "../../components/Input";
import MultiDatePicker from "../../components/MultiDatePicker";
import FormAlert from "../../components/FormAlert";

const EVENT_TYPES = ["Regular", "Fun Game", "Tournament"];
const EVENT_ICONS = ["event_repeat", "mood", "trophy"];
const INITIAL_EVENT = {
  name: "",
  date: [
    {
      dateId: Math.floor(Math.random() * Date.now()),
      startDatetime: new Date(Date.now()),
      endDatetime: new Date(Date.now() + 1 * 60 * 60 * 1000),
      isValid: true,
    },
  ],
  venue: "",
  eventType: EVENT_TYPES[0],
  isDone: false,
  playerCap: 20,
  playerTeams: [],
  matches: [],
  description: "",
  scoreboards: [],
};

const AddEvent = ({ show, setShow }) => {
  const [addEventData, setAddEventData] = useState(INITIAL_EVENT);
  const [error, setError] = useState("");

  const handleChangeEventType = (event) => {
    setAddEventData({ ...addEventData, eventType: event.target.value });
  };
  const handleChangeName = (name) => {
    setAddEventData({ ...addEventData, name });
  };
  const handleChangeVenue = (venue) => {
    setAddEventData({ ...addEventData, venue });
  };
  const handleChangeDates = (dates) => {
    setAddEventData({ ...addEventData, date: dates });
  };

  const handleSubmit = () => {
    const { name, date, venue, eventType, playerCap } = addEventData;
    // check for errors
    if (
      !name.trim() ||
      date.length <= 0 ||
      !venue.trim() ||
      !eventType ||
      playerCap <= 0 ||
      !playerCap
    ) {
      setError("All fields are required");
      return null;
    }
    setError("");
    // update backend
    console.log(addEventData);
    try {
    } catch (error) {}
    // clear form content
    // close popup menu
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
        <MultiDatePicker
          initial_date={INITIAL_EVENT.date[0]}
          dates={addEventData.date}
          setDates={handleChangeDates}
        />
      </FormSection>

      <FormSection title={"who?"}>
        <label htmlFor="player-cap" className="flex gap-2 items-center">
          Max Players:
          <input
            type="number"
            id="player-cap"
            name="player-cap"
            min={0}
            value={addEventData.playerCap}
            onChange={(e) =>
              setAddEventData({ ...addEventData, playerCap: e.target.value })
            }
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
          value={addEventData.description}
          onChange={(e) =>
            setAddEventData({ ...addEventData, description: e.target.value })
          }
          rows={5}
          className="p-2 bg-[var(--color-neutral-300)] text-[var(--color-neutral-white)] placeholder:text-white placeholder:opacity-70 rounded-[3px] focus:outline-none"
          spellCheck={false}
        />
      </FormSection>

      <FormSection>
        {error && <FormAlert msg={error} />}
        <div className="flex gap-2 justify-end mt-5">
          <button onClick={handleSubmit} className="CTA">
            Create Event
          </button>
          <button onClick={() => setShow(false)} className="CTA2">
            Cancel
          </button>
        </div>
      </FormSection>
    </FormModal>
  );
};

export default AddEvent;
