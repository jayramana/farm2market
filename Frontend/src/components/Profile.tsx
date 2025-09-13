import React, { useState, useEffect } from "react";
import { useFtm } from "../store/useFtm";
import type { User } from "../types/user";

const Profile = () => {
  const { id, users, fetchUserDetails, loadingUsers, errorUsers } = useFtm();


  useEffect(() => {
    if (id) {
      fetchUserDetails(id)
    }
  }, [id,users, fetchUserDetails]);


  return (
    <main className="h-screen px-12 py-4">
      <p>{users?.user_name}</p>
      <p>{users.user_email}</p>
      <p>{users.user_phone}</p>
      <p>{users.user_role}</p>
  </main>)
};

export default Profile;
