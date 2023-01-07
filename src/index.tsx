import React from "react";
import ReactDOM from "react-dom/client";
import "./SCSS/index.scss";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { APIContextProvider } from "./context/APIContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <APIContextProvider>
        <App />
      </APIContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
