"use client";

import "swiper/swiper-bundle.css";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import { Specials as sp } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/navigation";

const Specials = () => {
  const router = useRouter();

  const goToSearch = (query: string) => {
    router.push(`/search?query=${query}&pageNo=1`);
  };

  return (
    <Swiper
      slidesPerView={1}
      autoplay={{
        delay: 10 * 1000,
        disableOnInteraction: false,
      }}
      speed={2 * 1000}
      loop={true}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="h-full"
    >
      {sp.map((slide) => (
        <SwiperSlide key={slide.image} className="relative h-full w-full">
          <div
            className={`absolute flex items-center justify-center flex-col md:flex-row top-0 left-0 h-full w-full bg-center bg-cover bg-no-repeat ${
              slide.image === "beast" && "bg-beast-image"
            }
            ${slide.image === "collectables" && "bg-collectables-image"}
            ${slide.image === "shoes" && "bg-shoes-image"}
            `}
          >
            <img
              src={`/specials/${slide.image}.png`}
              className="lg:w-[25rem] md:w-[17rem] w-[12rem] object-contain mr-[10%]"
              alt={slide.image}
            />
            <div className="md:w-[40%] w-[100%] text-center md:text-left">
              <h1 className="font-primary text-white drop-shadow-xl font-extrabold lg:text-4xl md:text-2xl text-xl">
                {slide.title}
              </h1>
              <h2 className="text-slate-100 hidden md:block lg:text-xl md:text-base text-sm">
                {slide.description}
              </h2>
              <CustomButton
                title="Check out"
                styles="mt-4 lg:text-md md:text-sm text-xs hidden md:block px-4 py-2"
                callback={() => goToSearch(slide.search)}
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Specials;
