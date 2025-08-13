// src/pages/RecruiterRequests.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RecruiterRequests() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/admin/recruiter-requests`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setRequests(res.data.requests || []);
  };

  const handleApprove = async (id) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/admin/recruiter-requests/${id}/approve`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    fetchRequests();
  };

  const handleReject = async (id) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/admin/recruiter-requests/${id}/reject`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    fetchRequests();
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">
        Recruiter Upgrade Requests
      </h2>

      {requests.length === 0 ? (
        <p>No requests pending</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li
              key={req._id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center border p-4 rounded gap-4"
            >
              <div>
                <p>
                  <strong>Name:</strong> {req.user ? req.user.name : "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {req.user ? req.user.email : "N/A"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      req.status === "approved"
                        ? "text-green-600"
                        : req.status === "rejected"
                        ? "text-red-500"
                        : "text-yellow-600"
                    }`}
                  >
                    {req.status}
                  </span>
                </p>
              </div>

              <div className="flex gap-4">
                {req.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(req._id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(req._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
