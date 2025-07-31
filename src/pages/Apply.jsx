// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import defaultImage from "../assets/job.jpg";
// import { Navigate } from "react-router-dom";
// export default function Apply() {
//   const { id } = useParams();
//   const [user, setUser] = useState(null);

//   const [job, setJob] = useState(null);
//   const [resumeUrl, setResumeUrl] = useState("");
//   const [coverLetter, setCoverLetter] = useState("");
//   const [message, setMessage] = useState("");
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (token) {
//       try {
//         const payload = JSON.parse(atob(token.split(".")[1]));
//         setUser(payload);
//         console.log("payload :>> ", payload);
//       } catch (e) {
//         console.error("Invalid token:", e);
//       }
//     }
//     axios
//       .get(`/api/jobs/${id}`)
//       .then((res) => setJob(res.data.job))
//       .catch((err) => console.error("Failed to fetch job:", err));
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!resumeUrl.trim()) {
//       alert("Please provide your resume link or text!");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         `/api/applicant/${id}/apply`,
//         {
//           resumeUrl,
//           coverLetter,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setMessage("✅ Application submitted successfully!");

//       setTimeout(() => {
//         navigate("/home");
//       }, 2000);
//     } catch (err) {
//       console.error("Application failed:", err.response?.data || err.message);
//       setMessage(
//         err.response?.data?.error || "❌ Failed to submit application."
//       );
//     }
//   };

//   if (!job) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 py-10 px-4">
//       <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
//         {/* Job Summary */}
//         <div className="mb-6 flex flex-col md:flex-row gap-6">
//           <img
//             src={job.imageUrl || defaultImage}
//             alt={job.title}
//             className="w-full md:w-64 h-40 object-cover rounded-lg shadow"
//           />
//           <div>
//             <h2 className="text-3xl font-bold text-blue-800 mb-1">
//               {job.title}
//             </h2>
//             <p className="text-gray-700 font-medium mb-1">
//               {job.company} — {job.location}
//             </p>
//             <div className="text-sm text-gray-600 mb-2 capitalize">
//               {job.type}
//             </div>
//             {job.salary && (
//               <div className="text-green-600 font-semibold text-lg">
//                 {job.salary}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Resume Field */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Resume (Link or Text)
//             </label>
//             <input
//               type="text"
//               value={resumeUrl}
//               onChange={(e) => setResumeUrl(e.target.value)}
//               placeholder="Paste resume link or write your resume here..."
//               className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>

//           {/* Cover Letter */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Cover Letter
//             </label>
//             <textarea
//               rows="6"
//               value={coverLetter}
//               onChange={(e) => setCoverLetter(e.target.value)}
//               className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Explain why you're a great fit for this job..."
//               required
//             ></textarea>
//           </div>

//           {/* Submit Button */}
//           <div className="text-center">
//             <button
//               type="submit"
//               className="bg-green-600 text-white px-6 py-3 rounded-full text-lg hover:bg-green-700 transition"
//             >
//               Submit Application
//             </button>
//           </div>
//         </form>

//         {/* Response Message */}
//         {message && (
//           <p className="mt-6 text-center text-lg font-medium text-blue-700">
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import defaultImage from "../assets/job.jpg";

export default function Apply() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [job, setJob] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload);
      } catch (e) {
        console.error("Invalid token:", e);
      }
    }
    axios
      .get(`/api/jobs/${id}`)
      .then((res) => setJob(res.data.job))
      .catch((err) => console.error("Failed to fetch job:", err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeUrl.trim()) {
      alert("Please provide your resume link or text!");
      return;
    }

    try {
      const res = await axios.post(
        `/api/applicant/${id}/apply`,
        {
          resumeUrl,
          coverLetter,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Application submitted successfully!");

      setTimeout(() => {
        setMessage("");
        navigate("/home");
      }, 4000);
    } catch (err) {
      console.error("Application failed:", err.response?.data || err.message);
      setMessage(
        err.response?.data?.error || "❌ Failed to submit application."
      );
    }
  };

  if (!job) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <div className="mb-6 flex flex-col md:flex-row gap-6">
          <img
            src={job.imageUrl || defaultImage}
            alt={job.title}
            className="w-full md:w-64 h-40 object-cover rounded-lg shadow"
          />
          <div>
            <h2 className="text-3xl font-bold text-blue-800 mb-1">
              {job.title}
            </h2>
            <p className="text-gray-700 font-medium mb-1">
              {job.company} — {job.location}
            </p>
            <div className="text-sm text-gray-600 mb-2 capitalize">
              {job.type}
            </div>
            {job.salary && (
              <div className="text-green-600 font-semibold text-lg">
                {job.salary}
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Resume (Link or Text)
            </label>
            <input
              type="text"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              placeholder="Paste resume link or write your resume here..."
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Cover Letter
            </label>
            <textarea
              rows="6"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Explain why you're a great fit for this job..."
              required
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-full text-lg hover:bg-green-700 transition"
            >
              Submit Application
            </button>
          </div>
        </form>

        {message && (
          <div className="mt-8 text-center">
            <div className="bg-blue-100 border border-blue-300 text-blue-700 px-6 py-4 rounded-lg inline-block shadow">
              <p className="text-lg font-semibold">{message}</p>
              <div className="mt-4 space-x-4">
                <button
                  onClick={() => navigate("/home")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Go to Home
                </button>
                <button
                  onClick={() => navigate("/applied-jobs")}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  View Applied Jobs
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
