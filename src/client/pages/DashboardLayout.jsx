import React from "react";
import UserDashboardSidebar from "../components/UserDashboardSidebar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row">
        <UserDashboardSidebar />
        <div className="flex-1 lg:px-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
