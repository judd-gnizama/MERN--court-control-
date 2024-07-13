import React, { useState } from "react";

const Filters = () => {
  const _FILTER_FIELDS = [
    {
      fieldName: "Type",
      varName: "eventType",
      subfields: ["Any", "Regular", "Fun Game", "Tournament"],
      selected: "Any",
    },
    {
      fieldName: "Scheduled Date",
      varName: "earliestDate",
      subfields: [
        "Any",
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
      selected: "Any",
    },
    {
      fieldName: "Status",
      varName: "eventStatus",
      subfields: ["Any", "Scheduled", "Ongoing", "Completed", "Cancelled"],
      selected: "Any",
    },
  ];
  const [selectedFilters, setSelectedFilters] = useState([..._FILTER_FIELDS]);

  const handleFilter = (value) => {
    const [fieldName, selected] = value.split("-");
    const newSelectedFilters = selectedFilters.map((filter) => {
      if (filter.fieldName === fieldName) {
        filter.selected = selected;
      }
      return filter;
    });
    setSelectedFilters(newSelectedFilters);
  };

  return (
    <div className="bg-[var(--color-neutral-300)] p-4 rounded-[3px] border border-transparent">
      <h2 className="font-bold">Filter Options</h2>
      <ul className="flex gap-2">
        {selectedFilters &&
          selectedFilters.map(
            ({ fieldName, varName, subfields, selected }, index) => (
              <>
                <label
                  key={`field_${index}`}
                  htmlFor={`filter_${varName}`}
                  className="flex flex-col"
                >
                  {fieldName}
                  <select
                    name={`filter_${varName}`}
                    id={`filter_${varName}`}
                    className="bg-[var(--color-neutral-600)] focus:outline-none p-1 rounded-[3px]"
                    onChange={(e) => handleFilter(e.target.value)}
                  >
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
                </label>
              </>
            )
          )}
      </ul>
    </div>
  );
};

export default Filters;
