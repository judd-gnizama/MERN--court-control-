import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import BackToTop from "../components/BackToTop.jsx";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <BackToTop />
    </>
  );
};

export default Layout;
