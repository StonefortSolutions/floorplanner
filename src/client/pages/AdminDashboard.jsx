import React from "react";
import { useClerk } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import Navbar from "../components/Navbar";
import { Toaster } from "../components/ui/Toaster";

function AdminDashboard() {
  const { user } = useClerk();
  const isUserAdmin = user?.publicMetadata?.isAdmin;
  if (!isUserAdmin) {
    return <div>Not Authorized</div>;
  }
  return (
    <div className="flex flex-col h-[98vh]">
      <Navbar className="flex" />
      <div className="mt-24 flex-1">
        <div className="flex flex-col md:flex-row">
          <AdminSidebar />
          <div className="flex-1 lg:px-2">
            <Outlet />
            <Toaster />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
