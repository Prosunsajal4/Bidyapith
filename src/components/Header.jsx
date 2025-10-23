import React, { use } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { NavLink } from "react-router";
const Header = () => {
  const { user } = use(AuthContext);
  return (
    <div className="flex justify-between items-center w-11/12 mx-auto py-4 ">
      <div>
        <div className="flex flex-row items-center gap-3">
          <img src="/eshosikhi.png" className="w-[40px]" alt="" />
          <h1 className="md:text-4xl text-2xl font-bold text-primary">
            Esho <span className="text-secondary">Shikhi</span>
          </h1>
        </div>
        <p className="text-accent">Learn Something New Every Day</p>
      </div>
      <div className="flex text-accent gap-5 text-lg ">
        <NavLink to="/">Home</NavLink>
        {user && user.email && <NavLink to="/myprofile">My Profile</NavLink>}
      </div>
      <div></div>
    </div>
  );
};

export default Header;
