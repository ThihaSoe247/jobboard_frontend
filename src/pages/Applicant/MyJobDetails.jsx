import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import jobImage from "../../assets/job.jpg";

export default function MyJobDetails() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/jobs/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setJob(res.data.job);
      } catch (err) {
        console.error("Failed to fetch job", err);
      }
    };

    fetchJob();
  }, [jobId]);

  if (!job) return <p className="pt-24 px-4">Loading job details...</p>;

  return (
    <div className="max-w-6xl mx-auto pt-24 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left - Job Info */}
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{job.title}</h1>

        <img
          src={jobImage}
          alt="job"
          className="rounded-xl w-full h-[250px] md:h-[300px] object-cover mb-6"
        />

        <p className="text-gray-600 mb-6 leading-relaxed">{job.description}</p>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Job Requirements
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right - Sidebar Info */}
      <div className="bg-white rounded-xl shadow-md border p-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {job.company}
          </h3>
          <a
            href={`https://www.${job.company
              .toLowerCase()
              .replace(" ", "")}.com`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 text-sm underline"
          >
            www.{job.company.toLowerCase().replace(" ", "")}.com
          </a>
        </div>

        <div className="text-sm text-gray-700 space-y-2">
          <p>
            <span className="font-medium text-gray-900">Job Type: </span>
            {job.type}
          </p>
          <p>
            <span className="font-medium text-gray-900">Location: </span>
            {job.location}
          </p>
          <p>
            <span className="font-medium text-gray-900">Salary: </span>
            {job.salary}
          </p>
          <p>
            <span className="font-medium text-gray-900">Posted: </span>
            {new Date(job.createdAt).toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium text-gray-900">Updated: </span>
            {new Date(job.updatedAt).toLocaleDateString()}
          </p>
        </div>

        {/* No Apply button here */}
        <div className="text-sm text-green-600 italic pt-2">
          You have already applied to this job.
        </div>
      </div>
    </div>
  );
}
