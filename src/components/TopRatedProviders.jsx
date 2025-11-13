import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const TopRatedProviders = () => {
  const [topProviders, setTopProviders] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch("/skills.json");
        const data = await res.json();

        const sorted = data
          .sort((a, b) => a.slotsAvailable - b.slotsAvailable)
          .slice(0, 4);

        setTopProviders(sorted);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section className="w-11/12 mx-auto my-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Top Instructors
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {topProviders.map((provider) => (
          <div
            key={provider.skillId}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={provider.image}
              alt={provider.providerName}
              className="w-full h-56 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold mb-1">
                {provider.providerName}
              </h3>
              <p className="text-gray-500 mb-2">{provider.skillName}</p>
              <div className="flex items-center justify-center text-yellow-400">
                <FaStar className="mr-1" />
                <span className="font-medium">{provider.rating}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Slots Available: {provider.slotsAvailable}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopRatedProviders;
