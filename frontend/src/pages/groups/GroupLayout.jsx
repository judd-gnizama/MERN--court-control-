import React, { useEffect, useState } from "react";
import UserLayout from "../users/UserLayout";
import { useParams, useSearchParams } from "react-router-dom";
import UserSection from "../users/components/UserSection";
import { getGroupById, updateGroup } from "../../controllers/groupsControllers";
import Subheader from "./Subheader";
import Search from "./Search";
import AddEvent from "../events/AddEvent";
import ItemList from "./ItemList";

const GROUP_TABS = ["Announcements", "Events", "Players", "About"];
const SORT_DIRECTIONS = ["unsorted", "ascending", "descending"];
const EVENT_HEADERS = [
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
const GroupLayout = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [sortedGroup, setSortedGroup] = useState(null);
  const [tab, setTab] = useState("Events");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [sortDirection, setSortDirection] = useState(0);

  const handleAddEvent = async (newEvent) => {
    const newEvents = [...group.events, newEvent];
    setGroup({ ...group, events: newEvents });
    await updateGroup({ groupId, newGroup: { events: newEvents } });
    setShowAddEvent(false);
  };

  const cycleSortDirection = () => {
    const direction =
      sortDirection <= SORT_DIRECTIONS.length - 2 ? sortDirection + 1 : 0;
    return direction;
  };

  const sortArray = (_array, sortBy, _direction) => {
    // create shallow copy to avoid changing original
    const array = [..._array];
    const direction = SORT_DIRECTIONS[_direction];
    if (!direction || direction === "unsorted") {
      return array;
    }
    if (sortBy && direction) {
      if (sortBy === "Alphabetical") {
        return array.sort((a, b) =>
          direction === "ascending"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        );
      }
      if (sortBy === "Number") {
        return array.sort((a, b) =>
          direction === "ascending" ? a - b : b - a
        );
      }
    } else {
      return array;
    }
  };

  const handleSort = (array, sortBy) => {
    const direction = cycleSortDirection();
    const sortedEvents = sortArray(array, sortBy, direction);
    if (sortedEvents) {
      setSortedGroup({ ...group, events: sortedEvents });
      setSortDirection(direction);
    }
  };

  useEffect(() => {
    const getGroup = async () => {
      const _group = await getGroupById({ groupId });
      setGroup(_group);
      setSortedGroup({ ..._group });
    };
    getGroup();
  }, [groupId]);

  return (
    <div className="relative">
      <UserLayout
        subheader={
          <Subheader subheadings={GROUP_TABS} tab={tab} setTab={setTab} />
        }
      >
        {tab === "Events" && (
          <div className="flex gap-2 justify-between items-center">
            <div className="flex gap-2 flex-1">
              <Search
                searchFor={"Event"}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              <button className="CTA2 inline-flex gap-2">
                <span className="material-symbols-outlined filled">tune</span>
                Filter
              </button>
            </div>

            <button
              onClick={() => setShowAddEvent(true)}
              className="CTA inline-flex gap-2 items-center"
            >
              <span className="material-symbols-outlined filled">add</span>Add
              Event
            </button>
          </div>
        )}
        <UserSection title={tab.toUpperCase()}>
          {tab === "Events" && (
            // <div className="flex flex-col pt-4 gap-2">
            //   <div className="grid grid-cols-[2fr_1fr_1fr_1fr] font-bold">
            //     <button
            //       onClick={() => handleSort(group.events, "Alphabetical")}
            //       className="flex gap-2 items-center"
            //     >
            //       Name
            //       {(sortDirection === 1 || sortDirection === 2) && (
            //         <span className="material-symbols-outlined filled text-[0.8em]">
            //           {sortDirection === 1 ? "arrow_upward" : "arrow_downward"}
            //         </span>
            //       )}
            //     </button>
            //     <button>Type</button>
            //     <button>Venue</button>
            //     <button>Status</button>
            //   </div>
            //   {sortedGroup &&
            //     sortedGroup.events.map((event, eventIdx) => {
            //       if (event != null) {
            //         return (
            //           <div
            //             key={eventIdx}
            //             className="grid grid-cols-[2fr_1fr_1fr_1fr] p-2 border-2 border-[var(--color-neutral-300)] rounded-[3px] relative items-center gap-4 cursor-pointer hover:bg-[var(--color-neutral-300)] transition-colors duration-150"
            //           >
            //             <span className="flex items-center gap-2">
            //               <span className="material-symbols-outlined filled">
            //                 person
            //               </span>
            //               {event.name}
            //             </span>
            //             <span>{event.eventType}</span>
            //             <span>{event.venue}</span>
            //             <span>{event.eventStatus}</span>
            //             <span className="material-symbols-outlined absolute top-[50%] -translate-y-1/2 right-4">
            //               chevron_right
            //             </span>
            //           </div>
            //         );
            //       }
            //     })}
            //   <button
            //     type="button"
            //     className="self-center font-bold rounded-[3px] p-2 bg-[var(--color-neutral-300)] w-fit mt-5"
            //   >
            //     Show more Results
            //   </button>
            // </div>
            <ItemList
              theaders={EVENT_HEADERS}
              tbody={group}
              dataKey={"events"}
            />
          )}
        </UserSection>
      </UserLayout>
      {showAddEvent && (
        <AddEvent
          show={showAddEvent}
          setShow={setShowAddEvent}
          onAddEvent={handleAddEvent}
        />
      )}
    </div>
  );
};

export default GroupLayout;
