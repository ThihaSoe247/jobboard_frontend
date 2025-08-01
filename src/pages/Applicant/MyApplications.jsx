import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4000/api/applicant/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApplications(res.data.applications);
      } catch (error) {
        console.error("Failed to fetch applications", error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="max-w-5xl mx-auto pt-24 px-4">
      {/* Tabs */}
      <div className="flex mb-6 border-b">
        <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600 font-medium">
          Applied
        </button>
      </div>

      {/* Applications List */}
      {applications.length === 0 ? (
        <p className="text-gray-500">You haven’t applied to any jobs yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => {
            const job = app.job;
            const appliedDaysAgo = Math.floor(
              (new Date() - new Date(app.appliedAt)) / (1000 * 60 * 60 * 24)
            );
            return (
              <div
                key={app._id}
                onClick={() =>
                  navigate(`/applicant/my-applications/${app.job._id}`)
                }
                className="cursor-pointer bg-white rounded-lg shadow border p-5 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-md transition"
              >
                <div className="flex items-start space-x-4">
                  {/* Logo placeholder */}
                  {/* <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-700">
                    {job.company[0]}
                  </div> */}

                  {/* Job info */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {job.title}
                      {app.status === "rejected" && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-red-100 text-red-600 rounded">
                          Rejected
                        </span>
                      )}
                      {app.status === "viewed" && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded">
                          Application Viewed
                        </span>
                      )}
                    </h2>
                    <p className="text-sm text-gray-600">{job.company}</p>
                    <div className="flex items-center text-sm text-gray-500 space-x-2 mt-1">
                      <span>Applied {appliedDaysAgo} days ago</span>
                    </div>
                  </div>
                </div>

                {/* Right side details */}
                <div className="mt-4 md:mt-0 text-right space-y-1">
                  <p className="text-sm font-semibold text-gray-800">
                    {job.salary}
                  </p>
                  <p className="text-sm flex items-center justify-end text-gray-500">
                    <FaMapMarkerAlt className="mr-1" />
                    {job.location}
                  </p>
                  <p className="text-sm flex items-center justify-end text-gray-500">
                    <FaClock className="mr-1" />
                    Response time – 2 days
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
