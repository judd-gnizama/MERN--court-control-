import React, { useContext } from "react";
import UserLayout from "./UserLayout";
import UserSection from "./components/UserSection";
import UserSectionCard from "./components/UserSectionCard";
import { UserContext } from "../../contexts/UserContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <UserLayout>
      <main className="flex flex-col gap-4">
        <UserSection title={"GROUPS"}>
          <div className="grid grid-cols-5 gap-2">
            {user.groups?.map((group) => (
              <UserSectionCard
                title={group.name}
                description={group.description}
                key={group._id}
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
      </main>
    </UserLayout>
  );
};

export default Dashboard;
