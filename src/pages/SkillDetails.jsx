import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SkillDetailsCard from "../components/SkillDetailsCard";
import { useLoaderData, useParams } from "react-router";
import Footer from "../components/Footer";

const SkillDetails = () => {
  const data = useLoaderData();
  const { id } = useParams();
  const [skill, setSkill] = useState({});

  useEffect(() => {
    const skillDetails = data.find((singleSkill) => singleSkill.skillId == id);
    setSkill(skillDetails);
  }, [data, id]);
  return (
    <div>
      <header className="py-3">
        <Header></Header>
      </header>
      <main className="w-11/12 mx-auto gap-5 py-10">
        <h2 className=" text-2xl font-bold mb-5">
          <span className="text-secondary">Skill</span> Details
        </h2>
        <SkillDetailsCard skill={skill}></SkillDetailsCard>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default SkillDetails;
