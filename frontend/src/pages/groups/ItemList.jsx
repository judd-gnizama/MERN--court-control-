import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ItemList = ({ theaders, tbody, dataKey, dependsOnQueries }) => {
  const SORT_DIRECTIONS = ["unsorted", "ascending", "descending"];

  const [currentSortKey, setCurrentSortKey] = useState(0);
  const [sortDirection, setSortDirection] = useState(0);
  const [filteredHeaders, setFilteredHeaders] = useState([]);
  const [sortedObject, setsortedObject] = useState(tbody);
  const [queryParams, setQueryParams] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

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
      } else if (sortBy === "number") {
        return array.sort((a, b) =>
          direction === "ascending"
            ? a[headerKey] - b[headerKey]
            : b[headerKey] - a[headerKey]
        );
      } else if (sortBy === "date") {
        return array.sort((a, b) => {
          const _a = new Date(a[headerKey]);
          const _b = new Date(b[headerKey]);
          return direction === "ascending" ? _a - _b : _b - _a;
        });
      }
    } else {
      return array;
    }
  };

  const handleSort = (array, headerKey, sortBy) => {
    const direction = headerKey === currentSortKey ? cycleSortDirection() : 1; // if sorting key is new, start with ascending
    const sortedItems = sortArray(array, headerKey, sortBy, direction);
    if (sortedItems) {
      setsortedObject({ ...tbody, [dataKey]: sortedItems });
      setSortDirection(direction);
      setCurrentSortKey(headerKey);
    }
  };

  useEffect(() => {
    const visibleOnly = theaders.filter((item) => item.visible === true);
    setFilteredHeaders(visibleOnly);
    setsortedObject(tbody);
    setQueryParams(Object.fromEntries(searchParams.entries()));
  }, []);

  useEffect(() => {
    setsortedObject(tbody);
    setCurrentSortKey(0);
    setSortDirection(0);
  }, [tbody]);

  return (
    <div className="mt-4 flex flex-col gap-2">
      {tbody && tbody[dataKey].length > 0 ? (
        <>
          <div
            className={`grid grid-cols-${filteredHeaders.length} gap-4 p-2 pr-6 font-bold`}
          >
            {filteredHeaders &&
              filteredHeaders.map((header, index) => (
                <button
                  key={`${header} ${index}`}
                  onClick={() =>
                    handleSort(
                      tbody[dataKey],
                      header.headerKey,
                      header.sortType
                    )
                  }
                  className="flex gap-2 items-center"
                >
                  {header.title}
                  {(sortDirection === 1 || sortDirection === 2) &&
                    header.headerKey === currentSortKey && (
                      <span className="material-symbols-outlined filled text-[0.8em]">
                        {sortDirection === 1
                          ? "arrow_upward"
                          : "arrow_downward"}
                      </span>
                    )}
                </button>
              ))}
          </div>
          <div className="flex flex-col gap-2">
            {sortedObject &&
              sortedObject[dataKey] &&
              sortedObject[dataKey].map((item, itemIdx) => {
                if (item != null) {
                  console.log(item);
                  console.log(queryParams);
                  return (
                    <div
                      key={itemIdx}
                      className={`grid grid-cols-${filteredHeaders.length} p-2 pr-6 border-2 border-[var(--color-neutral-300)] rounded-[3px] relative items-center gap-4 cursor-pointer hover:bg-[var(--color-neutral-300)] transition-colors duration-150`}
                    >
                      {filteredHeaders &&
                        filteredHeaders.map(({ headerKey, sortType }) => (
                          <span
                            key={headerKey}
                            className=" break-words text-ellipsis line-clamp-2"
                          >
                            {sortType === "date"
                              ? new Date(item[headerKey]).toLocaleString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "numeric",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                  }
                                )
                              : item[headerKey]}
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
        </>
      ) : (
        <span>{`No ${dataKey} to show`}</span>
      )}
    </div>
  );
};

export default ItemList;
