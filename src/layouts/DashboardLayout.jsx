import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  FaBookOpen,
  FaPlusCircle,
  FaListAlt,
  FaCreditCard,
  FaHome,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import userIcon from "/user.png";

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState("light");
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
    logOut().catch((error) => console.log(error));
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive ? "bg-primary text-white" : "hover:bg-base-300"
    }`;

  const sidebarLinks = [
    { to: "/dashboard/overview", icon: <FaHome />, label: "Overview" },
    {
      to: "/dashboard/my-enrolled",
      icon: <FaBookOpen />,
      label: "My Enrolled",
    },
    {
      to: "/dashboard/add-course",
      icon: <FaPlusCircle />,
      label: "Add Course",
    },
    { to: "/dashboard/my-added", icon: <FaListAlt />, label: "My Courses" },
    {
      to: "/dashboard/payment-history",
      icon: <FaCreditCard />,
      label: "Payments",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      <Toaster position="top-right" />

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-base-100 border-b border-base-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left - Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="btn btn-ghost btn-sm md:hidden"
            >
              {sidebarOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/bidyapith_main.jpg"
                className="w-8 h-8 rounded-lg"
                alt=""
              />
              <span className="font-bold text-lg text-primary hidden sm:block">
                Bidya<span className="text-secondary">Pith</span>
              </span>
            </Link>
          </div>

          {/* Center - Breadcrumb */}
          <div className="hidden md:block">
            <div className="text-sm breadcrumbs">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li className="text-primary font-medium">Dashboard</li>
              </ul>
            </div>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-circle btn-sm btn-ghost"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <FaMoon />
              ) : (
                <FaSun className="text-yellow-400" />
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-base-200 transition-colors"
              >
                <img
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/30"
                  src={user?.photoURL || userIcon}
                  alt=""
                />
                <FaChevronDown
                  className={`text-xs transition-transform hidden sm:block ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-base-100 rounded-lg shadow-xl border border-base-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-base-200">
                    <p className="font-semibold truncate">
                      {user?.displayName || "User"}
                    </p>
                    <p className="text-xs text-accent truncate">
                      {user?.email}
                    </p>
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
                    Dashboard Home
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
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
          fixed md:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 
          bg-base-200 border-r border-base-300 p-4 transition-transform duration-300
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }
        `}
        >
          <div className="flex flex-col h-full">
            {/* User Info */}
            <div className="flex items-center gap-3 p-3 bg-base-100 rounded-lg mb-4">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={user?.photoURL || userIcon}
                alt=""
              />
              <div className="min-w-0">
                <p className="font-semibold truncate">
                  {user?.displayName || "User"}
                </p>
                <p className="text-xs text-accent truncate">{user?.email}</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
              {sidebarLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={navLinkClass}
                  onClick={() => setSidebarOpen(false)}
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Back to Home */}
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 mt-4 rounded-lg bg-base-100 hover:bg-base-300 transition-colors"
            >
              <FaHome />
              Back to Home
            </Link>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
