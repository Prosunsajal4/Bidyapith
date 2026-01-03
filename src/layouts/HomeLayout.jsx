import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSlider from "../components/HeroSlider";
import TopRatedProviders from "../components/TopRatedProviders";
import HowItWorks from "../components/HowItsWorks";
import Testimonials from "../pages/Testimonials";
import FeaturesSection from "../components/sections/FeaturesSection";
import StatisticsSection from "../components/sections/StatisticsSection";
import FAQSection from "../components/sections/FAQSection";
import NewsletterSection from "../components/sections/NewsletterSection";
import CTASection from "../components/sections/CTASection";
import CategoriesSection from "../components/sections/CategoriesSection";
import { Toaster } from "react-hot-toast";

const HomeLayout = () => {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  const isMyProfile = pathname === "/myprofile";

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-base-100/95 backdrop-blur-sm shadow-sm">
        <nav className="w-11/12 mx-auto py-4">
          <Navbar />
        </nav>
      </header>

      {/* Hero Section - Only on Home */}
      {isHomePage && (
        <div>
          <HeroSlider />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <div className="w-11/12 mx-auto my-3 gap-5">
          <Outlet />
        </div>
      </main>

      {/* Additional Sections - Only on Home Page */}
      {isHomePage && (
        <>
          {/* Section 2: Features */}
          <FeaturesSection />

          {/* Section 3: Categories */}
          <CategoriesSection />

          {/* Section 4: Statistics */}
          <StatisticsSection />

          {/* Section 5: Top Rated Providers/Instructors */}
          <TopRatedProviders />

          {/* Section 6: How It Works */}
          <HowItWorks />

          {/* Section 7: Testimonials */}
          <Testimonials />

          {/* Section 8: FAQ */}
          <FAQSection />

          {/* Section 9: Newsletter */}
          <NewsletterSection />

          {/* Section 10: CTA */}
          <CTASection />
        </>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomeLayout;
