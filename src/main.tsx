import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { StyledEngineProvider } from "@mui/material";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
        <App />
    </StyledEngineProvider>
  </React.StrictMode>
);
