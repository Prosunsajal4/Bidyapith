import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaPlay } from "react-icons/fa";

const CTASection = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="w-11/12 max-w-6xl mx-auto">
        <div className="card bg-gradient-to-br from-base-200 to-base-300 shadow-2xl overflow-hidden">
          <div className="card-body md:flex-row items-center gap-8 p-8 md:p-12">
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your{" "}
                <span className="text-secondary">Learning Journey</span>?
              </h2>
              <p className="text-accent mb-6 max-w-xl">
                Join thousands of students already learning on BidyaPith. Get
                access to high-quality courses, expert instructors, and a
                supportive community.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/courses" className="btn btn-primary btn-lg gap-2">
                  Browse Courses
                  <FaArrowRight />
                </Link>
                <Link
                  to="/auth/register"
                  className="btn btn-outline btn-lg gap-2"
                >
                  <FaPlay />
                  Get Started Free
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 mt-8 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-accent">15,000+ Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-accent">30+ Courses</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-accent">4.8/5 Rating</span>
                </div>
              </div>
            </div>

            {/* Right Image/Illustration */}
            <div className="flex-shrink-0 hidden md:block">
              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                  <img
                    src="/bidyapith_main.jpg"
                    alt="Start Learning"
                    className="w-48 h-48 rounded-full object-cover shadow-xl"
                  />
                </div>
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  🎓 Learn Today
                </div>
                <div className="absolute -bottom-4 -left-4 bg-secondary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  ✨ Grow Tomorrow
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
