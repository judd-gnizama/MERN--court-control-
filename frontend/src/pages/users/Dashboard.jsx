import React, { useContext, useEffect, useState } from "react";
import UserLayout from "./UserLayout";
import UserSection from "./components/UserSection";
import UserSectionCard from "./components/UserSectionCard";
import { UserContext } from "../../contexts/UserContext";
import AddNewGroup from "../groups/AddNewGroup";
import { getUserGroups } from "../../controllers/groupsControllers";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const [showAddNewGroup, setShowAddNewGroup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groups = await getUserGroups();
        setUser({ ...user, groups });
      } catch (error) {
        console.error("Error fetching user groups: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <UserLayout>
      <main className="flex flex-col gap-4">
        <UserSection title={"GROUPS"}>
          <div className="grid grid-cols-5 gap-2">
            <button
              onClick={() => setShowAddNewGroup(true)}
              className="flex flex-col items-center justify-center  font-bold bg-[var(--color-primary)]"
            >
              <span className="material-symbols-outlined text-[3rem]">add</span>
              Create New Group
            </button>
            {user.groups.map((group, index) => (
              <UserSectionCard
                linkTo={`/g/${group._id}`}
                title={group.name}
                description={group.description}
                key={`${group._id} ${index}`}
              />
            ))}
          </div>
        </UserSection>
        <UserSection title={"SHARED GROUPS"}>
          <div className="grid grid-cols-5 gap-2">
            <UserSectionCard
              title={"New Group"}
              description={"Haven't tried here"}
            />
          </div>
        </UserSection>
        <AddNewGroup show={showAddNewGroup} setShow={setShowAddNewGroup} />
      </main>
    </UserLayout>
  );
};

export default Dashboard;
