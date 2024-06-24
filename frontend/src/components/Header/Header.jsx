import "./Header.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";


export const Header = () => {
  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2
  };

  return (
    <div className="header">
      <Slider className="slider" {...settings}>
        <div className="header-contents">
        <h2>Ordena tu comida favorita aquí</h2>
            <p>Elige entre una gran variedad de diversas comidas</p>
            <a href="#explore-menu">
              <button>Ver menú</button>
            </a>
        </div>
        <div className="header-contents">
        <h2>Las comidas más ricas aquí</h2>
            <p>Elige entre una gran variedad de restaurantes</p>
            <a href="#explore-menu">
              <button>Ver menú</button>
            </a>
        </div>
      </Slider>
    </div>
  );
};
