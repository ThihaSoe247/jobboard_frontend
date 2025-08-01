// src/pages/Recruiter/CreateJob.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../helpers/UserContext";

export default function CreateJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [type, setType] = useState("full-time");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { token, setJobs, jobs } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/recruiter/jobs/create`,
        {
          title,
          company,
          location,
          salary,
          type,
          description,
          requirements: requirements
            .split("\n")
            .map((item) => item.trim())
            .filter((item) => item !== ""),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMsg("✅ Job posted successfully!");
      setTitle("");
      setCompany("");
      setSalary("");
      setLocation("");
      setType("");
      setDescription("");
      setRequirements("");

      setErrorMsg("");

      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        "Something went wrong while creating the job.";
      setErrorMsg(`❌ ${msg}`);
      setSuccessMsg("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Job</h2>

      {successMsg && (
        <div className="p-3 mb-4 rounded-md bg-green-100 text-green-700 font-medium border border-green-300">
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="p-3 mb-4 rounded-md bg-red-100 text-red-700 font-medium border border-red-300">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Salary (e.g. 40k - 60k)"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="internship">Internship</option>
        </select>
        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded h-24"
          required
        />
        <textarea
          placeholder="Requirements (one per line)"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          className="w-full border p-2 rounded h-24"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}
