import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MetalRateProvider } from "./context/MetalRateContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MetalRateProvider>
      <App />
    </MetalRateProvider>
  </StrictMode>
);