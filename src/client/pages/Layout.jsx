import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "../components/ui/Toaster";

function Layout() {
  return (
    <div className="flex flex-col h-[98vh]">
      <Navbar className="flex" />
      <div className="mt-24 flex-1">
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
}

export default Layout;
