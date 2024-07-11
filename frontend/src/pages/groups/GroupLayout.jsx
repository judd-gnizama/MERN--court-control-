import React, { useEffect, useState } from "react";
import UserLayout from "../users/UserLayout";
import { useParams, useSearchParams } from "react-router-dom";
import UserSection from "../users/components/UserSection";
import { getGroupById, updateGroup } from "../../controllers/groupsControllers";
import Subheader from "./Subheader";
import Search from "./Search";
import AddEvent from "../events/AddEvent";
import ItemList from "./ItemList";
import FilterOptions from "../../components/FilterOptions";

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
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 justify-between items-center">
              <div className="flex gap-2 flex-1">
                <Search
                  searchFor={"Event"}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
                <button className="CTA2 inline-flex gap-2">
                  <span className="material-symbols-outlined filled text-inherit">
                    tune
                  </span>
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
            <FilterOptions />
            {/* <div className="bg-[var(--color-neutral-300)] p-4 rounded-[3px] border border-transparent">
              <h2 className="font-bold">Filter Options</h2>
              <select
                name="filter_select_eventType"
                id=""
                className="bg-gray-700"
                onChange={handleFilter}
                value={filterSelect}
              >
                <option value="type" hidden defaultChecked>
                  Type
                </option>
                <option value="fungame">Fun Game</option>
                <option value="regular">Regular</option>
                <option value="tournament">Tournament</option>
              </select>
              <div>
                <h2>Selected Filters</h2>
                <ul className="flex">
                  <li className="inline-flex gap-1 bg-[var(--color-tertiary)] rounded-full px-4 py-2">
                    Filter Option Selected
                    <button className="material-symbols-outlined filled">
                      close
                    </button>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>
        )}
        <UserSection title={tab.toUpperCase()}>
          {tab === "Events" && (
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
