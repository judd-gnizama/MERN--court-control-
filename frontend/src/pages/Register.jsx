import React from "react";
import Layout from "./Layout";
import { badminton_smash2, cc_logo_transparent } from "../assets/images/images";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <Layout>
        <main
          className="section grid h-full"
          style={{ gridTemplateColumns: "25% 75%" }}
        >
          <img
            className=" object-cover h-full"
            src={badminton_smash2}
            alt="badminton_smash2"
          />
          <article className="flex flex-col items-center justify-center gap-2 p-4 text-center">
            <img className="w-20" src={cc_logo_transparent} alt="cc_logo" />
            <h2 className="text-2xl font-bold">Welcome to Court Control!</h2>
            <p className="text-[0.8rem]">
              Make court queueing easier and hassle free!
            </p>
            <form className="p-6 grid gap-2">
              <div>
                <label className="label-in-input" htmlFor="email">
                  Email address:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  // placeholder="joe@courtcontrol.com"
                  className="input-light input-with-label"
                />
              </div>
              <div>
                <label className="label-in-input" htmlFor="username">
                  Create username:
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  // placeholder="johndoe123"
                  className="input-light input-with-label"
                />
              </div>
              <div className="relative">
                <label className="label-in-input" htmlFor="password">
                  Create password:
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="input-light input-with-label"
                />
                <button className="flex items-center absolute text-2xl text-[var(--color-neutral-300)] right-3 top-[50%] translate-y-[-50%]">
                  <ion-icon name="eye-outline"></ion-icon>
                  {/* <ion-icon name="eye-off-outline"></ion-icon> */}
                </button>
              </div>
              <div className="relative">
                <label className="label-in-input" htmlFor="password2">
                  Re-enter password:
                </label>
                <input
                  type="password"
                  name="password2"
                  id="password2"
                  className="input-light input-with-label"
                />
                <button className="flex items-center absolute text-2xl text-[var(--color-neutral-300)] right-3 top-[50%] translate-y-[-50%]">
                  <ion-icon name="eye-outline"></ion-icon>
                  {/* <ion-icon name="eye-off-outline"></ion-icon> */}
                </button>
              </div>
              <span className="text-left text-[0.75rem] text-red-300">
                All fields are required
              </span>
              <button className="CTA"> Create Account</button>
            </form>
            <p className="text-[0.75rem]">
              Already have an account?{" "}
              <Link
                className="text-[var(--color-primary)] font-bold m-1"
                to="/login"
              >
                Log in
              </Link>
            </p>
          </article>
        </main>
      </Layout>
    </>
  );
};

export default Register;
