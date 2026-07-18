import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Global styles (design tokens first, then base styles).
import "./styles/variables.css";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
