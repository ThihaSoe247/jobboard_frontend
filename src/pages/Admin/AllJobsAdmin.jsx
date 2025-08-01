import React, { useEffect, useState } from "react";
import axios from "axios";
import defaultImage from "../../assets/job.jpg";

export default function AllJobsAdmin() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("all");
  const token = localStorage.getItem("token");

  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/jobs`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setJobs(res.data.jobs);
    } catch (e) {
      console.error("Failed to fetch jobs", e);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    if (filter === "approved") return job.isApproved;
    if (filter === "pending") return !job.isApproved;
    return true;
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this job?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/jobs/delete/${id}`
      );
      setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch (e) {
      console.error("Delete failed", e);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/jobs/approve/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchJobs();
    } catch (e) {
      console.error("Approval failed", e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">All Job Posts</h1>

        <div className="mb-6 flex gap-4">
          <button
            className={`px-4 py-2 rounded ${
              filter === "all" ? "bg-blue-600 text-white" : "bg-white border"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filter === "approved"
                ? "bg-green-600 text-white"
                : "bg-white border"
            }`}
            onClick={() => setFilter("approved")}
          >
            Approved
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filter === "pending"
                ? "bg-yellow-500 text-white"
                : "bg-white border"
            }`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
        </div>

        <div className="grid gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded-lg shadow border flex gap-6"
            >
              <img
                src={job.imageUrl || defaultImage}
                alt={job.title}
                className="w-32 h-32 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-blue-700">
                  {job.title}
                </h2>
                <p className="text-gray-600">
                  {job.company} — {job.location}
                </p>
                <p className="text-sm text-gray-500 capitalize mt-1">
                  {job.type} | {job.salary}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Posted by: {job.postedBy?.name || "Unknown"}
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Status: {job.isApproved ? "✅ Approved" : "🕐 Pending"}
                </p>
              </div>
              <div className="flex flex-col gap-2 justify-center">
                {!job.isApproved && (
                  <button
                    onClick={() => handleApprove(job._id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
