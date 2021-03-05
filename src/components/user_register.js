import React, { useState } from "react";
import { API } from "../api-service";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../styles/user_register.css";

function RegisterUser() {
  document.title = "Register User";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordReEnter, setPasswordReEnter] = useState("");

  const isDisabled =
    username.length === 0 ||
    password.length === 0 ||
    passwordReEnter.length === 0;

  const passwordCheck = () => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password);
  };

  const passwordReEnterCheck = () => {
    return password.length === passwordReEnter.length;
  };

  const registerClicked = () => {
    if (username.length >= 4) {
      if (passwordCheck && passwordReEnterCheck) {
        API.registerUser({ username, password })
          .then((resp) =>
            resp.username[0] === "A user with that username already exists."
              ? toast.error(
                  "User already exists!",
                  {
                    position: toast.POSITION.TOP_RIGHT,
                  },
                  (setUsername(""), setPassword(""), setPasswordReEnter(""))
                )
              : // alert(
                //     "User already exists!",
                //     (setUsername(""), setPassword(""), setPasswordReEnter(""))
                //   )
                // alert(
                //   "New user registered. Now, login with the same credentials.",
                //   window.location.replace("/")
                // )
                toast.success(
                  "New user registered. Now, login with the same credentials.",
                  {
                    position: toast.POSITION.TOP_RIGHT,
                  },
                  (setUsername(""), setPassword(""), setPasswordReEnter(""))
                )
          )
          .catch((error) => console.log(error));
      } else {
        alert(
          "Check your password and try again.",
          (setUsername(""), setPassword(""), setPasswordReEnter(""))
        );
      }
    } else {
      alert(
        "Username should be aleast 4 characters",
        (setUsername(""), setPassword(""), setPasswordReEnter(""))
      );
    }
  };

  return (
    <div className="register-body">
      <div className="register-box">
        <h1>register</h1>
        <form>
          <div className="reg-input_box">
            <input
              type="text"
              name="username"
              value={username}
              onChange={(evnt) => setUsername(evnt.target.value)}
              required={true}
            />
            <label>Username</label>
          </div>

          <div className="reg-input_box">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(evnt) => setPassword(evnt.target.value)}
              required={true}
            />
            <label>Password</label>
          </div>

          <div className="reg-input_box">
            <input
              type="password"
              name="password"
              value={passwordReEnter}
              onChange={(evnt) => setPasswordReEnter(evnt.target.value)}
              required={true}
            />
            <label>Re-Enter Password</label>
          </div>

          <button
            disabled={isDisabled}
            type="button"
            className="btn btn-primary btn-block"
            onClick={registerClicked}
          >
            Register
          </button>

          <p className="p-login-register">
            Already have an account? Login <Link to="/">here</Link>.
          </p>
        </form>
      </div>
    </div>
  );
}

export { RegisterUser };
