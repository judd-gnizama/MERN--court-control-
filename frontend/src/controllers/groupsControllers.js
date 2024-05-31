const backendPath = "http://localhost:3000";

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

export { getUserGroups };
