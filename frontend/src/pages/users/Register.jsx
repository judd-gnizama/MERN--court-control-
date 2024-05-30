import React, { useContext, useState } from "react";
import Layout from "../Layout";
import {
  badminton_smash2,
  cc_logo_transparent,
} from "../../assets/images/images";
import { Link, useNavigate } from "react-router-dom";
import FormAlert from "../../components/FormAlert";
import { registerUser } from "../../controllers/usersControllers";
import { UserContext } from "../../contexts/UserContext";

const Register = () => {
  // Use user Context
  const { setUser } = useContext(UserContext);

  // Use navigate hook
  const navigate = useNavigate();

  // states
  const [error, setError] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [registerData, setRegisterData] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
  });

  // functions
  const handleChangeData = (event, toChange) => {
    if (toChange === "email") {
      setRegisterData({ ...registerData, email: event.target.value });
    } else if (toChange === "username") {
      setRegisterData({ ...registerData, username: event.target.value });
    } else if (toChange === "password") {
      setRegisterData({ ...registerData, password: event.target.value });
    } else if (toChange === "password2") {
      setRegisterData({ ...registerData, password2: event.target.value });
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      // register user
      await registerUser(registerData);
      alert(`Successfully registered ${registerData.username}`);
      // update user State
      setUser({ email: registerData.email, groups: [] });
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Layout>
        <main className="section grid grid-cols-[25%_75%] max-md:grid-cols-[1fr] h-full">
          <img
            className=" object-cover h-full max-md:hidden"
            src={badminton_smash2}
            alt="badminton_smash2"
          />
          <article className="flex flex-col items-center justify-center gap-2 p-4 text-center">
            <img className="max-w-20" src={cc_logo_transparent} alt="cc_logo" />
            <h2 className="text-2xl font-bold">Welcome to Court Control!</h2>
            <p className="text-[0.8rem]">
              Make court queueing easier and hassle free!
            </p>
            <form onSubmit={handleRegister} className="p-6 grid gap-2">
              <div>
                <label className="label-in-input" htmlFor="email">
                  Email address:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={registerData.email}
                  onChange={(event) => handleChangeData(event, "email")}
                  // placeholder="joe@courtcontrol.com"
                  className="input-light input-with-label"
                  autoFocus
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
                  value={registerData.username}
                  onChange={(event) => handleChangeData(event, "username")}
                  // placeholder="johndoe123"
                  className="input-light input-with-label"
                />
              </div>
              <div className="relative">
                <label className="label-in-input" htmlFor="password">
                  Create password:
                </label>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  id="password"
                  value={registerData.password}
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
              <div className="relative">
                <label className="label-in-input" htmlFor="password2">
                  Re-enter password:
                </label>
                <input
                  type={showPass2 ? "text" : "password"}
                  name="password2"
                  id="password2"
                  value={registerData.password2}
                  onChange={(event) => handleChangeData(event, "password2")}
                  className="input-light input-with-label"
                />
                <a
                  className="flex items-center absolute text-2xl text-[var(--color-neutral-300)] right-3 top-[50%] translate-y-[-50%]"
                  onClick={() => setShowPass2(!showPass2)}
                >
                  <ion-icon
                    name={showPass2 ? "eye-off-outline" : "eye-outline"}
                  ></ion-icon>
                </a>
              </div>
              {error && <FormAlert msg={error} />}
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
