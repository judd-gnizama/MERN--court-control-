import { Link } from "react-router-dom";
import BackToTop from "../../components/BackToTop";
import Footer from "../../components/Footer";
import UserHeader from "./components/UserHeader";
import UserSideNav from "./components/UserSideNav";

const UserLayout = ({ children, subheader }) => {
  return (
    <div className="grid grid-cols-[1fr_4fr]">
      <UserSideNav />
      <div className="grid grid-rows-[auto_1fr_auto]">
        <UserHeader>{subheader}</UserHeader>
        <div className="user-main">{children}</div>
        <Footer />
      </div>
      <BackToTop />
    </div>
  );
};

export default UserLayout;
