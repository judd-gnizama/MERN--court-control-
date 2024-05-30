import React from "react";
import { Link } from "react-router-dom";
import {
  cc_logo_transparent,
  icons8_discord,
  icons8_facebook,
  icons8_github,
  icons8_instagram,
  icons8_linkedin,
  icons8_twitterx,
  icons8_youtube,
} from "../assets/images/images.js";

const Footer = () => {
  return (
    <footer className="bg-[var(--color-neutral-800)]">
      <section className="section my-5 flex flex-col items-center justify-center text-[0.7rem] gap-6">
        {/* <Link to="/" className="flex gap-2 items-center">
          <img src={cc_logo_transparent} alt="cc_logo" className="w-10" />
          <span className="font-bold text-[1.1rem] text-[var(--color-neutral-white)]">
            Court Control
          </span>
        </Link> */}
        {/* <ul className="footer-socials flex gap-2">
            <li>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <ion-icon src={icons8_facebook}></ion-icon>
              </a>
            </li>
            <li>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <ion-icon src={icons8_instagram}></ion-icon>
              </a>
            </li>
            <li>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <ion-icon src={icons8_linkedin}></ion-icon>
              </a>
            </li>
            <li>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <ion-icon src={icons8_github}></ion-icon>
              </a>
            </li>
            <li>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <ion-icon src={icons8_youtube}></ion-icon>
              </a>
            </li>
            <li>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <ion-icon src={icons8_twitterx}></ion-icon>
              </a>
            </li>
            <li>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <ion-icon src={icons8_discord}></ion-icon>
              </a>
            </li>
          </ul> */}
        {/* <ul className="text-[var(--color-neutral-white)] flex justify-center gap-10">
          <li>
            <Link>Home</Link>
          </li>
          <li>
            <Link>About</Link>
          </li>
          <li>
            <Link>Contact</Link>
          </li>
          <li>
            <Link>Buy Me Coffee</Link>
          </li>
        </ul> */}

        <span className="text-[var(--color-neutral-white)] text-center">
          &copy; 2024 Court Control. All Rights Reserved. <br />
          Powered by{" "}
          <a
            className="font-bold text-[var(--color-primary)]"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            JMT
          </a>
        </span>
      </section>
    </footer>
  );
};

export default Footer;
