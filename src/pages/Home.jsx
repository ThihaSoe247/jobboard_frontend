import React from "react";
import JobCard from "../components/JobCard";
import { useUser } from "../helpers/UserContext";

export default function Home() {
  const { name, loading, jobs } = useUser();

  if (loading) return <p className="p-10 text-center">Loading user...</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-700">
            Welcome {name || "Guest"}
          </h1>
        </div>

        <p className="mb-6 text-gray-700">
          Find your next career opportunity or post a job to connect with top
          talent.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Feature Cards */}
          <FeatureCard
            title="Browse Jobs"
            description="Explore thousands of opportunities from top companies tailored to your skills and interests."
          />
          <FeatureCard
            title="Post a Job"
            description="Effortlessly create job listings and connect with qualified candidates in just a few steps."
          />
          <FeatureCard
            title="Apply Easily"
            description="Apply to jobs quickly with a streamlined application process designed to save you time."
          />
        </div>

        {/* Job Listings */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">
            Latest Job Listings
          </h2>
          {jobs.length === 0 ? (
            <p className="text-gray-600">No jobs available at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({ title, description }) => (
  <div className="bg-white p-5 shadow-md rounded-lg border hover:shadow-lg transition">
    <h2 className="text-xl font-semibold mb-2 text-blue-600">{title}</h2>
    <p className="text-gray-600"> {description}</p>
  </div>
);
