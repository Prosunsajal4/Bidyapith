import { Link } from "react-router-dom";
import {
  FaStar,
  FaUsers,
  FaClock,
  FaBookOpen,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { useState } from "react";

const SkillCard = ({ skill }) => {
  // Support both MongoDB _id and legacy skillId
  const courseId = skill._id || skill.skillId || skill.id;
  const {
    image,
    price,
    rating,
    skillName,
    category,
    slotsAvailable,
    providerName,
    
  } = skill;
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="group card bg-base-100 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col border border-base-200/50">
      {/* Image Container */}
      <figure className="relative aspect-[16/10] overflow-hidden">
        {/* Image with zoom effect */}
        <img
          src={image}
          alt={skillName || "Course"}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Price Badge - Redesigned */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold rounded-full shadow-lg">
            ${price}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-transform duration-200"
        >
          {isWishlisted ? (
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <FaRegHeart className="text-gray-600 text-lg hover:text-red-500" />
          )}
        </button>

        {/* Category Badge - Bottom Left */}
        <div className="absolute bottom-3 left-3">
          <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-xs font-semibold text-primary rounded-full shadow-sm">
            {category}
          </span>
        </div>

        {/* Rating Badge - Bottom Right */}
        <div className="absolute bottom-3 right-3">
          <span className="flex items-center gap-1 px-2 py-1 bg-warning/90 backdrop-blur-sm rounded-full shadow-sm">
            <FaStar className="text-white text-xs" />
            <span className="text-white text-xs font-bold">{rating}</span>
          </span>
        </div>
      </figure>

      {/* Card Body */}
      <div className="card-body p-3 flex-grow flex flex-col gap-1.5">
        {/* Title */}
        <h2 className="font-bold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {skillName}
        </h2>

        {/* Instructor with Avatar */}
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-[10px] font-bold">
            {providerName?.charAt(0) || "I"}
          </div>
          <span className="text-xs text-accent truncate">
            {providerName || "Unknown Instructor"}
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Stats Row */}
        <div className="flex items-center justify-between text-[10px] text-accent border-t border-base-200 pt-2 mt-1">
          <div className="flex items-center gap-1">
            <FaUsers className="text-primary shrink-0" style={{ fontSize: '10px' }} />
            <span className="leading-none">{slotsAvailable} slots</span>
          </div>
          <div className="flex items-center gap-1">
            <FaClock className="text-secondary shrink-0" style={{ fontSize: '10px' }} />
            <span className="leading-none">8 wks</span>
          </div>
          <div className="flex items-center gap-1">
            <FaBookOpen className="text-info shrink-0" style={{ fontSize: '10px' }} />
            <span className="leading-none">12 les</span>
          </div>
        </div>

        {/* Button - Redesigned */}
        <Link
          to={`/skill-details/${courseId}`}
          className="btn btn-primary btn-sm w-full mt-1 rounded-lg group-hover:btn-secondary transition-all duration-300 gap-1 text-xs"
        >
          <span>View Course</span>
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default SkillCard;
