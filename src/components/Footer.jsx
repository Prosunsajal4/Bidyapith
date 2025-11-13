// Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <img src="/bidyapith_main.jpg" alt="" className="h-20" />
            <h2 className="text-2xl font-bold mt-2">
              Bidya <span className="text-red-500">Pith</span>
            </h2>
            <p className="text-gray-400">Learn Something New Every Day</p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {/* Personal Links */}
            <div>
              <h4 className="font-semibold mb-3">My Links</h4>
              <ul>
                <li>
                  <a
                    href="https://itsprosun.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-500"
                  >
                    Portfolio
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/prosun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-500"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/prosun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-500"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/prosun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-500"
                  >
                    X
                  </a>
                </li>
              </ul>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-semibold mb-3">Navigation</h4>
              <ul>
                <li>
                  <a href="/" className="hover:text-red-500">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-red-500">
                    About
                  </a>
                </li>
                <li>
                  <a href="/news" className="hover:text-red-500">
                    News
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-red-500">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold mb-3">Follow Me</h4>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com/prosun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm bg-gray-700 hover:bg-red-500"
                >
                  FB
                </a>
                <a
                  href="https://instagram.com/prosun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm bg-gray-700 hover:bg-red-500"
                >
                  IG
                </a>
                <a
                  href="https://linkedin.com/in/prosun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm bg-gray-700 hover:bg-red-500"
                >
                  LI
                </a>
                <a
                  href="https://x.com/prosun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm bg-gray-700 hover:bg-red-500"
                >
                  X
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-5 text-center text-gray-400">
          &copy; {new Date().getFullYear()} BidyaPith. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
