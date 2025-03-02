import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";

import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>

      <BrowserRouter>
      <UserContextProvider>
      <App />
      </UserContextProvider>
      </BrowserRouter>

  </StrictMode>
);
