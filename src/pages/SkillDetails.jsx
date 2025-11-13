import React, { useEffect, useState, useMemo } from "react";
import Header from "../components/Header";
import SkillDetailsCard from "../components/SkillDetailsCard";
import { useLoaderData, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import BookSessionForm from "../components/BookSessionForm";
import { coursesAPI } from "../services/api";

const SkillDetails = () => {
  const loadedData = useLoaderData();
  const { id } = useParams();
  const [skill, setSkill] = useState({});
  const [loading, setLoading] = useState(true);

  // Ensure data is always an array
  const data = useMemo(() => {
    return Array.isArray(loadedData) ? loadedData : [];
  }, [loadedData]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // Try to find in loaded data first (for backward compatibility)
        const foundInData = data.find(
          (singleSkill) =>
            singleSkill._id === id ||
            singleSkill.skillId == id ||
            singleSkill.id === id
        );

        if (foundInData) {
          setSkill(foundInData);
          setLoading(false);
        } else {
          // If not found, fetch from API
          const courseData = await coursesAPI.getById(id);
          setSkill(courseData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
        // Fallback to finding in loaded data
        const foundInData = data.find(
          (singleSkill) =>
            singleSkill._id === id ||
            singleSkill.skillId == id ||
            singleSkill.id === id
        );
        setSkill(foundInData || {});
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [data, id]);

  if (loading) {
    return (
      <div>
        <header className="py-3">
          <Header></Header>
        </header>
        <main className="w-11/12 mx-auto gap-5 py-10">
          <div className="text-center">Loading course details...</div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <header className="py-3">
        <Header></Header>
      </header>
      <main className="w-11/12 mx-auto gap-5 py-10">
        <h2 className="text-2xl font-bold mb-5">
          <span className="text-secondary">Skill</span> Details
        </h2>
        <SkillDetailsCard skill={skill}></SkillDetailsCard>
      </main>
      <BookSessionForm />
      <Footer></Footer>
    </div>
  );
};

export default SkillDetails;
