import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import SkillCard from "../components/SkillCard";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const loadedData = useLoaderData();
  // Ensure data is always an array
  const data = Array.isArray(loadedData) ? loadedData : [];
  const topSixByRating = [...data]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 6);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="gap-5 py-10">
      <h2
        className="text-2xl font-bold mb-5"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        Top <span className="text-secondary">6</span> Courses by Rating
      </h2>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
        {topSixByRating.map((skill, index) => (
          <div
            key={skill._id || skill.skillId || index}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            data-aos-duration="600"
          >
            <SkillCard skill={skill}></SkillCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
