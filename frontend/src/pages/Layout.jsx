import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import BackToTop from "../components/BackToTop.jsx";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="bg-[var(--color-neutral-black)] text-[var(--color-neutral-white)]">
        {children}
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;
