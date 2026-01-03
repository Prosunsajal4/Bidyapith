import React from "react";
import {
  FaUserGraduate,
  FaBook,
  FaChalkboardTeacher,
  FaStar,
} from "react-icons/fa";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const StatisticsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const stats = [
    {
      icon: <FaUserGraduate className="text-4xl text-white" />,
      count: 15000,
      suffix: "+",
      label: "Active Students",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      icon: <FaBook className="text-4xl text-white" />,
      count: 30,
      suffix: "+",
      label: "Courses Available",
      bgColor: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
      icon: <FaChalkboardTeacher className="text-4xl text-white" />,
      count: 50,
      suffix: "+",
      label: "Expert Instructors",
      bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      icon: <FaStar className="text-4xl text-white" />,
      count: 4.8,
      decimals: 1,
      suffix: "/5",
      label: "Average Rating",
      bgColor: "bg-gradient-to-br from-orange-500 to-orange-600",
    },
  ];

  return (
    <section className="py-16 bg-base-100" ref={ref}>
      <div className="w-11/12 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-secondary">Impact</span> in Numbers
          </h2>
          <p className="text-accent max-w-2xl mx-auto">
            Join thousands of learners who have transformed their careers with
            BidyaPith
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} rounded-2xl p-6 text-center text-white shadow-lg transform hover:scale-105 transition-transform duration-300`}
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {inView ? (
                  <CountUp
                    end={stat.count}
                    duration={2.5}
                    decimals={stat.decimals || 0}
                    suffix={stat.suffix}
                  />
                ) : (
                  `0${stat.suffix}`
                )}
              </div>
              <p className="text-white/90 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
