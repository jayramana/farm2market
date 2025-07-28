import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFtm } from "../store/useFtm";
const Nav = () => {
  const { id,users, fetchUserDetails, loadingUsers } = useFtm();

  const [name,setName] = useState("")
  useEffect(() => {
    fetchUserDetails(id);
  }, [id, fetchUserDetails]);

  useEffect(() => {
    if(!loadingUsers && users.user_name)
    setName(users.user_name);
  }, [users.user_name,loadingUsers]);
  const Navigate = useNavigate();

  const toOrders = () => {
    Navigate("/orders");
  };
  const toProfile = () => {
    Navigate("/profile");
  };

  return (
    <main className="col-span-2 flex justify-between px-12 py-4">
      <p>Farm2Market</p>

      <div>
        <span onClick={toOrders}>Orders</span>
        <span>Report Issues</span>
      </div>
      <span onClick={toProfile}>{name}</span>
    </main>
  );
};

export default Nav;
