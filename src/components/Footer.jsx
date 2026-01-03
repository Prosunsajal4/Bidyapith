// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/bidyapith_main.jpg"
                alt=""
                className="h-12 w-12 rounded-lg"
              />
              <div>
                <h2 className="text-2xl font-bold">
                  Bidya <span className="text-red-500">Pith</span>
                </h2>
                <p className="text-gray-400 text-sm">
                  Learn Something New Every Day
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Empowering learners worldwide with quality education and expert
              instructors since 2020.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              <a
                href="https://facebook.com/SajalProsun"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com/prosunmukherje8"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-sky-500 flex items-center justify-center transition-colors"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com/prosunmukherjeesajal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-pink-500 flex items-center justify-center transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com/prosun-mukherjee-sajal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-700 flex items-center justify-center transition-colors"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://github.com/Prosunsajal4"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-600 flex items-center justify-center transition-colors"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h4 className="font-semibold text-lg mb-4">For Students</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dashboard/my-enrolled"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  My Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/payment-history"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Payment History
                </Link>
              </li>
              <li>
                <Link
                  to="/myprofile"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/add-course"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Become an Instructor
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-red-500 mt-1" />
                <span className="text-gray-400">Khulna</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-red-500" />
                <a
                  href="tel:+8801911572117"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  +8801911572117
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-red-500" />
                <a
                  href="mailto:prosunsajal123@gmail.com"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  prosunsajal123@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} BidyaPith. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                to="/help"
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/help"
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/help"
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
