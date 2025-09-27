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

  const Home = () => {
    Navigate("/")
  }
  const toOrders = () => {
    Navigate("/orders");
  };
  const toProfile = () => {
    Navigate("/profile");
  };

  return (
    <main className="col-span-2 flex justify-between px-12 py-4">
      <p onClick={Home} className="hover:cursor-pointer">Farm2Market</p>

      <div className="flex gap-2">
        <span onClick={toOrders} className="hover:cursor-pointer">Orders</span>
        <span>Report Issues</span>
      </div>
      <span onClick={toProfile}>{name}</span>
    </main>
  );
};

export default Nav;
