import React from "react";
import { Link } from "react-router-dom";
import {
  FaMusic,
  FaLanguage,
  FaPaintBrush,
  FaUtensils,
  FaLaptopCode,
  FaPalette,
  FaHeartbeat,
  FaBullhorn,
} from "react-icons/fa";

const CategoriesSection = () => {
  // Total 30 courses distributed across 8 categories
  const categories = [
    {
      icon: <FaLaptopCode className="text-3xl" />,
      name: "Technology",
      count: 5,
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <FaLanguage className="text-3xl" />,
      name: "Language",
      count: 4,
      color: "from-green-500 to-green-600",
    },
    {
      icon: <FaMusic className="text-3xl" />,
      name: "Music",
      count: 3,
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <FaPaintBrush className="text-3xl" />,
      name: "Art",
      count: 4,
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: <FaUtensils className="text-3xl" />,
      name: "Cooking",
      count: 4,
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: <FaPalette className="text-3xl" />,
      name: "Design",
      count: 3,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: <FaHeartbeat className="text-3xl" />,
      name: "Health",
      count: 4,
      color: "from-red-500 to-red-600",
    },
    {
      icon: <FaBullhorn className="text-3xl" />,
      name: "Marketing",
      count: 3,
      color: "from-teal-500 to-teal-600",
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="w-11/12 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore <span className="text-secondary">Categories</span>
          </h2>
          <p className="text-accent max-w-2xl mx-auto">
            Browse through our diverse range of course categories and find your
            passion
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/courses?category=${category.name}`}
              className="group"
            >
              <div className="card bg-base-200 hover:bg-base-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="card-body items-center text-center p-4 md:p-6">
                  <div
                    className={`p-4 rounded-xl bg-gradient-to-br ${category.color} text-white mb-3 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-sm md:text-base">
                    {category.name}
                  </h3>
                  <span className="text-xs text-accent">
                    {category.count} Courses
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/courses" className="btn btn-outline btn-primary">
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
