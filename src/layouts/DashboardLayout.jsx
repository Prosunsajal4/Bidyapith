import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { NavLink, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const DashboardLayout = () => {
  return (
    <div>
      <Toaster position="top-right" />
      <header className="py-3">
        <Header></Header>
      </header>
      <main className="w-11/12 mx-auto py-10 grid md:grid-cols-4 grid-cols-1 gap-6">
        <aside className="md:col-span-1 bg-gray-100 p-4 rounded-lg h-max">
          <h3 className="font-bold mb-4">Dashboard</h3>
          <nav className="flex md:flex-col gap-3">
            <NavLink to="/dashboard/my-enrolled" className="hover:underline">
              My enrolled course
            </NavLink>
            <NavLink to="/dashboard/add-course" className="hover:underline">
              Add course
            </NavLink>
            <NavLink to="/dashboard/my-added" className="hover:underline">
              My added course
            </NavLink>
          </nav>
        </aside>
        <section className="md:col-span-3">
          <Outlet></Outlet>
        </section>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;
