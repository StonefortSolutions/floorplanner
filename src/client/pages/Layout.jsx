import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
      <Navbar />
      <div className="mx-auto max-w-2xl py-24 sm:py-32 transition-all">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
