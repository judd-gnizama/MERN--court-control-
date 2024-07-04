const BACKENDPATH = "http://localhost:4000";

//--------------------------- Get Groups of user --------------------------

const getUserGroups = async () => {
  const res = await fetch(`${BACKENDPATH}/api/groups/user`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data.userGroups;
};

//--------------------------- Add New Group --------------------------

const addNewGroup = async (groupData) => {
  const { name, tags } = groupData;

  if (!name || tags.length <= 0) {
    throw Error("All fields are required");
  }

  const res = await fetch(`${BACKENDPATH}/api/groups/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ name, tags }),
  });

  const data = res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  return data;
};

const getGroupById = async ({ groupId }) => {
  try {
    const groups = await getUserGroups();
    const group = groups.filter((group) => group._id === groupId);
    if (group.length > 0) {
      return group[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

const updateGroup = async ({ groupId, newGroup }) => {
  if (!groupId || !newGroup) {
    throw Error("Group Id and Group Data needed");
  }

  const res = await fetch(`${BACKENDPATH}/api/groups/${groupId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(newGroup),
  });

  const data = res.json();

  if (!res.ok) {
    throw Error(data.error);
  }
  return data;
};

const deleteGroup = async ({ groupId }) => {
  const res = await fetch(`${BACKENDPATH}/api/groups/${groupId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = res.json();
  if (!res.ok) {
    throw Error(data.error);
  }
  return data;
};

export { getUserGroups, addNewGroup, getGroupById, updateGroup, deleteGroup };
