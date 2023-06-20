import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="">
      <Navbar />
      <div className="py-24 sm:py-32 transition-all">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
