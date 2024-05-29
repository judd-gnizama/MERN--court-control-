import React from "react";
import { Link } from "react-router-dom";
import { cc_logo_transparent } from "../assets/images/images";

const Header = () => {
  return (
    <header className="bg-[var(--color-neutral-black)] text-[var(--color-neutral-white)]">
      <section className="section">
        <nav className="flex justify-between items-center">
          <Link to="/" className="flex gap-2 items-center">
            <img src={cc_logo_transparent} alt="cc_logo" className="w-10" />
            <span className="font-bold text-[1.1rem]">Court Control</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/about">
              <span>About</span>
            </Link>
            <Link to="/login">
              <span>Login</span>
            </Link>
            <Link to="/register" className="CTA">
              <span>Register</span>
            </Link>
          </div>
        </nav>
      </section>
    </header>
  );
};

export default Header;
