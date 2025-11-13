import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { NavLink } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

const Header = () => {
  const { user } = useContext(AuthContext);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Get theme from localStorage or default to light
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="flex justify-between items-center w-11/12 mx-auto py-4 ">
      <div>
        <div className="flex flex-row items-center gap-3">
          <img src="/bidyapith_main.jpg" className="w-[40px]" alt="" />
          <h1 className="md:text-4xl text-2xl font-bold text-primary">
            Bidya <span className="text-secondary">Pith</span>
          </h1>
        </div>
        <p className="text-accent">Learn Something New Every Day</p>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex text-accent gap-5 text-lg ">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          {user && user.email && <NavLink to="/myprofile">My Profile</NavLink>}
        </div>
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="btn btn-circle btn-sm btn-ghost"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <FaMoon className="text-xl" />
          ) : (
            <FaSun className="text-xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
