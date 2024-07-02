import React, { forwardRef, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import FormAlert from "./FormAlert";

const CustomDatePicker = ({ dates, setDates }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [error, setError] = useState("");

  const handleChangeStartDate = (newDate) => {
    const _startDate = startDate;
    _startDate.setMonth(newDate.getMonth());
    _startDate.setDate(newDate.getDate());
    _startDate.setFullYear(newDate.getFullYear());
    if (isValidDates()) {
      setStartDate(_startDate);
      setDates({ _startDate });
      setError("");
    } else {
      setError("End Datetime cannot be before Start Datetime");
    }
  };
  const handleChangeStartTime = (newTime) => {
    const _startDate = startDate;
    _startDate.setTime(newTime.getTime());
    if (isValidDates()) {
      setStartDate(_startDate);
      setError("");
    } else {
      setError("End Datetime cannot be before Start Datetime");
    }
  };
  const handleChangeEndDate = (newDate) => {
    const _endDate = endDate;
    _endDate.setMonth(newDate.getMonth());
    _endDate.setDate(newDate.getDate());
    _endDate.setFullYear(newDate.getFullYear());
    if (isValidDates()) {
      setEndDate(_endDate);
      setDates({ _endDate });
      setError("");
    } else {
      setError("End Datetime cannot be before Start Datetime");
    }
  };
  const handleChangeEndTime = (newTime) => {
    const _endDate = endDate;
    _endDate.setTime(newTime.getTime());
    if (isValidDates()) {
      setEndDate(_endDate);
      setError("");
    } else {
      setError("End Datetime cannot be before Start Datetime");
    }
  };
  const isValidDates = () => {
    return startDate < endDate;
  };

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="px-3 py-2 rounded-[3px] bg-[var(--color-neutral-300)] w-full text-nowrap"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));

  return (
    <>
      <div className="remove-tab-loop w-full">
        <DatePicker
          selected={startDate}
          onChange={handleChangeStartDate}
          customInput={<CustomInput />}
          dateFormat={"MMM dd yyyy"}
        />
      </div>
      <div className="remove-tab-loop w-full">
        <DatePicker
          selected={startDate}
          onChange={handleChangeStartTime}
          customInput={<CustomInput />}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          dateFormat={"h:mm aa"}
        />
      </div>
      <p>to</p>
      <div className="remove-tab-loop w-full">
        <DatePicker
          selected={endDate}
          onChange={handleChangeEndTime}
          customInput={<CustomInput />}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          dateFormat={"h:mm aa"}
        />
      </div>
      <div className="remove-tab-loop w-full">
        <DatePicker
          selected={endDate}
          onChange={handleChangeEndDate}
          customInput={<CustomInput />}
          dateFormat={"MMM dd yyyy"}
        />
      </div>
      {/* <button onClick={handleDeleteDate} type="button" className="material-symbols-outlined text-gray-400">
        close
      </button> */}
      {error && <FormAlert msg={error} />}
    </>
  );
};

export default CustomDatePicker;
