import React, { use } from "react";
import { Link, NavLink } from "react-router";
import userIcon from "/user.png";
import { AuthContext } from "../provider/AuthProvider";
const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const handleLogOut = () => {
    console.log("user trying to LogOut");
    logOut()
      .then(() => {
        alert("You Logged Out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex justify-between items-center">
      <div className=""></div>

      <div className="login-btn flex gap-5">
        <Link to="/myprofile">
          <img
            className="w-12 rounded-full"
            src={`${user ? user.photoURL : userIcon}`}
            alt=""
          />
        </Link>
        {user ? (
          <button onClick={handleLogOut} className="btn btn-primary px-10 ">
            LogOut
          </button>
        ) : (
          <Link to="/auth/login" className="btn btn-primary px-10 ">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
