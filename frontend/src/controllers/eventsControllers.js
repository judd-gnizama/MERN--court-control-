const BACKENDPATH = "http://localhost:4000";

import { getGroupById } from "./groupsControllers";

const addNewEvent = async ({ groupId, newEvent }) => {
  if (!groupId) {
    throw Error("Missing params");
  }

  const group = await getGroupById({ groupId });
  const newEvents = [...group.events, newEvent];
  const res = await fetch(`${BACKENDPATH}/api/groups/${groupId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ events: newEvents }),
  });
  const data = res.json();
  if (!res.ok) {
    throw Error(data.error);
  }
  return data;
};

export { addNewEvent };
