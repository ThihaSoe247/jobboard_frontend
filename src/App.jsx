import React, { useState } from "react";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/SideBar";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen ">
      <NavBar onMenuClick={toggleSidebar} />

      <div className="pt-13 flex">
        {sidebarOpen && <Sidebar />}
        <main className="flex-1 p-6 transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
