import React from "react";
import Layout from "./Layout";
import { badminton_smash } from "../assets/images/images";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <>
      <Layout>
        <main className="flex items-center justify-center bg-[var(--color-neutral-black)] h-full relative max-lg:flex-col section">
          <img
            className="lg:absolute lg:translate-x-[60%] lg:-z-5"
            src={badminton_smash}
            alt="badminton_smash"
          />
          <article className="flex flex-col gap-8 max-lg:text-center max-lg:items-center max-w-lg lg:z-10 lg:translate-x-[-25%]">
            <h1 className="">Take charge of your matches</h1>
            <p className="text-md text-[var(--color-neutral-300)] max-w-[26rem]">
              Create and manage groups, events, queues, sessions and tournaments
              all in one web app!
            </p>
            <div className="button-group flex gap-2">
              <Link to="/register" className="CTA">
                Become a queue master
              </Link>
              <Link to="/" className="CTA2">
                Join event as guest
              </Link>
            </div>
          </article>
        </main>
      </Layout>
    </>
  );
};

export default Homepage;
