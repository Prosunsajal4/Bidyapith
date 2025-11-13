import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Trisha Chakrabarti",
      course: "Spoken English Practice",
      feedback:
        "This course helped me gain confidence in speaking English. Highly recommend!",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Rahul Das",
      course: "Web Development Basics",
      feedback:
        "I learned HTML, CSS, and JS from scratch. Now I can build websites easily!",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Ananya Sen",
      course: "Yoga for Stress Relief",
      feedback:
        "The yoga sessions helped me stay relaxed and focus on my studies.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="py-20 bg-gray-100 w-full">
      <div className="w-11/12 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          What Our Students Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              data-aos="fade-up"
              className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full mb-4"
              />
              <h3 className="font-semibold text-lg">{t.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{t.course}</p>
              <p className="text-gray-700">{t.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
