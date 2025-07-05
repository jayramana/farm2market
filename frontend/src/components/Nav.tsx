import React from "react";
import { useNavigate } from "react-router-dom";



const Nav = () => {
    // const Navigate = useNavigate();

    return (
      <main>
          <p>Farm2Market</p>
          <div>
              <span>Orders</span>
              <span>Report Issues</span>
          </div>
          <p>Profile</p>
    </main>
  );
};

export default Nav;
