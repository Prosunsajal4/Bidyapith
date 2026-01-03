import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const HeroSlider = () => {
  const slides = [
    {
      title: "Welcome to BidyaPith",
      text: "Learn new courses and grow your knowledge — all in one place.",
    },
    {
      title: "Start Learning Today",
      text: "From coding to communication — explore courses that empower your future.",
    },
    {
      title: "Knowledge is Power",
      text: "Empower yourself through hands-on learning and real-world growth.",
    },
  ];

  return (
    <div className="w-11/12 h-[320px] md:h-[420px] my-8 mx-auto relative overflow-hidden rounded-lg border border-base-200 shadow flex items-center justify-center bg-base-200">
      {/* background image (contain so it won't zoom/crop) */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: "url('/bidyapith_main.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      />

      {/* overlays for readability + modern look */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/35 via-black/20 to-secondary/25" />
      <div className="absolute inset-0 ring-1 ring-base-100/15" />

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
            className="relative flex flex-col justify-center text-center text-white px-6 h-full"
          >
            <div className="max-w-3xl mx-auto px-6 py-7 md:px-10 md:py-9 rounded-lg bg-base-100/10 backdrop-blur-md border border-base-100/20 shadow">
              <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="mt-4 text-base md:text-xl font-light opacity-90">
                {slide.text}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
