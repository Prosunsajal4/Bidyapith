import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const HeroSlider = () => {
  const slides = [
    {
      title: "Welcome to Esho Sikhi",
      text: "Learn new skills and grow your knowledge — all in one place.",
    },
    {
      title: "Start Learning Today",
      text: "From coding to communication — explore skills that empower your future.",
    },
    {
      title: "Skill is Power",
      text: "Empower yourself through hands-on learning and real-world growth.",
    },
  ];

  return (
    <div className="w-11/12 h-[300px] my-10 mx-auto relative overflow-hidden flex items-center justify-center">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradientMove"></div>
      <div className="absolute inset-0 bg-black/40"></div>

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-full z-10"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="relative flex flex-col justify-start text-center text-white px-6 h-full"
          >
            {/* Title */}
            <div className="mt-20 animate-fadeInUp">
              <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
                {slide.title}
              </h1>
            </div>

            {/* Subtitle fixed near bottom */}
            <div className="absolute bottom-16 w-full text-center px-6 animate-fadeInUp delay-200">
              <p className="text-lg md:text-2xl max-w-3xl font-light opacity-90 mx-auto">
                {slide.text}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Gradient animation keyframes */}
      <style jsx>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradientMove {
          background-size: 200% 200%;
          animation: gradientMove 15s ease infinite;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
