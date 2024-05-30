import React, { useState } from "react";
import Layout from "./Layout";
import { cc_logo_transparent, shuttlecock } from "../assets/images/images";
import { Link } from "react-router-dom";
import FormAlert from "../components/FormAlert";
import { loginUser } from "../controllers/usersControllers";

const Login = () => {
  // states
  const [error, setError] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // functions
  const handleChangeData = (event, toChange) => {
    if (toChange === "email") {
      setLoginData({ ...loginData, email: event.target.value });
    } else if (toChange === "password") {
      setLoginData({ ...loginData, password: event.target.value });
    }
    console.log(event.target.value);
    console.log(loginData);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await loginUser(loginData);
      setError();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Layout>
        <main className="section grid grid-cols-[75%_25%] max-md:grid-cols-[1fr] h-full">
          <article className="flex flex-col items-center justify-center gap-2 p-4 text-center ">
            <img className="w-20" src={cc_logo_transparent} alt="cc_logo" />
            <h2 className="text-2xl font-bold">Welcome back!</h2>
            <p className="text-[0.8rem]">
              Don't have an account yet?
              <Link
                className="text-[var(--color-primary)] font-bold m-1"
                to="/register"
              >
                Sign up now
              </Link>
            </p>
            <form onSubmit={handleLogin} className="p-6 grid gap-2">
              <div>
                <label className="label-in-input" htmlFor="email">
                  Email address:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  // placeholder="joe@courtcontrol.com"
                  value={loginData.email}
                  onChange={(event) => handleChangeData(event, "email")}
                  className="input-light input-with-label"
                  autoFocus
                />
              </div>
              <div className="relative">
                <label className="label-in-input" htmlFor="password">
                  Password:
                </label>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  id="password"
                  value={loginData.password}
                  onChange={(event) => handleChangeData(event, "password")}
                  className="input-light input-with-label"
                />
                <a
                  className="flex items-center absolute text-2xl text-[var(--color-neutral-300)] right-3 top-[50%] translate-y-[-50%]"
                  onClick={() => setShowPass(!showPass)}
                >
                  <ion-icon
                    name={showPass ? "eye-off-outline" : "eye-outline"}
                  ></ion-icon>
                </a>
              </div>
              {error && <FormAlert msg={error} />}
              <span className="text-[0.75rem] flex justify-between items-center w-full">
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    className=" accent-[var(--color-primary)]"
                  />
                  Remember me
                </div>
                <Link
                  className="text-[var(--color-primary)] font-bold m-1"
                  to="/login"
                >
                  Forgot Password?
                </Link>
              </span>
              <button className="CTA" type="submit">
                Log in
              </button>
            </form>
            <div className="section-break w-60 relative flex justify-center my-6">
              <p className="absolute top-0 translate-y-[-50%] bg-[var(--color-neutral-black)] px-3">
                OR
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p>Log in with:</p>
              <ul className="flex gap-6 text-[2rem]">
                <li className="flex items-center">
                  <ion-icon name="logo-google"></ion-icon>
                </li>
                <li className="flex items-center">
                  <ion-icon name="logo-facebook"></ion-icon>
                </li>
                <li className="flex items-center">
                  <ion-icon name="logo-apple"></ion-icon>
                </li>
              </ul>
            </div>
          </article>
          <img
            className=" object-cover max-md:hidden h-full"
            src={shuttlecock}
            alt="shuttlecock"
          />
        </main>
      </Layout>
    </>
  );
};

export default Login;
