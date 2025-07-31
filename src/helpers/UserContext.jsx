// src/helpers/UserContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [name, setName] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  const fetchUser = async () => {
    if (!token) {
      setName(null);
      setRole(null);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("http://localhost:4000/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setName(res.data.user.name);
      setRole(res.data.user.role);
    } catch (err) {
      console.error("Failed to fetch user:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/jobs");
      setJobs(res.data.jobs || []);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    }
  };

  const refreshUser = async () => {
    await fetchUser();
  }; // helpers/UserContext.js
  const updateUserFromResponse = (updatedData) => {
    setUserData((prev) => ({
      ...prev,
      name: updatedData.name,
      email: updatedData.email,
      phone: updatedData.phone,
    }));
  };

  useEffect(() => {
    fetchUser();
    fetchJobs();
  }, [token]); // Re-fetch when token changes

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        name,
        role,
        loading,
        refreshUser,
        jobs,
        setJobs,
        fetchJobs,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
