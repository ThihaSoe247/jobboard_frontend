// src/pages/Recruiter/JobApplicantsModal.jsx
import React from "react";

export default function ApplicantsModal({ job, applicants, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden transition-transform duration-300 scale-100 animate-fadeIn">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-8 py-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-5 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="mb-2">
            <h2 className="text-2xl font-bold">
              Applicants for "{job?.title}"
            </h2>
          </div>

          <div className="mt-2">
            <span className="inline-flex items-center px-4 py-1 bg-white/20 rounded-full text-sm">
              <span className="w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse"></span>
              {applicants.length}{" "}
              {applicants.length === 1 ? "Applicant" : "Applicants"}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 max-h-[70vh] overflow-y-auto space-y-6">
          {applicants.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857..."
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700">
                No Applications Yet
              </h3>
              <p className="text-gray-500 mt-2 max-w-md mx-auto">
                This job has not received any applications yet. Share the
                posting to attract applicants.
              </p>
            </div>
          ) : (
            applicants.map((app) => (
              <div
                key={app._id}
                className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-xl transition-all hover:scale-[1.01] p-6"
              >
                <div className="flex justify-between items-start">
                  {/* Left - Avatar and Info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow">
                      {app.applicant.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {app.applicant.name}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {app.applicant.email}
                      </p>
                    </div>
                  </div>

                  {/* Right - Resume Button */}
                  <a
                    href={app.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-3-3h-1v-2a3 3 0 00-3-3H9a3 3 0 00-3 3v2H5a3 3 0 00-3 3v2h5m5 0v-4m0 0a3 3 0 110-6 3 3 0 010 6z"
                      />
                    </svg>
                    View Resume
                  </a>
                </div>

                {/* Cover Letter */}
                <div className="mt-4 p-4 bg-gray-50 rounded-xl border">
                  <p className="text-gray-700 text-sm whitespace-pre-wrap">
                    {app.coverLetter}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Entry Animation */}
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.4s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}
