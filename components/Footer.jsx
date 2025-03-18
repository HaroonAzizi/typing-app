// components/Footer.jsx
"use client";

import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-blue-800 text-blue-200 py-4 px-6 mt-auto">
      <div className="max-w-5xl mx-auto flex justify-between items-center text-sm">
        <div>
          © {new Date().getFullYear()} Typing by
          <a
            className="text-white hover:text-blue-400"
            href="https://haroonazizi.com"
          >
            {" "}
            Haroon Azizi
          </a>
        </div>
        <div className="flex space-x-4">
          <span className="hover:text-white cursor-pointer transition-colors">
            <a href="https://x.com/az_haroon">X/Twitter</a>
          </span>
          <span className="hover:text-white cursor-pointer transition-colors">
            <a href="https://linkedin.com/haroon-azizi">LinkedIn</a>
          </span>
          <span className="hover:text-white cursor-pointer transition-colors">
            <a href="https://haroonazizi.com/contact">Contact Me</a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
