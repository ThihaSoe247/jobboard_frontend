import React, { useEffect, useState } from "react";
import axios from "axios";
import profileImg from "../assets/profile.png"; // ✅ your placeholder image

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data.user);
      setFormData({
        name: res.data.user.name,
        email: res.data.user.email,
        phone: res.data.user.phone || "",
      });
    } catch (e) {
      console.error("Failed to load profile", e);
    }
  };

  //   const handleUpdate = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const res = await axios.put(
  //         "/api/applicant/profile",
  //         { ...formData },
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );
  //       setProfile(res.data.user);
  //       setEditMode(false);
  //     } catch (e) {
  //       console.error("Update failed", e);
  //     }
  //   };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) return <p className="p-10">Loading profile...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-16 bg-white p-8 rounded-lg shadow-lg border">
      <div className="flex flex-col items-center mb-8">
        <img
          src={profileImg}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
        />
        <h2 className="text-2xl font-bold mt-4 text-blue-700">
          {profile.name}
        </h2>
        <p className="text-gray-500">Role: {profile.role}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="font-semibold text-gray-700">Name</label>
          {editMode ? (
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 mt-1 border rounded"
            />
          ) : (
            <p className="text-lg text-gray-800">{profile.name}</p>
          )}
        </div>

        <div>
          <label className="font-semibold text-gray-700">Email</label>
          {editMode ? (
            <input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2 mt-1 border rounded"
            />
          ) : (
            <p className="text-lg text-gray-800">{profile.email}</p>
          )}
        </div>

        <div>
          <label className="font-semibold text-gray-700">Phone</label>
          {editMode ? (
            <input
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full p-2 mt-1 border rounded"
            />
          ) : (
            <p className="text-lg text-gray-800">
              {profile.phone || "Not Provided"}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 text-right">
        {editMode ? (
          <>
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded mr-3 hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            // onClick={() => setEditMode(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
