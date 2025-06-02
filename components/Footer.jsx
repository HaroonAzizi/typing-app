"use client";

import React from "react";
import { FaSquareXTwitter, FaGithub, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-theme-primary py-8 border-t border-theme-accent/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-theme-text-muted text-sm">
            <span className="font-mono">
              © {new Date().getFullYear()}{" "}
              <a className="hover: text-white" href="https://haroonazizi.com">
                Haroon Azizi
              </a>
              .{" "}
            </span>
            <span className="font-mono text-xs">
              {" "}
              Developed and maintained by{" "}
            </span>

            <span className="font-mono">
              <a className="hover: text-white" href="https://code.af">
                code.af
              </a>
              .{" "}
            </span>
          </div>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a
              href="https://x.com/az_haroon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-theme-text-muted hover:text-theme-accent transition-colors flex items-center space-x-2"
            >
              <FaSquareXTwitter size={20} />
              {/* <span className="font-mono text-sm">X/Twitter</span> */}
            </a>
            <a
              href="https://github.com/HaroonAzizi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-theme-text-muted hover:text-theme-accent transition-colors flex items-center space-x-2"
            >
              <FaGithub size={20} />
              {/* <span className="font-mono text-sm">GitHub</span> */}
            </a>
            <a
              href="https://www.linkedin.com/in/haroon-azizi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-theme-text-muted hover:text-theme-accent transition-colors flex items-center space-x-2"
            >
              <FaLinkedin size={20} />
              {/* <span className="font-mono text-sm">LinkedIn</span> */}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
