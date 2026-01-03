import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import userIcon from "/user.png";
import { AuthContext } from "../provider/AuthProvider";
import { FaSun, FaMoon, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState("light");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        setDropdownOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md transition-colors ${
      isActive
        ? "text-secondary font-semibold bg-base-200"
        : "text-accent hover:text-primary hover:bg-base-200"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-md transition-colors ${
      isActive
        ? "text-secondary font-semibold bg-base-200"
        : "text-accent hover:text-primary hover:bg-base-200"
    }`;

  return (
    <div className="w-full flex items-center justify-between gap-4">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 min-w-0 flex-shrink-0">
        <img src="/bidyapith_main.jpg" className="w-9 h-9 rounded-lg" alt="" />
        <div className="leading-tight hidden sm:block">
          <h1 className="text-xl md:text-2xl font-bold text-primary">
            Bidya <span className="text-secondary">Pith</span>
          </h1>
          <p className="text-accent text-xs md:text-sm">
            Learn Something New Every Day
          </p>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-1 text-sm lg:text-base">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/courses" className={linkClass}>
          Courses
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>
        <NavLink to="/contact" className={linkClass}>
          Contact
        </NavLink>
        {user && user.email && (
          <>
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
          </>
        )}
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-circle btn-sm btn-ghost"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <FaMoon className="text-lg" />
          ) : (
            <FaSun className="text-lg text-yellow-400" />
          )}
        </button>

        {/* User Menu (Desktop) */}
        {user ? (
          <div className="relative hidden md:block" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-base-200 transition-colors"
            >
              <img
                className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/30"
                src={user.photoURL || userIcon}
                alt=""
                title={user.displayName || "User"}
              />
              <FaChevronDown
                className={`text-xs transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-base-100 rounded-lg shadow-xl border border-base-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-base-200">
                  <p className="font-semibold truncate">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-xs text-accent truncate">{user.email}</p>
                </div>
                <Link
                  to="/myprofile"
                  className="block px-4 py-2 hover:bg-base-200 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-base-200 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/dashboard/my-enrolled"
                  className="block px-4 py-2 hover:bg-base-200 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  My Courses
                </Link>
                <hr className="my-2 border-base-200" />
                <button
                  onClick={handleLogOut}
                  className="block w-full text-left px-4 py-2 text-error hover:bg-base-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/auth/login"
            className="btn btn-primary btn-sm hidden md:flex"
          >
            Login
          </Link>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="btn btn-ghost btn-sm md:hidden"
        >
          {mobileMenuOpen ? (
            <FaTimes className="text-xl" />
          ) : (
            <FaBars className="text-xl" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-base-100 z-40 md:hidden">
          <div className="flex flex-col p-4 space-y-1">
            <NavLink
              to="/"
              className={mobileLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/courses"
              className={mobileLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              Courses
            </NavLink>
            <NavLink
              to="/about"
              className={mobileLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={mobileLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </NavLink>

            {user && user.email ? (
              <>
                <NavLink
                  to="/dashboard"
                  className={mobileLinkClass}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/myprofile"
                  className={mobileLinkClass}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Profile
                </NavLink>
                <hr className="my-2 border-base-200" />
                <div className="flex items-center gap-3 px-4 py-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={user.photoURL || userIcon}
                    alt=""
                  />
                  <div>
                    <p className="font-semibold">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-accent">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogOut();
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-error btn-sm mx-4"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth/login"
                className="btn btn-primary btn-sm mx-4 mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
