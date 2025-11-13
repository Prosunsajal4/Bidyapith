import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { enrollmentsAPI } from "../services/api";
import toast from "react-hot-toast";

const SkillDetailsCard = ({ skill }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    if (!skill) {
      toast.error("Course information is missing");
      return;
    }

    // Support both MongoDB _id and legacy skillId
    const courseId = skill._id || skill.skillId || skill.id;

    if (!courseId) {
      toast.error("Course ID is missing");
      return;
    }

    setLoading(true);
    try {
      console.log("Enrolling in course:", courseId);
      const result = await enrollmentsAPI.enroll(courseId);
      console.log("Enrollment successful:", result);
      toast.success("Successfully enrolled in the course!");
      navigate("/dashboard/my-enrolled");
    } catch (error) {
      console.error("Enrollment error:", error);
      let errorMessage = error.message || "Failed to enroll. Please try again.";

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

  if (!skill || Object.keys(skill).length === 0) {
    return <div>Loading course details...</div>;
  }

  return (
    <div className="space-y-5">
      <img className="w-full h-[350px] object-cover" src={skill.image} alt="" />
      <h2 className="text-2xl font-bold">{skill.skillName}</h2>
      <p>
        course by <span className="text-secondary">{skill.providerName}</span>
      </p>
      <p>{skill.description}</p>
      <p>slots available: {skill.slotsAvailable}</p>
      <p>category: {skill.category}</p>
      <p>price: ${skill.price}</p>
      <p>rating: {skill.rating} ⭐</p>
      <div className="flex gap-3">
        <button
          className="btn btn-primary"
          onClick={handleEnroll}
          disabled={loading}
        >
          {loading ? "Enrolling..." : "Enroll Now"}
        </button>
        <Link className="btn btn-secondary" to={`/`}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SkillDetailsCard;
