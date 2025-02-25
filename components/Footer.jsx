"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-60">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Ai-job. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="/about" className="hover:text-gray-400">
            About
          </a>
          <a href="/contact" className="hover:text-gray-400">
            Contact
          </a>
          <a href="/privacy" className="hover:text-gray-400">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
