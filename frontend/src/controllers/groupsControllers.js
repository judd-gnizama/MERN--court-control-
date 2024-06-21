const backendPath = "http://localhost:4000";

//--------------------------- Get Groups of user --------------------------

const getUserGroups = async () => {
  const res = await fetch(`${backendPath}/api/groups/user`, {
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

  const res = await fetch(`${backendPath}/api/groups/`, {
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

export { getUserGroups, addNewGroup, getGroupById };
