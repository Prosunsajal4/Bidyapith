import React from "react";
import { Link } from "react-router";

const SkillDetailsCard = ({ skill }) => {
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
      <Link className="btn btn-secondary" to={`/`}>
        {" "}
        Back to Home
      </Link>
    </div>
  );
};

export default SkillDetailsCard;
