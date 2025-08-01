import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import Welcome from "../pages/Welcome.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import JobDetails from "../pages/JobDetails.jsx";
import MyApplications from "../pages/Applicant/MyApplications.jsx";
import MyJobDetails from "../pages/Applicant/MyJobDetails.jsx";
import UpgradeRequest from "../pages/Applicant/UpgradeRequest.jsx";
import RecruiterRequests from "../pages/Admin/RecruiterRequests.jsx";
import ManageUsers from "../pages/Admin/ManageUsers.jsx";
import Profile from "../pages/Profile.jsx";
import AllJobsAdmin from "../pages/Admin/AllJobsAdmin.jsx";
import CreateJob from "../pages/Recruiter/CreateJob.jsx";
import MyPostedJobs from "../pages/Recruiter/MyPostedJobs.jsx";
import Apply from "../pages/Applicant/Apply.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/",
    element: <App />,
    children: [
      { path: "home", element: <Home /> },

      { path: "/jobs/:id", element: <JobDetails /> },
      { path: "/applicant/my-applications", element: <MyApplications /> },
      { path: "/applicant/profile", element: <Profile /> },
      { path: "/recruiter/profile", element: <Profile /> },
      { path: "/recruiter/create-job", element: <CreateJob /> },
      { path: "/recruiter/my-posted-jobs", element: <MyPostedJobs /> },

      { path: "/admin/profile", element: <Profile /> },

      { path: "/admin/profile", element: <Profile /> },

      { path: "/admin/all-jobs", element: <AllJobsAdmin /> },

      {
        path: "/applicant/my-applications/:jobId",
        element: <MyJobDetails />,
      },
      { path: "/applicant/upgrade", element: <UpgradeRequest /> },

      {
        path: "/jobs/:id/apply",
        element: <Apply />,
      },

      { path: "/admin/recruiter-requests", element: <RecruiterRequests /> },
      { path: "/admin/manage-users", element: <ManageUsers /> },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
