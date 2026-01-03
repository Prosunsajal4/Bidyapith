import React from "react";
import {
  FaGraduationCap,
  FaUsers,
  FaCertificate,
  FaLaptop,
  FaHeadset,
  FaGlobe,
} from "react-icons/fa";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaGraduationCap className="text-4xl text-primary" />,
      title: "Expert Instructors",
      description:
        "Learn from industry experts with years of real-world experience.",
    },
    {
      icon: <FaUsers className="text-4xl text-primary" />,
      title: "Community Support",
      description: "Join a thriving community of learners and mentors.",
    },
    {
      icon: <FaCertificate className="text-4xl text-primary" />,
      title: "Verified Certificates",
      description: "Earn recognized certificates upon course completion.",
    },
    {
      icon: <FaLaptop className="text-4xl text-primary" />,
      title: "Learn Anywhere",
      description: "Access courses on any device, anytime, anywhere.",
    },
    {
      icon: <FaHeadset className="text-4xl text-primary" />,
      title: "24/7 Support",
      description:
        "Get help whenever you need with our dedicated support team.",
    },
    {
      icon: <FaGlobe className="text-4xl text-primary" />,
      title: "Global Access",
      description:
        "Connect with learners and instructors from around the world.",
    },
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="w-11/12 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-secondary">BidyaPith</span>?
          </h2>
          <p className="text-accent max-w-2xl mx-auto">
            Discover what makes us the preferred choice for thousands of
            learners worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="card-body items-center text-center">
                <div className="mb-4 p-4 bg-base-200 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="card-title text-lg">{feature.title}</h3>
                <p className="text-accent text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
