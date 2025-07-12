import React from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const Navigate = useNavigate();

  const toOrders = () => {
    Navigate("/orders");
  };
  const toProfile = () => {
    Navigate("/profile");
  };

  return (
    <main className="flex justify-between px-12 py-4">
      <p>Farm2Market</p>

      <div>
        <span onClick={toOrders}>Orders</span>
        <span>Report Issues</span>
      </div>
      <span onClick={toProfile}>Profile</span>
    </main>
  );
};

export default Nav;
