import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import defaultImage from "../assets/job.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import { useUser } from "../helpers/UserContext";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const { role } = useUser();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/jobs/${id}`)
      .then((res) => setJob(res.data.job))
      .catch((err) => console.error("Failed to fetch job", err));
  }, [id]);

  if (!job) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-10 px-5">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* Job Image */}
        <div className="mb-6">
          <img
            src={job.imageUrl || defaultImage}
            alt={job.title}
            className="w-full max-h-80 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Title & Basic Info */}
        <h1 className="text-4xl font-bold text-blue-800 mb-2">{job.title}</h1>
        <div className="text-gray-600 text-lg mb-4">
          <span className="font-semibold">{job.company}</span> — {job.location}
        </div>

        <div className="flex gap-4 text-sm mb-6">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full capitalize">
            {job.type}
          </span>
          {job.salary && (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
              {job.salary}
            </span>
          )}
        </div>

        {/* Description */}
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Job Description
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
          {job.description}
        </p>

        {/* Requirements */}
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Requirements
        </h2>
        <ul className="list-disc list-inside text-gray-700 mb-8 space-y-1">
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>

        {/* Apply Button */}
        <div className="text-center">
          <Link to={`/jobs/${id}/apply`}>
            {role === "applicant" ? (
              <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition">
                Apply Now
              </button>
            ) : (
              <h2 className="text-red-500">Only Applicants can do apply</h2>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
