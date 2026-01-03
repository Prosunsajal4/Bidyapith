import { useState, useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import SkillCard from "../components/SkillCard";
import SkeletonCard from "../components/SkeletonCard";
import {
  FaSearch,
  FaSortAmountDown,
  FaSortAmountUp,
  FaFilter,
} from "react-icons/fa";

const TotalSkills = () => {
  const loadedData = useLoaderData();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading] = useState(false);
  const itemsPerPage = 10;

  // Ensure data is always an array
  const data = useMemo(() => {
    return Array.isArray(loadedData) ? loadedData : [];
  }, [loadedData]);

  // Get unique categories from data
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(data.map((skill) => skill.category).filter(Boolean)),
    ];
    return ["All", ...uniqueCategories.sort()];
  }, [data]);

  // Filter, search, and sort courses
  const processedCourses = useMemo(() => {
    let result = [...data];

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter((skill) => skill.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (skill) =>
          skill.skillName?.toLowerCase().includes(query) ||
          skill.description?.toLowerCase().includes(query) ||
          skill.providerName?.toLowerCase().includes(query) ||
          skill.category?.toLowerCase().includes(query)
      );
    }

    // Filter by price range
    if (priceRange !== "all") {
      switch (priceRange) {
        case "free":
          result = result.filter((skill) => skill.price === 0);
          break;
        case "under25":
          result = result.filter(
            (skill) => skill.price > 0 && skill.price < 25
          );
          break;
        case "25to50":
          result = result.filter(
            (skill) => skill.price >= 25 && skill.price <= 50
          );
          break;
        case "over50":
          result = result.filter((skill) => skill.price > 50);
          break;
      }
    }

    // Sort courses
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "name":
        result.sort((a, b) =>
          (a.skillName || "").localeCompare(b.skillName || "")
        );
        break;
      default:
        break;
    }

    return result;
  }, [data, selectedCategory, searchQuery, priceRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(processedCourses.length / itemsPerPage);
  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return processedCourses.slice(start, start + itemsPerPage);
  }, [processedCourses, currentPage]);

  // Reset to page 1 when filters change
  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  return (
    <div className="py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold">
          <span className="text-secondary">{processedCourses.length}</span>{" "}
          Courses Available
        </h2>

        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleFilterChange(setSearchQuery, e.target.value)}
            placeholder="Search courses, instructors..."
            className="input input-bordered w-full pl-10"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" />
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-4 mb-8 p-4 bg-base-200 rounded-lg">
        {/* Category Filter */}
        <div className="flex-1 min-w-[200px]">
          <label className="label pb-1">
            <span className="label-text font-medium flex items-center gap-2">
              <FaFilter className="text-xs" /> Category
            </span>
          </label>
          <select
            value={selectedCategory}
            onChange={(e) =>
              handleFilterChange(setSelectedCategory, e.target.value)
            }
            className="select select-bordered w-full select-sm"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="flex-1 min-w-[200px]">
          <label className="label pb-1">
            <span className="label-text font-medium">Price Range</span>
          </label>
          <select
            value={priceRange}
            onChange={(e) => handleFilterChange(setPriceRange, e.target.value)}
            className="select select-bordered w-full select-sm"
          >
            <option value="all">All Prices</option>
            <option value="free">Free</option>
            <option value="under25">Under $25</option>
            <option value="25to50">$25 - $50</option>
            <option value="over50">Over $50</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="flex-1 min-w-[200px]">
          <label className="label pb-1">
            <span className="label-text font-medium flex items-center gap-2">
              {sortBy.includes("high") || sortBy === "rating" ? (
                <FaSortAmountDown className="text-xs" />
              ) : (
                <FaSortAmountUp className="text-xs" />
              )}
              Sort By
            </span>
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-bordered w-full select-sm"
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rating</option>
            <option value="name">Name: A-Z</option>
          </select>
        </div>

        {/* Clear Filters */}
        <div className="flex items-end">
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
              setPriceRange("all");
              setSortBy("default");
              setCurrentPage(1);
            }}
            className="btn btn-outline btn-sm"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Category Tags (Quick Filter) */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.slice(0, 8).map((category) => (
          <button
            key={category}
            onClick={() => handleFilterChange(setSelectedCategory, category)}
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

      {/* Courses Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[...Array(10)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : paginatedCourses.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {paginatedCourses.map((skill) => (
              <SkillCard key={skill._id || skill.skillId} skill={skill} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10">
              <div className="join">
                <button
                  className="join-item btn btn-sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  «
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`join-item btn btn-sm ${
                      currentPage === index + 1 ? "btn-active" : ""
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  className="join-item btn btn-sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  »
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No courses found</h3>
          <p className="text-accent">
            Try adjusting your filters or search terms
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
              setPriceRange("all");
              setSortBy("default");
            }}
            className="btn btn-primary mt-4"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default TotalSkills;
