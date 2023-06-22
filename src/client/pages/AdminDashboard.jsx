import React from "react";
import { useClerk } from "@clerk/clerk-react";

function AdminDashboard() {
  const { user } = useClerk();
  const isUserAdmin = user?.publicMetadata?.isAdmin;
  if (!isUserAdmin) {
    return <div>Not Authorized</div>;
  }
  return <div>AdminDashboard</div>;
}

export default AdminDashboard;
