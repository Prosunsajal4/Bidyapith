import React, { useEffect, useState } from "react";
import SkillCard from "../../components/SkillCard";
import { enrollmentsAPI } from "../../services/api";
import toast from "react-hot-toast";
import Loading from "../Loading";

const MyEnrolled = () => {
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    setLoading(true);
    try {
      const data = await enrollmentsAPI.getMyEnrolled();
      console.log("Enrolled courses data:", data);
      // Backend now returns courses directly with enrollment info
      setEnrolled(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      const errorMsg = error.message || "Failed to load enrolled courses";
      if (errorMsg.includes("Backend server is not running")) {
        toast.error("Backend server is not running. Please start it first.");
      } else {
        toast.error(errorMsg);
      }
      setEnrolled([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Enrolled Courses</h2>
      {enrolled.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-accent text-lg">
            No enrolled courses yet. Go to a course and click Enroll.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
          {enrolled.map((skill) => (
            <SkillCard
              key={skill._id || skill.skillId}
              skill={skill}
            ></SkillCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEnrolled;
