import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroupById } from "../../controllers/groupsControllers";

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
      visible: true,
    },
    
    {
      title: "Player Cap",
      headerKey: "playerCap",
      sortType: "number",
      visible: true,
    },
  ];
  const [sortDirection, setSortDirection] = useState(0);
  const [filteredHeaders, setFilteredHeaders] = useState([]);
  const [sortedGroup, setSortedGroup] = useState(tbody);
  const {groupId} = useParams();

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
      if (sortBy === "number") {
        return array.sort((a, b) =>
          direction === "ascending" ? a[headerKey] - b[headerKey] : b[headerKey] - a[headerKey]
        );
      }
    } else {
      return array;
    }
  };

  const handleSort = (array, keyToSort, sortBy) => {
    const direction = cycleSortDirection();
    const sortedEvents = sortArray(array, keyToSort, sortBy, direction);
    if (sortedEvents) {
      setSortedGroup({...tbody, [dataKey]: sortedEvents});
      setSortDirection(direction);
    }
  };

  useEffect(() => {
    const visibleOnly = _theaders.filter((item) => item.visible === true);
    setFilteredHeaders(visibleOnly);
    setSortedGroup(tbody)
  }, []);

  
  useEffect(() => {
    const getGroup = async () => {
      const _group = await getGroupById({ groupId });
      setSortedGroup({ ..._group });
    };
    getGroup();
  }, [groupId]);

  useEffect(() => {
    console.log(sortedGroup)
  }, [sortedGroup])

  return (
    <div className="mt-4 flex flex-col gap-2">
      <div
        className={`grid grid-cols-${filteredHeaders.length} gap-4 font-bold`}
      >
        {filteredHeaders &&
          filteredHeaders.map((header, index) => (
            <button
              key={`${header} ${index}`}
              onClick={() => handleSort(tbody[dataKey], header.headerKey, header.sortType)}
              className="flex gap-2 items-center"
            >
              {header.title}
              {(sortDirection === 1 || sortDirection === 2) && (
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
                      <span key={headerKey}>{item[headerKey]}</span>
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
