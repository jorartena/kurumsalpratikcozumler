import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "@fontsource-variable/oswald";
import "@fontsource-variable/source-sans-3";
import "@fontsource-variable/unbounded";
import "@fontsource-variable/manrope";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
