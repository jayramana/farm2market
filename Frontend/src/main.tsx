import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import Nav from "./components/Nav.tsx";
import "./index.css";
import LeftMenu from "./components/LeftMenu.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <div className="grid grid-cols-12">
        <div className="col-span-0.1">
          <LeftMenu />
        </div>
        <div className="col-span-10">
          <Nav />
        </div>
      </div>

      <App />
    </Router>
  </StrictMode>
);
