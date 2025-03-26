"use client";

import { useState } from "react";
import TypingTest from "../components/TypingTest";
import {
  FaGithub,
  FaLinkedin,
  FaCode,
  FaTerminal,
  FaEnvelope,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-theme-primary flex flex-col">
      {/* Navigation */}
      <nav className="fixed w-full bg-theme-primary/95 shadow-lg border-b border-theme-accent/10 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              href="https://haroonazizi.com"
              className="text-2xl font-bold bg-gradient-to-r from-theme-accent to-theme-accent-light bg-clip-text text-transparent flex items-center"
            >
              <FaCode className="mr-2 text-theme-accent" />
              <span className="font-mono">HaroonAzizi</span>
            </Link>

            {/* Contact Button and Social Links */}
            <div className="flex items-center space-x-6">
              {/* Social Links with tooltips */}
              <div className="hidden md:flex items-center space-x-4 mr-4">
                {/* Social links here... */}
              </div>

              {/* Contact Button - Fixed for smaller screens */}
              <a
                href="https://haroonazizi.com/contact"
                className="bg-theme-accent hover:bg-theme-accent-light text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center whitespace-nowrap text-sm md:text-base"
              >
                <FaEnvelope className="mr-2" />
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="animate-float-slow absolute top-1/4 left-1/4 w-96 h-96 bg-theme-accent rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="animate-float-medium absolute top-1/3 right-1/4 w-80 h-80 bg-theme-accent-light rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="animate-float-fast absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="terminal p-1 inline-block mb-6">
              <div className="flex items-center px-2 py-1">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 text-xs text-theme-text-muted font-mono">
                  ~/haroon/typing-test.js
                </div>
              </div>
              <div className="p-4 font-mono">
                <span className="text-theme-text-muted">const </span>
                <span className="text-theme-accent">typingTest</span>
                <span className="text-white"> = </span>
                <h1 className="inline text-4xl md:text-6xl font-bold">
                  <span className="bg-gradient-to-r from-theme-accent to-theme-accent-light bg-clip-text text-transparent">
                    Typing Test
                  </span>
                </h1>
              </div>
            </div>
            <p className="text-xl md:text-2xl text-theme-text mb-8 animate-fade-in animate-matrix">
              Test your typing speed and accuracy
            </p>
          </div>

          <div className="glass-card p-6">
            <TypingTest />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-theme-accent/10 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link
                href="https://haroonazizi.com"
                className="text-xl font-bold bg-gradient-to-r from-theme-accent to-theme-accent-light bg-clip-text text-transparent"
              >
                HaroonAzizi
              </Link>
              <p className="text-theme-text-muted text-sm mt-1">
                © {new Date().getFullYear()} All rights reserved
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://x.com/az_haroon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-theme-text-muted hover:text-theme-accent transition-colors"
              >
                <FaSquareXTwitter size={20} />
              </a>
              <a
                href="https://github.com/HaroonAzizi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-theme-text-muted hover:text-theme-accent transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://linkedin.com/in/Haroon-Azizi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-theme-text-muted hover:text-theme-accent transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
