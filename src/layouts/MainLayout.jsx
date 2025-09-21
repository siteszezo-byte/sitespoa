// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // A sidebar que vamos criar
import Header from "../components/Header"; // Um header que vamos criar
import "../App.css";

function MainLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="page-content">
          {/* O Outlet é onde o React Router vai renderizar a página da rota atual */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
