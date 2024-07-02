import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import FormAlert from "./FormAlert";

const MultiDatePicker = ({ initial_date, dates, setDates }) => {
  const getNewDate = () => {
    return {
      dateId: Math.floor(Math.random() * Date.now()),
      startDatetime: new Date(Date.now()),
      endDatetime: new Date(Date.now() + 1 * 60 * 60 * 1000),
      isValid: true,
    };
  };

  const handleChangeDates = ({
    dateId,
    startDate,
    startTime,
    endDate,
    endTime,
  }) => {
    const dateIndex = dates.findIndex((date) => date.dateId === dateId);
    if (dateIndex !== -1) {
      const _date = dates[dateIndex];
      if (startDate) {
        _date.startDatetime.setMonth(startDate.getMonth());
        _date.startDatetime.setDate(startDate.getDate());
        _date.startDatetime.setFullYear(startDate.getFullYear());
      }
      if (startTime) {
        _date.startDatetime.setTime(startTime.getTime());
      }
      if (endDate) {
        _date.endDatetime.setMonth(endDate.getMonth());
        _date.endDatetime.setDate(endDate.getDate());
        _date.endDatetime.setFullYear(endDate.getFullYear());
      }
      if (endTime) {
        _date.endDatetime.setTime(endTime.getTime());
      }
      if (_date.startDatetime < _date.endDatetime) {
        _date.isValid = true;
        setDates(
          dates.map((date) => {
            if (date.dateId === dateId) {
              return _date;
            } else {
              return date;
            }
          })
        );
      } else {
        _date.isValid = false;
      }
      checkAllDates();
    }
  };

  const checkAllDates = () => {
    setDates(
      dates.map((date) => {
        if (date.startDatetime < date.endDatetime) {
          return { ...date, isValid: true };
        } else {
          return { ...date, isValid: false };
        }
      })
    );
  };

  const handleAddDateTime = () => {
    setDates([...dates, getNewDate()]);
  };

  const handleDeleteDate = (dateId) => {
    setDates(dates.filter((date) => date.dateId !== dateId));
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
      <div className="grid grid-cols-[1fr_.75fr_auto_.75fr_1fr_auto] gap-2 place-items-center">
        {dates.map((_date, index) => (
          <>
            <>
              <div className="remove-tab-loop w-full">
                <DatePicker
                  selected={_date.startDatetime}
                  onChange={(newDate) =>
                    handleChangeDates({
                      dateId: _date.dateId,
                      startDate: newDate,
                    })
                  }
                  customInput={<CustomInput />}
                  dateFormat={"MMM dd yyyy"}
                />
              </div>
              <div className="remove-tab-loop w-full">
                <DatePicker
                  selected={_date.startDatetime}
                  onChange={(newDate) =>
                    handleChangeDates({
                      dateId: _date.dateId,
                      startTime: newDate,
                    })
                  }
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
                  selected={_date.endDatetime}
                  onChange={(newDate) =>
                    handleChangeDates({
                      dateId: _date.dateId,
                      endTime: newDate,
                    })
                  }
                  customInput={<CustomInput />}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  dateFormat={"h:mm aa"}
                />
              </div>
              <div className="remove-tab-loop w-full">
                <DatePicker
                  selected={_date.endDatetime}
                  onChange={(newDate) =>
                    handleChangeDates({
                      dateId: _date.dateId,
                      endDate: newDate,
                    })
                  }
                  customInput={<CustomInput />}
                  dateFormat={"MMM dd yyyy"}
                />
              </div>
            </>
            <button
              type="button"
              onClick={() => handleDeleteDate(_date.dateId)}
              className="material-symbols-outlined text-gray-400"
            >
              close
            </button>
            {!_date.isValid && (
              <FormAlert msg={"End Datetime cannot be before Start Datetime"} />
            )}
          </>
        ))}
      </div>
      <button
        onClick={handleAddDateTime}
        className="font-bold justify-self-start text-[var(--color-primary)] text-sm"
      >
        Add date / time
      </button>
    </>
  );
};

export default MultiDatePicker;
