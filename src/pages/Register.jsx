import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jobImage from "../assets/job.jpg";
import { useUser } from "../helpers/UserContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setToken, refreshUser } = useUser();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/register`,
        {
          name,
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      await refreshUser();
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 px-6">
      <div className="bg-white rounded-3xl shadow-2xl flex w-full max-w-5xl overflow-hidden">
        {/* Left illustration */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-200 to-pink-300 items-center justify-center p-10">
          <img src={jobImage} alt="Register illustration" className="w-4/5" />
        </div>

        {/* Right Register form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Join Job-Board!
          </h2>
          <p className="text-sm text-gray-500 mb-6">Create your account</p>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-gray-600 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl text-lg transition"
            >
              Register
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 font-medium">
              Login here
            </a>
          </div>

          {/* Social buttons (optional) */}
          <div className="mt-6 flex justify-center space-x-4">
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
              <i className="fab fa-facebook-f text-blue-600" />
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
              <i className="fab fa-twitter text-sky-400" />
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
              <i className="fab fa-google text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
