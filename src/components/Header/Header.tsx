import React from "react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-900/90 backdrop-blur-lg border-b border-white/10">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-12">
            <a
              href="#"
              className="text-2xl font-bold group text-white transition-colors duration-300"
            >
              <span className="group-hover:text-brand">Trade</span>
              <span className="text-brand group-hover:text-white">
                Flow
              </span>
            </a>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-sm font-medium text-white hover:text-blue-500 transition-colors duration-300"
              >
                Home
              </a>
              <a
                href="#features"
                className="text-sm font-medium text-white hover:text-blue-500 transition-colors duration-300"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-sm font-medium text-white hover:text-blue-500 transition-colors duration-300"
              >
                Pricing
              </a>
              <a
                href="#about"
                className="text-sm font-medium text-white hover:text-blue-500 transition-colors duration-300"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-sm font-medium text-white hover:text-blue-500 transition-colors duration-300"
              >
                Contact
              </a>
            </div>
          </div>
          <button className="hidden md:block px-6 py-2 bg-brand text-white font-medium rounded-lg  transition-all duration-300">
            Schedule a Demo
          </button>
          <button className="md:hidden text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
