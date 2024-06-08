import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "style/UI/slider.module.css";

const CustomSlider: React.FC<{ images: string[] }> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-container" style={{ height: "min-content" }}>
      {images.length > 1 ? (
        <Slider {...settings}>
          {images.map((url) => (
            <div>
              <div className={style.imgContainer}>
                <img className={style.img} src={url} alt="product" />
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className={style.imgContainer}>
          <img className={style.img} src={images[0]} alt="product" />
        </div>
      )}
    </div>
  );
};

export default CustomSlider;
