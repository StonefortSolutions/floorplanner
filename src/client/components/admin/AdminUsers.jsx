import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserTable from "./usertable/UserTable";
import { fetchUsers } from "../../store/admin";

function AdminUsers() {
  const dispatch = useDispatch();
  const { users, user } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="container mx-auto py-10">
      <UserTable data={users} />
    </div>
  );
}

export default AdminUsers;
