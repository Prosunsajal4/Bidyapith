import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaStar,
  FaUsers,
  FaClock,
  FaCertificate,
  FaCheck,
  FaPlay,
} from "react-icons/fa";

const SkillDetailsCard = ({ skill, relatedCourses = [] }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedImage, setSelectedImage] = useState(0);

  // Generate sample course images (in real app, these would come from the course data)
  const courseImages = [
    skill?.image,
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
  ].filter(Boolean);

  // Sample reviews (in real app, these would come from the backend)
  const reviews = [
    {
      id: 1,
      name: "Rahul Kumar",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Excellent course! The instructor explains concepts very clearly. Highly recommended for beginners.",
    },
    {
      id: 2,
      name: "Priya Sharma",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4,
      date: "1 month ago",
      comment:
        "Great content and well-structured curriculum. Would love to see more advanced topics covered.",
    },
    {
      id: 3,
      name: "Amit Das",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      rating: 5,
      date: "1 month ago",
      comment:
        "This course helped me land my first job! The practical exercises were very helpful.",
    },
  ];

  // Course features/what you'll learn
  const features = [
    "Comprehensive curriculum designed by industry experts",
    "Hands-on projects and real-world applications",
    "Certificate of completion",
    "Lifetime access to course materials",
    "24/7 support from instructors",
    "Access on mobile and desktop",
  ];

  const handleEnroll = async () => {
    if (!skill) {
      toast.error("Course information is missing");
      return;
    }

    const courseId = skill._id || skill.skillId || skill.id;

    if (!courseId) {
      toast.error("Course ID is missing");
      return;
    }

    navigate("/payment", { state: { course: skill } });
  };

  if (!skill || Object.keys(skill).length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={courseImages[selectedImage] || skill.image}
              alt={skill.skillName}
            />
          </div>

          {/* Thumbnails */}
          {courseImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {courseImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Course Info */}
        <div className="space-y-6">
          <div>
            <span className="badge badge-secondary mb-2">{skill.category}</span>
            <h1 className="text-2xl md:text-3xl font-bold">
              {skill.skillName}
            </h1>
            <p className="text-accent mt-2">
              By{" "}
              <span className="text-primary font-medium">
                {skill.providerName}
              </span>
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              <span className="font-semibold">{skill.rating}</span>
              <span className="text-accent">({reviews.length} reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUsers className="text-primary" />
              <span>{skill.slotsAvailable} slots available</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-primary" />
              <span>Self-paced</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCertificate className="text-primary" />
              <span>Certificate included</span>
            </div>
          </div>

          {/* Price & Enroll */}
          <div className="card bg-base-200 p-6">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold text-primary">
                ${skill.price}
              </span>
              <span className="text-accent line-through">$99.99</span>
              <span className="badge badge-success">50% OFF</span>
            </div>

            <button
              className="btn btn-primary btn-lg w-full mb-3"
              onClick={handleEnroll}
              disabled={loading}
            >
              {loading ? "Processing..." : `Enroll Now`}
            </button>

            <p className="text-center text-accent text-sm">
              30-day money-back guarantee
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-base-300">
        <div className="flex gap-4 overflow-x-auto">
          {["overview", "curriculum", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium capitalize border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-accent hover:text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-4">About This Course</h2>
                <p className="text-accent leading-relaxed">
                  {skill.description}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-accent">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Instructor Card */}
            <div className="card bg-base-200 h-fit">
              <div className="card-body items-center text-center">
                <h3 className="font-bold text-lg mb-2">Your Instructor</h3>
                <div className="avatar placeholder mb-3">
                  <div className="bg-primary text-white rounded-full w-20">
                    <span className="text-2xl">
                      {skill.providerName?.[0] || "?"}
                    </span>
                  </div>
                </div>
                <h4 className="font-semibold">{skill.providerName}</h4>
                <p className="text-accent text-sm">Expert Instructor</p>
                <div className="flex items-center gap-1 mt-2">
                  <FaStar className="text-yellow-500" />
                  <span className="font-medium">4.8</span>
                  <span className="text-accent">(150 reviews)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "curriculum" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Course Curriculum</h2>
            <div className="space-y-2">
              {[
                {
                  title: "Introduction to the Course",
                  duration: "15 min",
                  free: true,
                },
                {
                  title: "Getting Started with Basics",
                  duration: "45 min",
                  free: false,
                },
                {
                  title: "Core Concepts Deep Dive",
                  duration: "1 hr",
                  free: false,
                },
                {
                  title: "Practical Exercises",
                  duration: "2 hrs",
                  free: false,
                },
                {
                  title: "Advanced Techniques",
                  duration: "1.5 hrs",
                  free: false,
                },
                { title: "Final Project", duration: "3 hrs", free: false },
              ].map((lesson, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-base-200 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium">{lesson.title}</h4>
                      <p className="text-sm text-accent">{lesson.duration}</p>
                    </div>
                  </div>
                  {lesson.free && (
                    <span className="badge badge-success">Free Preview</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Student Reviews</h2>
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-500 text-xl" />
                <span className="text-2xl font-bold">{skill.rating}</span>
                <span className="text-accent">({reviews.length} reviews)</span>
              </div>
            </div>

            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="card bg-base-200">
                  <div className="card-body">
                    <div className="flex items-start gap-4">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{review.name}</h4>
                          <span className="text-accent text-sm">
                            {review.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={
                                i < review.rating
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                        <p className="text-accent mt-3">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Back Button */}
      <div className="pt-6 border-t border-base-200">
        <Link className="btn btn-outline" to="/courses">
          ← Back to Courses
        </Link>
      </div>
    </div>
  );
};

export default SkillDetailsCard;
