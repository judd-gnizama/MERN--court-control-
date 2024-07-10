import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ItemList = ({ theaders, tbody, dataKey }) => {
  const SORT_DIRECTIONS = ["unsorted", "ascending", "descending"];
  const _theaders = [
    {
      title: "Name",
      headerKey: "name",
      sortType: "alphabetical",
      visible: true,
    },
    {
      title: "Description",
      headerKey: "description",
      sortType: "alphabetical",
      visible: true,
    },
    {
      title: "Type",
      headerKey: "eventType",
      sortType: "alphabetical",
      visible: true,
    },
    {
      title: "Venue",
      headerKey: "venue",
      sortType: "alphabetical",
      visible: false,
    },
    {
      title: "Player Cap",
      headerKey: "playerCap",
      sortType: "number",
      visible: false,
    },
    {
      title: "Scheduled Date",
      headerKey: "earliestDate",
      sortType: "date",
      visible: true,
    },
  ];
  const [currentSortKey, setCurrentSortKey] = useState(0);
  const [sortDirection, setSortDirection] = useState(0);
  const [filteredHeaders, setFilteredHeaders] = useState([]);
  const [sortedGroup, setSortedGroup] = useState(tbody);

  const cycleSortDirection = () => {
    const direction =
      sortDirection <= SORT_DIRECTIONS.length - 2 ? sortDirection + 1 : 0;
    return direction;
  };

  const sortArray = (_array, headerKey, sortBy, _direction) => {
    const array = [..._array];
    const direction = SORT_DIRECTIONS[_direction];
    if (!direction || direction === "unsorted") {
      return array;
    }
    if (sortBy && direction) {
      if (sortBy === "alphabetical") {
        return array.sort((a, b) =>
          direction === "ascending"
            ? a[headerKey].localeCompare(b[headerKey])
            : b[headerKey].localeCompare(a[headerKey])
        );
      }
      if (sortBy === "number" || sortBy === "date") {
        return array.sort((a, b) =>
          direction === "ascending"
            ? a[headerKey] - b[headerKey]
            : b[headerKey] - a[headerKey]
        );
      }
    } else {
      return array;
    }
  };

  const handleSort = (array, headerKey, sortBy) => {
    const direction = headerKey === currentSortKey ? cycleSortDirection() : 1; // if sorting key is new, start with ascending
    const sortedEvents = sortArray(array, headerKey, sortBy, direction);
    if (sortedEvents) {
      setSortedGroup({ ...tbody, [dataKey]: sortedEvents });
      setSortDirection(direction);
      setCurrentSortKey(headerKey);
    }
  };

  useEffect(() => {
    const visibleOnly = _theaders.filter((item) => item.visible === true);
    setFilteredHeaders(visibleOnly);
    setSortedGroup(tbody);
  }, []);

  useEffect(() => {
    setSortedGroup(tbody);
    setCurrentSortKey(0);
    setSortDirection(0);
  }, [tbody]);

  return (
    <div className="mt-4 flex flex-col gap-2">
      <div
        className={`grid grid-cols-${filteredHeaders.length} gap-4 p-2 font-bold`}
      >
        {filteredHeaders &&
          filteredHeaders.map((header, index) => (
            <button
              key={`${header} ${index}`}
              onClick={() =>
                handleSort(tbody[dataKey], header.headerKey, header.sortType)
              }
              className="flex gap-2 items-center"
            >
              {header.title}
              {(sortDirection === 1 || sortDirection === 2) &&
                header.headerKey === currentSortKey && (
                  <span className="material-symbols-outlined filled text-[0.8em]">
                    {sortDirection === 1 ? "arrow_upward" : "arrow_downward"}
                  </span>
                )}
            </button>
          ))}
      </div>
      <div className="flex flex-col gap-2">
        {sortedGroup &&
          sortedGroup[dataKey] &&
          sortedGroup[dataKey].map((item, itemIdx) => {
            if (item != null) {
              return (
                <div
                  key={itemIdx}
                  className={`grid grid-cols-${filteredHeaders.length} p-2 border-2 border-[var(--color-neutral-300)] rounded-[3px] relative items-center gap-4 cursor-pointer hover:bg-[var(--color-neutral-300)] transition-colors duration-150`}
                >
                  {filteredHeaders &&
                    filteredHeaders.map(({ headerKey }) => (
                      <span
                        key={headerKey}
                        className=" break-words text-ellipsis line-clamp-2"
                      >
                        {item[headerKey]}
                      </span>
                    ))}
                  <span className="material-symbols-outlined absolute top-[50%] -translate-y-1/2 right-4">
                    chevron_right
                  </span>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default ItemList;
