// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom"; // 1. IMPORTE

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 2. ENVOLVA O <APP /> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
