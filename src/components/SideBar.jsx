// src/components/Sidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../helpers/UserContext";
import {
  FiHome,
  FiUser,
  FiFileText,
  FiBriefcase,
  FiSettings,
  FiUsers,
  FiUpload,
  FiCheckCircle,
  FiUserPlus,
  FiPlusSquare,
} from "react-icons/fi";

export default function Sidebar() {
  const { role } = useUser();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-6 space-y-6">
      <div className="text-xl font-bold text-white mb-6">JobBoard</div>

      {/* Common Links */}
      <nav className="space-y-2">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-gray-800 rounded-md"
        >
          <FiHome /> Dashboard
        </button>

        {/* Applicant Tabs */}
        {role === "applicant" && (
          <>
            <button
              onClick={() => navigate(`/applicant/profile`)}
              className="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-gray-800 rounded-md"
            >
              <FiUser /> Profile
            </button>
            <button
              onClick={() => navigate("/applicant/my-applications")}
              className="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-gray-800 rounded-md"
            >
              <FiFileText /> My Jobs
            </button>
            <button
              onClick={() => navigate("/applicant/upgrade")}
              className="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-gray-800 rounded-md"
            >
              <FiUpload /> Upgrade to Recruiter
            </button>
          </>
        )}

        {/* Recruiter Tabs */}
        {role === "recruiter" && (
          <>
            <button
              onClick={() => navigate(`/recruiter/profile`)}
              className="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-gray-800 rounded-md"
            >
              <FiUser /> Profile
            </button>
            <button
              onClick={() => navigate("/recruiter/my-posted-jobs")}
              className="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-gray-800 rounded-md"
            >
              <FiBriefcase /> My Job Posts
            </button>
            <button
              onClick={() => navigate("/recruiter/create-job")}
              className="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-gray-800 rounded-md"
            >
              <FiPlusSquare /> Create Job
            </button>
          </>
        )}

        {/* Admin Tabs */}
        {role === "admin" && (
          <>
            <button
              onClick={() => navigate(`/admin/profile`)}
              className="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-gray-800 rounded-md"
            >
              <FiUser /> Profile
            </button>
            <button
              onClick={() => navigate("/admin/all-jobs")}
              className="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-gray-800 rounded-md"
            >
              <FiCheckCircle /> See All Jobs
            </button>
            <button
              onClick={() => navigate("/admin/manage-users")}
              className="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-gray-800 rounded-md"
            >
              <FiUser /> Manage Users
            </button>
            <button
              onClick={() => navigate("/admin/recruiter-requests")}
              className="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-gray-800 rounded-md"
            >
              <FiUserPlus /> Recruiter Requests
            </button>
          </>
        )}
      </nav>
    </div>
  );
}
