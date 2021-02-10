import React, { useState } from "react";
import { API } from "../api-service";
import { Link } from "react-router-dom";

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
              ? alert(
                  "User already exists!",
                  (setUsername(""), setPassword(""), setPasswordReEnter(""))
                )
              : alert(
                  "New user registered. Now, login with the same credentials.",
                  window.location.replace("/")
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
    <div className="login-body">
      <div className="login-box">
        <h1>register</h1>
        <form>
          <div className="input-box">
            <input
              type="text"
              name="username"
              value={username}
              onChange={(evnt) => setUsername(evnt.target.value)}
              required={true}
            />
            <label>Username</label>
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(evnt) => setPassword(evnt.target.value)}
              required={true}
            />
            <label>Password</label>
          </div>

          <div className="input-box">
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
