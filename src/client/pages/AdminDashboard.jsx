import React from "react";
import { useClerk } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

function AdminDashboard() {
  const { user } = useClerk();
  const isUserAdmin = user?.publicMetadata?.isAdmin;
  if (!isUserAdmin) {
    return <div>Not Authorized</div>;
  }
  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row">
        <AdminSidebar />
        <div className="flex-1 lg:px-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
