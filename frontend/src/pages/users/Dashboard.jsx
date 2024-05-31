import React, { useContext } from "react";
import UserLayout from "./UserLayout";
import UserSection from "./components/UserSection";
import UserSectionCard from "./components/UserSectionCard";
import { UserContext } from "../../contexts/UserContext";
import { useNavigation, useParams } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <UserLayout>
      <main className="flex flex-col gap-4">
        <UserSection title={"GROUPS"}>
          {user.groups?.map((group) => (
            <UserSectionCard
              title={group.name}
              description={group.description}
              key={group._id}
            />
          ))}
        </UserSection>
        <UserSection title={"SHARED GROUPS"}>
          <UserSectionCard
            title={"New Group"}
            description={"Haven't tried here"}
          />
        </UserSection>
      </main>
    </UserLayout>
  );
};

export default Dashboard;
