import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./Portfolio";
import NotFound from "./components/NotFound";
import { LangProvider } from "./context/LangContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LangProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="*" element={<NotFound dark={true} />} />
        </Routes>
      </BrowserRouter>
    </LangProvider>
  </StrictMode>,
);
