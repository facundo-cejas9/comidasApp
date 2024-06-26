import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// Importa tu archivo CSS personalizado
import "./Header.css";
import { assets } from "../../assets/assets";
assets

export const Header = () => {
  return (
    <div className="header">
      <Swiper
        className="slider"
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        
        
      >
        <SwiperSlide className="bg-slider-menu">
         
            <div className="header-contents">
              <h2>Las comidas más deliciosas aquí</h2>
              <p>Elige entre una gran variedad de restaurantes</p>
              <a href="#explore-menu">
                <button>Ver menú</button>
              </a>
            </div>
        
            
         
        </SwiperSlide>
        <SwiperSlide className="bg-slider-offers">
          <div className="header-contents">
            <h2>Las comidas veganas mas ricas</h2>
            <p>Disfruta de los platos veganos mas ricos</p>
            <a href="#explore-menu">
              <button>Ver menú</button>
            </a>
          </div>
        </SwiperSlide>
       
      </Swiper>
    </div>
  );
};
