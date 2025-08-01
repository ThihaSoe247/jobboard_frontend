import React from "react";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useUser } from "../helpers/UserContext";

export default function NavBar({ onMenuClick }) {
  const navigate = useNavigate();
  const { name, role, refreshUser, setToken, token } = useUser();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    refreshUser();
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-blue-600 text-white py-4 px-6 flex items-center justify-between shadow">
      <div className="flex items-center gap-4">
        <FiMenu size={24} onClick={onMenuClick} className="cursor-pointer" />
        <span className="text-xl font-bold cursor-pointer">JobBoard</span>
      </div>

      <div className="flex items-center space-x-4">
        {token ? (
          <>
            <span>Hello, {name}</span>
            <span>Role: {role}</span>
            <button onClick={() => navigate("/home")}>Home</button>
            <button onClick={handleLogout} className="hover:underline">
              Log Out
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="hover:underline"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="hover:underline"
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
}
