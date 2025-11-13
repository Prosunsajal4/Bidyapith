import React, { useState, useContext } from "react";
import { coursesAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../provider/AuthProvider";

const AddCourse = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    skillName: "",
    description: "",
    price: "",
    category: "",
    image: "",
    slotsAvailable: "",
    rating: "4.5",
  });

  const categories = [
    "Music",
    "Language",
    "Art",
    "Cooking",
    "Technology",
    "Design",
    "Health",
    "Marketing",
    "Communication",
    "Productivity",
    "Writing",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to add a course");
      return;
    }

    // Validation
    if (
      !formData.skillName ||
      !formData.description ||
      !formData.price ||
      !formData.category ||
      !formData.image ||
      !formData.slotsAvailable
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const courseData = {
        ...formData,
        price: parseFloat(formData.price),
        slotsAvailable: parseInt(formData.slotsAvailable),
        rating: parseFloat(formData.rating) || 4.5,
        providerName:
          user.displayName || user.email?.split("@")[0] || "Anonymous",
        providerEmail: user.email,
      };

      console.log("Submitting course data:", courseData);
      const result = await coursesAPI.create(courseData);
      console.log("Course created successfully:", result);
      toast.success("Course added successfully!");
      navigate("/dashboard/my-added");
    } catch (error) {
      console.error("Error adding course:", error);
      let errorMessage =
        error.message || "Failed to add course. Please try again.";

      // Provide helpful message for connection errors
      if (
        errorMessage.includes("Backend server is not running") ||
        errorMessage.includes("Failed to fetch")
      ) {
        errorMessage =
          "⚠️ Backend server is not running. Please:\n1. Fix Firebase admin key in backend\n2. Start backend server (npm start)\n3. Try again";
        toast.error(errorMessage, { duration: 5000 });
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New Course</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Course Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="skillName"
            value={formData.skillName}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="e.g., Beginner Guitar Lessons"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows="4"
            placeholder="Describe your course..."
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Price ($) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="20"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Rating <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="4.5"
              min="0"
              max="5"
              step="0.1"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Slots Available <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="slotsAvailable"
              value={formData.slotsAvailable}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="5"
              min="1"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Image URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Adding Course..." : "Add Course"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/dashboard/my-added")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
