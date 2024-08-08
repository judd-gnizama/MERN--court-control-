import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());
  const [queries, setQueries] = useState(queryParams);
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
  const [selectedFilters, setSelectedFilters] = useState(_FILTER_FIELDS);

  const handleFilter = (event) => {
    const value = event.target.value;
    const [varName, selected] = value.split("-");
    if (selected !== "Any") {
      setSearchParams({ ...queries, [varName]: value });
      setQueries({ ...queries, [varName]: value });
    } else {
      const _temp = { ...queries };
      delete _temp[varName];
      setSearchParams(_temp);
      setQueries(_temp);
    }
    const newSelectedFilters = selectedFilters.map((filter) => {
      if (filter.varName === varName) {
        filter.selected = value;
      }
      return filter;
    });
    setSelectedFilters(newSelectedFilters);
  };

  useEffect(() => {
    const newFilters = _FILTER_FIELDS.map((field) => ({
      ...field,
      selected: queries[field.varName],
    }));
    setSelectedFilters(newFilters);
  }, [queries]);

  return (
    <div className="bg-[var(--color-neutral-300)] p-4 rounded-[3px] border border-transparent">
      <div className="flex gap-2">
        <h2 className="font-bold">Filter Options</h2>
        <button className="font-normal underline text-[0.8rem]">
          Reset Filters
        </button>
      </div>

      <ul className="flex gap-2">
        {selectedFilters &&
          selectedFilters.map(
            ({ fieldName, varName, subfields, selected }, index) => (
              <div key={`field_${index}`}>
                <label htmlFor={`filter_${varName}`} className="flex flex-col">
                  {fieldName}
                  <select
                    name={`filter_${varName}`}
                    id={`filter_${varName}`}
                    className="bg-[var(--color-neutral-600)] focus:outline-none p-1 rounded-[3px]"
                    value={selected}
                    onChange={handleFilter}
                  >
                    {subfields &&
                      subfields.map((subfield, index) => (
                        <option
                          key={`subfield_${index}`}
                          value={`${varName}-${subfield}`}
                        >
                          {subfield}
                        </option>
                      ))}
                  </select>
                </label>
              </div>
            )
          )}
      </ul>
    </div>
  );
};

export default Filters;
