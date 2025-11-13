import { FaEye, FaStar, FaShareAlt, FaRegBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";

const SkillCard = ({ skill }) => {
  // Support both MongoDB _id and legacy skillId
  const courseId = skill._id || skill.skillId || skill.id;
  const { image, price, rating, skillName } = skill;

  return (
    <>
      <div className="w-full h-full flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all bg-gray-100 p-4 border-b-cyan-800 rounded-lg overflow-hidden shadow shadow-lime-700 ">
        <img
          src={image}
          alt=""
          className="w-full h-48 object-cover rounded-lg"
        />
        <h2 className="text-xl font-semibold my-2">{skillName}</h2>
        <div className="my-2 flex justify-between items-center">
          <h2>price: {price}$</h2>
          <h2>rating: {rating}⭐</h2>
        </div>
        <Link
          to={`/skill-details/${courseId}`}
          className="btn btn-primary mt-auto"
        >
          View Details
        </Link>
      </div>
    </>
  );
};

export default SkillCard;
