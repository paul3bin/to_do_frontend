import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Route, BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import { Auth } from "./components/auth";
import { RegisterUser } from "./components/user_register";
import { ProtectedRoute } from "./ProtectedRoute";

function Router() {
  return (
    <React.StrictMode>
      <CookiesProvider>
        <BrowserRouter>
          <Route exact path="/" component={Auth} />
          <ProtectedRoute exact path="/tasks" component={App} />
          <Route exact path="/register-user" component={RegisterUser} />
        </BrowserRouter>
      </CookiesProvider>
    </React.StrictMode>
  );
}

ReactDOM.render(<Router />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
