import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../CSS/Layout.css";
import { useParams } from "react-router-dom";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { username } = useParams()

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 750 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [sidebarOpen]);

  return (
    <div className="app-layout">
      <Sidebar
        className={`sidebar ${sidebarOpen ? "active" : ""}`}
        username={username}
      />


      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <main className={`main-content ${sidebarOpen ? "no-scroll" : ""}`}>
        <button
          className={`hamburger ${sidebarOpen ? "hidden" : ""}`}
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>

        <button
          className={`hamburger close ${sidebarOpen ? "" : "hidden"}`}
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>

        {children}
      </main>
    </div>
  );
};

export default Layout;
