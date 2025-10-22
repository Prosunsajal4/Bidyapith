import React, { use } from "react";
import { format } from "date-fns";
import { AuthContext } from "../provider/AuthProvider";
import { NavLink } from "react-router";
const Header = () => {
  const { user } = use(AuthContext);
  return (
    <div className="flex justify-center flex-col items-center gap-3 ">
      <p className="text-accent">Journalism Without Fear or Favour</p>
      <p className="font-semibold text-accent">
        {format(new Date(), "EEEE , MMMM MM , yyyy")}
      </p>
      <div className="nav flex gap-5 text-accent">
        <NavLink to="/">Home</NavLink>
        {user && user.email && <NavLink to="/myprofile">My Profile</NavLink>}
      </div>
    </div>
  );
};

export default Header;
