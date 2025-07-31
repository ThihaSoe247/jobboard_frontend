import React from "react";
import { Link } from "react-router-dom";
import defaultLogo from "../assets/job.jpg";

export default function JobCard({ job }) {
  return (
    <div className="bg-white rounded-xl shadow-md border-green-300 p-5 max-w-sm w-full hover:shadow-lg transition flex flex-col">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img
          src={job.imageUrl || defaultLogo}
          alt={job.company}
          className="h-20 w-20 object-contain"
        />
      </div>

      {/* Type */}
      <div className="flex gap-2 text-sm mb-1">
        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full capitalize">
          {job.type}
        </span>
        {/* Remove approval badge */}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold mb-1 text-gray-800">{job.title}</h3>

      {/* Company & Location */}
      <div className="text-gray-600 text-sm mb-2">
        <span className="font-medium">{job.company}</span> — {job.location}
      </div>

      {/* Salary */}
      {job.salary && (
        <div className="text-gray-800 font-medium mb-2">{job.salary}</div>
      )}

      {/* Tags from requirements */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.requirements.slice(0, 3).map((req, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700"
          >
            {req}
          </span>
        ))}
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Job Description
        </h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          Description: {job.description.slice(0, 120)}...
        </p>
      </div>

      {/* View Button */}
      <div className="mt-auto pt-4">
        <Link
          to={`/jobs/${job._id}`}
          className="block text-center w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition"
        >
          View Job →
        </Link>
      </div>
    </div>
  );
}
