import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSlider from "../components/HeroSlider";
import TopRatedProviders from "../components/TopRatedProviders";
import HowItWorks from "../components/HowItsWorks";
import Testimonials from "../pages/Testimonials";
import { Toaster } from "react-hot-toast";

const HomeLayout = () => {
  return (
    <div>
      <Toaster position="top-right" />
      <header>
        <Header></Header>

        <nav className="w-11/12 mx-auto my-3">
          <Navbar></Navbar>
        </nav>
      </header>
      <div className="">
        <HeroSlider />
      </div>
      <main className="w-11/12 mx-auto my-3 gap-5">
        <Outlet />
      </main>
      <TopRatedProviders />
      <HowItWorks />
      <Testimonials></Testimonials>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
