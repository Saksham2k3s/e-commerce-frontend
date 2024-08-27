import React, { useEffect } from "react";
import ImageCarousel from "../components/ImageCarousel";
import secondElement from "../assets/element-image-2.png";
import thirdElement from "../assets/element-image-3.png";
import firstImage from '../assets/sofa-image-2.png'
import { FaArrowRightLong, FaEnvelope } from "react-icons/fa6";
import { Link} from "react-router-dom";
import ProductsList from "../components/ProductsList";
import { valueCardData } from "../utils/constants";
import ValueCard from "../components/ValueCard";
import SaleBanner from "../assets/banner-image.png";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../redux/slice/ProductSlice";
import { carouselImages } from "../utils/constants";

function Home() {

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchProducts({page : 1, query : '', category : ''}));
  }, [dispatch])
  return (
    <>
      <div className=" px-5 md:px-40 flex flex-col gap-10 lg:gap-20  ">
        {/* Image Carousel */}

        <div className="w-full">
          <ImageCarousel images={carouselImages} />
        </div>

        {/* Hero Heading Section */}

        <div
          className={`w-full flex flex-col lg:flex-row items-start justify-start py-0 pr-[10px] lg:pr-[29px] pl-0 box-border gap-[12px] lg:gap-[24px] text-left text-[20px] lg:text-[32px]  text-gray font-poppins`}
        >
          <h1 className="m-0 flex-1 text-inherit font-medium font-inherit inline-block max-w-full  ">
            <p className="m-0 text-neutral-07-100 ">
              <span>Simply Unique</span>
              <span className="text-gray-400 text-[32px] lg:text-[72px] ">
                /
              </span>
            </p>
            <p className="mt-0 text-neutral-07-100">
              <span>Simply Better.</span>
            </p>
          </h1>
          <div className="w-full flex flex-col items-start justify-start align-middle pt-[10px] lg:pt-[50px] px-0 pb-0 box-border max-w-full text-[16px] text-black">
            <div className="self-stretch leading-[26px]">
              <span className="font-semibold">{`3legant `}</span>
              <span className="text-dimgray">{`is a gift & decorations store based in HCMC, Vietnam. Est since 2019. `}</span>
            </div>
          </div>
        </div>

        {/* Hero Heading Section End */}

        {/* Card Gellery Section */}

        <div className=" z-10 flex flex-col lg:flex-row gap-5 w-full h-[500px] font-headline-4 ">
          <div className=" relative w-full lg:w-1/2 h-full ">
            <img
              src={firstImage}
              alt="sofa-image"
              className="w-full h-full "
            />
            <div className=" absolute top-14 left-10 z-30 gap-4 ">
              <h1 className="text-neutral-07-100">Living Rooms</h1>
              <button className="flex flex-row gap-5 border-b-2 border-black text-neutral-07-100 text-[20px] mt-3">
                Show now <FaArrowRightLong size={18} />{" "}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-10 lg:gap-5 w-full lg:w-1/2 h-full ">
            <div className="relative w-full h-1/2">
              <img
                src={secondElement}
                alt="drow-image"
                className=" lg:h-full w-full object-cover"
              />
              <div className="absolute bottom-5 left-5 z-30 gap-4 ">
                <h1 className="text-black text-md  ">Living Rooms</h1>
                <button className="flex flex-row gap-4 border-b-2 text-neutral-07-100 border-black text-[20px]">
                  Show now <FaArrowRightLong size={18} />{" "}
                </button>
              </div>
            </div>
            <div className="relative w-full h-1/2">
              <img
                src={thirdElement}
                alt="drow-image"
                className=" lg:h-full w-full object-cover"
              />
              <div className="absolute bottom-5 left-5 z-30 gap-4 ">
                <h1 className="text-black text-md  ">Living Rooms</h1>
                <button className="flex text-darkslategray flex-row gap-4 border-b-2 border-black text-[20px]">
                  Show now <FaArrowRightLong size={18} />{" "}
                </button>
              </div>
            </div>
          </div>
        </div>


        {/* Card Gellery Section End */}

       {/* New Arrivals Section */}
<div className="w-full flex items-end justify-between gap-5 text-left text-[40px] text-neutral-07-100 font-poppins">
  {/* "New Arrivals" Heading */}
  <Link to="/new-arrivals" className="font-medium">
    <p className="m-0">New</p>
    <p className="m-0">Arrivals</p>
  </Link>
  
  {/* More Products Link */}
  <div className="flex items-center gap-2 text-base text-neutral-07-100 font-button-s border-b border-neutral-07-100">
    <Link to="/more-products" className="font-medium text-inherit min-w-[108px]">
      More Products
    </Link>
    <FaArrowRightLong />
  </div>
</div>
</div>
{/* Product List */}
<div className="mt-20 px-5 md:px-0 md:pl-40">
  <ProductsList />
</div>


      {/* Value Cards */}
      <div className="px-5 md:px-40 mt-20 ">
        <div className="flex flex-col lg:flex-row gap-5">
          {valueCardData.map((cardValue) => {
            return <ValueCard cardValue={cardValue} />;
          })}
        </div>
      </div>
      {/* Value Cards end */}

      {/* Sale Banner Start */}

      <div className="w-full flex mt-20 bg-[#f3f5f7]">
  <section className="flex flex-col md:flex-row items-start justify-start max-w-full gap-0 text-left text-neutral-07-100 font-button-s">
    {/* Image with responsive styles */}
    <img
      className="h-auto flex-1 w-full md:w-1/2 relative overflow-hidden object-cover min-h-[400px] mq750:min-w-full mq1125:flex-1"
      loading="lazy"
      alt="Sale Banner"
      src={SaleBanner}
    />

    {/* Text content with responsive styles */}
    <div className="flex flex-col items-start justify-center flex-1 w-full md:w-1/2 bg-[#f3f5f7] py-[140px] px-5 box-border gap-[24px]">
      <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
        <b className="uppercase text-blue">SALE UP TO 35% OFF</b>
        <h1 className="relative text-21xl font-medium font-headline-4">
          <p>
            <span className="uppercase">Hundreds</span> of
          </p>
          <p>New lower prices!</p>
        </h1>
        <div className="text-xl">
          It’s more affordable than ever to give every room in your home a stylish makeover
        </div>
      </div>
      {/* Shop Now Button */}
      <div className="flex flex-row items-center justify-start gap-[4px] border-b-[1px] border-solid border-neutral-07-100">
        <div className="flex flex-row items-center justify-start">
          <Link className="flex flex-row gap-4 font-medium min-w-[76px]">
            Shop Now <FaArrowRightLong />
          </Link>
        </div>
      </div>
    </div>
  </section>
</div>


      {/* Sale Banner end */}

      {/* Newsletter Section Start */}
      <div
        className={`w-full h-fit py-10 lg:py-0 lg:h-[350px] bg-[url('assets/newsletter-img.png')] bg-no-repeat bg-center bg-cover flex flex-col items-center align-middle justify-center `}
      >
        <div className="text-[25px] lg:text-[40px] font-medium ">
          Join Our Newsletter
        </div>
        <div className="text-[14px] lg:text-[18px] font-normal mt-4 font-button-s  ">
          Sign up for deals, new products and promotions
        </div>
        <div className="flex mt-4 w-[65%] lg:w-[35%] py-3 justify-between px-3 flex-row border-b-2 border-darkslategray text-darkslategray">
          <div className="flex gap-4  ">
            <FaEnvelope />
            <input
              type="text"
              placeholder="Email Address"
              className="bg-transparent border-none outline-none focus:border-none focus:outline-none"
            />
          </div>
          <div>
            <Link className="text-[12px] lg:text-[16px] font-button-s ">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      {/* Newsletter Section Start */}
    </>
  );
}

export default Home;