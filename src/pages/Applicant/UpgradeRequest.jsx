// src/pages/UpgradeRequest.jsx
import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../../helpers/UserContext";

export default function UpgradeRequest() {
  const { name } = useUser();
  const [message, setMessage] = useState("");

  const handleUpgrade = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/applicant/request-recruiter`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Request submitted successfully! Wait for admin approval.");
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg p-6 mt-10 rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        Hello {name}, Want to become a Recruiter?
      </h2>
      <p className="mb-4 text-gray-600">
        You can request to upgrade your account to post jobs and manage
        applicants.
      </p>
      <button
        onClick={handleUpgrade}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl transition"
      >
        Request Upgrade
      </button>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
