import { useState, useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import SkillCard from "../components/SkillCard";

const TotalSkills = () => {
  const loadedData = useLoaderData();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Ensure data is always an array
  const data = useMemo(() => {
    return Array.isArray(loadedData) ? loadedData : [];
  }, [loadedData]);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(data.map((skill) => skill.category))];
    return ["All", ...uniqueCategories.sort()];
  }, [data]);

  // Filter courses by category
  const filteredCourses = useMemo(() => {
    if (selectedCategory === "All") {
      return data;
    }
    return data.filter((skill) => skill.category === selectedCategory);
  }, [data, selectedCategory]);

  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold mb-5">
        Total <span className="text-secondary">{filteredCourses.length}</span>{" "}
        Popular Courses
      </h2>

      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3 text-accent">
          Filter by Category:
        </h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`btn btn-sm ${
                selectedCategory === category
                  ? "btn-primary"
                  : "btn-outline btn-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
          {filteredCourses.map((skill) => (
            <SkillCard
              key={skill._id || skill.skillId}
              skill={skill}
            ></SkillCard>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-accent text-lg">
            No courses found in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default TotalSkills;
