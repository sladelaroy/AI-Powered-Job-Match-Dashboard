"use client";
import React from "react";
import { signOut } from "next-auth/react";

const handleClick = () => {
  signOut();
};

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <a href="/">Ai-job</a>
        </div>
        <div className="flex space-x-4">
          <button onClick={() => handleClick()} className="text-white">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
