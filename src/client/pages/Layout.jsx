import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "../components/ui/Toaster";

function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar className="flex" />
      <div className="py-24 transition-all p-2 flex-1">
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
}

export default Layout;
