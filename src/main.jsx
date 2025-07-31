import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Routes from "./routes/index.jsx";
import { UserProvider } from "./helpers/UserContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <Routes />
    </UserProvider>
  </StrictMode>
);
