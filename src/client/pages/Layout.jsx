import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "../components/ui/Toaster";

function Layout() {
  return (
    <div className="">
      <Navbar />
      <div className="py-24 sm:py-32 transition-all">
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
}

export default Layout;
