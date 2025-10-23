import { useLoaderData } from "react-router";
import SkillCard from "../components/SkillCard";

const TotalSkills = () => {
  const data = useLoaderData();

  return (
    <div>
      <h2 className="font-bold mb-5">
        Total <span className="text-secondary">{data.length}</span> Skills Found
      </h2>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-5 ">
        {data.map((skill) => (
          <SkillCard key={skill.skillId} skill={skill}></SkillCard>
        ))}
      </div>
    </div>
  );
};

export default TotalSkills;
