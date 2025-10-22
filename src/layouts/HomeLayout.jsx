import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomeLayout = () => {
  return (
    <div>
      <header>
        <Header></Header>

        <nav className="w-11/12 mx-auto my-3">
          <Navbar></Navbar>
        </nav>
      </header>
      <main className="w-11/12 mx-auto my-3 gap-5">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
