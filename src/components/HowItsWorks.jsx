import { FaSearch, FaChalkboardTeacher, FaPlayCircle, FaCertificate } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch size={30} className="text-indigo-500 mb-3" />,
      title: "Browse Skills",
      description: "Explore a wide variety of courses and find the perfect skill to learn.",
    },
    {
      icon: <FaChalkboardTeacher size={30} className="text-indigo-500 mb-3" />,
      title: "Choose a Provider",
      description: "Select a top-rated instructor based on reviews and slots availability.",
    },
    {
      icon: <FaPlayCircle size={30} className="text-indigo-500 mb-3" />,
      title: "Start Learning",
      description: "Join live classes or access tutorials at your own pace.",
    },
    {
      icon: <FaCertificate size={30} className="text-indigo-500 mb-3" />,
      title: "Get Certified",
      description: "Complete the course and receive a certificate to showcase your skills.",
    },
  ];

  return (
    <section className="w-11/12 mx-auto my-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        How It Works
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-center">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2 mt-3">{step.title}</h3>
            <p className="text-gray-500">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
