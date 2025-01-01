import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ProviderStateApp } from "./components/providers/state-app/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProviderStateApp>
      <App />
    </ProviderStateApp>
  </StrictMode>
);
