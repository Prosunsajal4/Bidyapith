import React, { useEffect, useState } from "react";
import SkillCard from "../../components/SkillCard";
import { coursesAPI } from "../../services/api";
import toast from "react-hot-toast";
import Loading from "../Loading";
import { Link } from "react-router-dom";

const MyAddedCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    setLoading(true);
    try {
      const data = await coursesAPI.getMyAdded();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching my courses:", error);
      toast.error("Failed to load your courses");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) {
      return;
    }

    try {
      await coursesAPI.delete(courseId);
      toast.success("Course deleted successfully");
      fetchMyCourses(); // Refresh the list
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error(error.message || "Failed to delete course");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Added Courses</h2>
        <Link to="/dashboard/add-course" className="btn btn-primary">
          Add New Course
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-accent text-lg mb-4">
            You haven't added any courses yet.
          </p>
          <Link to="/dashboard/add-course" className="btn btn-primary">
            Add Your First Course
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
          {courses.map((course) => (
            <div key={course._id || course.skillId} className="relative">
              <SkillCard skill={course} />
              <button
                onClick={() => handleDelete(course._id || course.skillId)}
                className="btn btn-error btn-sm mt-2 w-full"
              >
                Delete Course
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAddedCourse;
