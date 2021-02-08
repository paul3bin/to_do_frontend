import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

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
      alert("Wrong username or password.");
      setToken("token", "");
      setUsername("");
      setPassword("");
    } else {
      if (token["token"]) window.location.replace("/tasks");
    }
  }, [token]);

  return (
    <div className="login-body">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-6 col-md-3">
            <form className="form-container">
              <h4 className="text-center fw-bold">Login</h4>

              <div className="form-group">
                <input
                  id="UserName"
                  type="email"
                  className="form-control"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(evnt) => setUsername(evnt.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(evnt) => setPassword(evnt.target.value)}
                />
              </div>

              <button
                disabled={isDisabled}
                type="submit"
                className="btn btn-primary btn-block"
                onClick={loginClicked}
              >
                Submit
              </button>

              <p className="p-login-register">
                Don't have an account? Register{" "}
                <Link to="/register-user">here</Link>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Auth };
