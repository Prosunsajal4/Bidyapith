import { FaEye, FaStar, FaShareAlt, FaRegBookmark } from "react-icons/fa";
import { Link } from "react-router";

const SkillCard = ({ skill }) => {
  const { skillId, image, price, rating } = skill;

  return (
    <>
      <div className="w-[450px] bg-gray-100 p-4 border-b-cyan-800 rounded-lg overflow-hidden shadow shadow-lime-700 hover:shadow-2xl transition-shadow ">
        <img
          src={image}
          alt=""
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="my-4 flex justify-between items-center">
          <h2>price: {price}$</h2>
          <h2>rating: {rating}⭐</h2>
        </div>
        <Link
          to={`/skill-details/${skillId}`}
          className="text-primary font-semibold cursor-pointer hover:underline"
        >
          View Details
        </Link>
      </div>
    </>
  );
};

export default SkillCard;
