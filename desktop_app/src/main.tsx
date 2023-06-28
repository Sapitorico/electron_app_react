import React from "react";
import ReactDOM from "react-dom/client";
import App from "components/App.tsx";
import "./Global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

postMessage({ payload: "removeLoading" }, "*");
