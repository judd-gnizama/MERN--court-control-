import React, { useState } from "react";

const FilterOptions = () => {
  const _FILTER_FIELDS = [
    {
      fieldName: "Type",
      varName: "eventType",
      subfields: ["Regular", "Fun Game", "Tournament"],
      selected: [],
    },
    {
      fieldName: "Scheduled Date",
      varName: "earliestDate",
      subfields: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      selected: [],
    },
    {
      fieldName: "Status",
      varName: "eventStatus",
      subfields: ["Scheduled", "Ongoing", "Completed", "Cancelled"],
      selected: [],
    },
  ];
  const [selectedFilters, setSelectedFilters] = useState([..._FILTER_FIELDS]);

  const handleFilter = (event) => {
    const [fieldName, choice] = event.target.value.split("-");
    const newFilters = selectedFilters.map((filter) => {
      if (filter.fieldName === fieldName) {
        if (!filter.selected.includes(choice)) {
          filter.selected.push(choice);
        }
      }
      return filter;
    });
    setSelectedFilters(newFilters);
  };

  const handleRemove = (fieldName) => {
    console.log(fieldName);
  };

  const handleRemoveAll = () => {
    const newFilters = selectedFilters.map((filter) => ({
      ...filter,
      selected: [],
    }));
    setSelectedFilters(newFilters);
  };

  return (
    <div className="bg-[var(--color-neutral-300)] p-4 rounded-[3px] border border-transparent">
      <h2 className="font-bold">Filter Options</h2>
      <ul className="flex gap-2">
        {_FILTER_FIELDS &&
          _FILTER_FIELDS.map(({ fieldName, varName, subfields }, index) => (
            <select
              key={`field_${index}`}
              name={`filter_${varName}`}
              id={`filter_${varName}`}
              className="bg-black focus:outline-none p-1 rounded-[3px]"
              value={fieldName}
              onChange={handleFilter}
            >
              <option value={fieldName} defaultChecked hidden>
                {fieldName}
              </option>
              {subfields &&
                subfields.map((subfield, index) => (
                  <option
                    key={`subfield_${index}`}
                    value={`${fieldName}-${subfield}`}
                  >
                    {subfield}
                  </option>
                ))}
            </select>
          ))}
      </ul>
      <div className="mt-3 flex flex-col gap-1">
        <h2>
          Selected Filters (
          {selectedFilters && (
            <button onClick={handleRemoveAll} className="font-bold">
              Remove Filters
            </button>
          )}
          ){" "}
        </h2>
        <ul className="flex gap-2 break-words flex-wrap">
          {selectedFilters &&
            selectedFilters.map((filter) => {
              if (filter.selected.length > 0) {
                const selectedFilterString = filter.selected.join(" or ");
                return (
                  <li className="inline-flex gap-1 bg-[var(--color-tertiary)] rounded-full px-4 py-2">
                    {`${filter.fieldName}: ${selectedFilterString} `}
                    <button
                      onClick={() => handleRemove(filter.fieldName)}
                      className="material-symbols-outlined filled"
                    >
                      close
                    </button>
                  </li>
                );
              }
            })}
        </ul>
      </div>
    </div>
  );
};

export default FilterOptions;
