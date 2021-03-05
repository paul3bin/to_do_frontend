import React, { useState, useEffect } from "react";

import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { API } from "../api-service";
import "../styles/auth.css";

function Auth() {
  document.title = "Login";

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const isDisabled = username.length === 0 || password.length === 0;

  const [token, setToken] = useCookies(["token"]);

  const [userID, setUserID] = useCookies(["id"]);

  const loginClicked = () => {
    API.loginUser({ username, password })
      .then((resp) => [setToken("token", resp.token), setUserID("id", resp.id)])
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (token["token"] === "undefined") {
      toast.error("Wrong username or password.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setToken("token", "");
      setUsername("");
      setPassword("");
    } else {
      if (token["token"]) window.location.replace("/tasks");
    }
  }, [token]);

  return (
    <div className="login-body">
      <div className="login-box">
        <h1>login</h1>
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

          <button
            disabled={isDisabled}
            type="button"
            className="btn btn-primary btn-block"
            onClick={loginClicked}
          >
            Login
          </button>

          <p className="p-login-register">
            Don't have an account? Register{" "}
            <Link to="/register-user">here</Link>.
          </p>
        </form>
      </div>
    </div>
  );
}

export { Auth };
