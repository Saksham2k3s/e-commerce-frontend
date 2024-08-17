import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

// Custom Previous Arrow
const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 cursor-pointer z-10"
    onClick={onClick}
  >
    <span className="text-black text-lg"><FaArrowLeftLong/></span>
  </div>
);

// Custom Next Arrow
const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 cursor-pointer z-10"
    onClick={onClick}
  >
    <span className="text-black text-lg"><FaArrowRightLong/></span>
  </div>
);

const ImageCarousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="w-full">
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-auto object-cover" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
