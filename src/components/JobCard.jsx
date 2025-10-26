import React from "react";
import { Link } from "react-router-dom";
import { MapPin, DollarSign } from "lucide-react";
import defaultLogo from "../assets/job.jpg";

export default function JobCard({ job }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 w-full max-w-sm flex flex-col">
      {/* Logo */}
      <div className="flex justify-center mb-5">
        <img
          src={job.imageUrl || defaultLogo}
          alt={job.company}
          className="h-20 w-20 object-contain rounded-full shadow-sm border border-gray-100"
        />
      </div>

      {/* Job Type */}
      <div className="flex justify-center mb-3">
        <span className="text-xs font-medium bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 px-3 py-1 rounded-full capitalize">
          {job.type}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 text-center mb-2 leading-snug">
        {job.title}
      </h3>

      {/* Company & Location */}
      <div className="flex items-center justify-center text-gray-600 text-sm mb-3 gap-2 flex-wrap text-center">
        <span className="font-medium">{job.company}</span>
        <span className="flex items-center gap-1">
          <MapPin size={14} /> {job.location}
        </span>
      </div>

      {/* Salary */}
      {job.salary && (
        <div className="flex items-center justify-center text-gray-700 font-medium mb-3 gap-1">
          <DollarSign size={14} className="text-green-600" />
          {job.salary}
        </div>
      )}

      {/* Requirements as Bullet Points */}
      {job.requirements?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">
            Requirements
          </h2>
          <ul className="list-disc list-inside text-gray-600 text-sm leading-relaxed space-y-1">
            {job.requirements.slice(0, 4).map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Description */}
      <div className="mb-6 text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Job Description
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          {job.description.slice(0, 120)}...
        </p>
      </div>

      {/* View Button */}
      <div className="mt-auto">
        <Link
          to={`/jobs/${job._id}`}
          className="w-full block text-center py-2.5 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-medium rounded-full hover:from-gray-800 hover:to-gray-700 transition-all duration-300"
        >
          View Job →
        </Link>
      </div>
    </div>
  );
}
