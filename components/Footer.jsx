// components/Footer.jsx
"use client";

import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-blue-800 text-blue-200 py-4 px-6 mt-auto">
      <div className="max-w-5xl mx-auto flex justify-between items-center text-sm">
        <div>
          © {new Date().getFullYear()} Typing - Improve your typing speed
        </div>
        <div className="flex space-x-4">
          <span className="hover:text-white cursor-pointer transition-colors">
            Privacy
          </span>
          <span className="hover:text-white cursor-pointer transition-colors">
            Terms
          </span>
          <span className="hover:text-white cursor-pointer transition-colors">
            Contact
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
