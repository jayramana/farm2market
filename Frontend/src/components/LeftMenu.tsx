import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LeftMenu = () => {
    const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    
    const redirectosearch = () => {
        navigate("/browse");
    }
    const redirectorders = () => {
        navigate("/orders");
    }
    const redirectoprofile = () => {
        navigate("/profile");
    }
  const redirectowishlist = () => {
    navigate("/wishlist");
  }

  return (
    <div className="relative">
      <button
        className="p-4 w-fit z-50 relative focus:outline-none"
        onClick={toggleMenu}
      >
        <div className="w-6 h-0.5 bg-black mb-1 transition-all" />
        <div className="w-6 h-0.5 bg-black mb-1 transition-all" />
        <div className="w-6 h-0.5 bg-black transition-all" />
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-48 bg-gray-800 text-white p-6 transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6">Menu</h2>
        <ul className="space-y-4">
          <li className="hover:text-gray-300 cursor-pointer" onClick={redirectosearch}>Browse</li>
          <li className="hover:text-gray-300 cursor-pointer" onClick={redirectorders}>My Orders</li>
          <li className="hover:text-gray-300 cursor-pointer" onClick={redirectowishlist}>My Wishlist</li>
          <li className="hover:text-gray-300 cursor-pointer" onClick={redirectoprofile}>My Profile</li>
        </ul>
      </div>

      {/* Optional overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleMenu}
        />
      )}
    </div>
  );
};

export default LeftMenu;
