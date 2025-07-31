// src/pages/Recruiter/MyPostedJobs.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../helpers/UserContext";
import ApplicantsModal from "./ApplicantsModal";

export default function MyPostedJobs() {
  const { token } = useUser();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/recruiter/jobs/my",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setJobs(res.data.jobs || []);
      } catch (err) {
        console.error("Failed to load your jobs:", err);
      }
    };
    fetchMyJobs();
  }, [token]);

  const handleViewApplicants = async (jobId) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/recruiter/jobs/${jobId}/applications`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSelectedJob(jobs.find((job) => job._id === jobId));
      setApplicants(res.data.applications || []);
      setShowModal(true);
    } catch (err) {
      console.error("Failed to load applicants:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-6">My Job Posts</h1>
      {jobs.length === 0 ? (
        <p className="text-gray-600">You haven't posted any jobs yet.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job._id}
              className="p-4 border rounded-md bg-white shadow-sm hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="text-gray-600">
                    {job.company} - {job.location}
                  </p>
                  <p className="text-sm text-gray-500">
                    {job.type} • {job.salary}
                  </p>
                </div>
                <button
                  onClick={() => handleViewApplicants(job._id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  View Applicants
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <ApplicantsModal
          job={selectedJob}
          applicants={applicants}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
