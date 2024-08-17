import React from "react";
import headerImg from "../assets/shop-page-header.png";
import Search from "../components/Search";

function Shop() {
  return (
    <div>
      {/* Header Section */}
      <div
        className="max-w-full flex flex-col items-start justify-start py-0 px-5 md:px-20 lg:px-40 box-border relative gap-2 leading-normal tracking-normal text-left text-black1 text-35xl font-headline-3"
      >
        <img
          className="w-full h-[392px] object-cover"
          alt="Shop Page Header"
          src={headerImg}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-start gap-6 z-[1]">
          <h1 className="text-4xl font-medium leading-tight text-center text-black mq450:text-[32px] mq450:leading-[35px] mq750:text-[43px] mq750:leading-[46px]">
            Shop Page
          </h1>
          <h3 className="text-xl font-normal leading-[32px] text-center text-black-900 mq450:text-[16px] mq450:leading-[26px]">
            Let’s design the place you always imagined.
          </h3>
        </div>
      </div>

      {/* Toolbar */}
      <div className="px-5 mt-10 md:px-20 lg:px-40 flex flex-col md:flex-row gap-7">
        <div className="flex flex-col gap-2">
          <div className="uppercase font-bold text-lg text-gray-700">
            Categories
          </div>
          <div className="border-2 border-gray-300 flex flex-col justify-center items-center px-4 py-2 rounded-lg bg-white shadow-md">
            <select
              name="categories"
              id="categories"
              className="w-full bg-transparent text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition ease-in-out duration-200"
            >
              <option value="">Living Room</option>
              <option value="">Footwear</option>
              <option value="">Cloths</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="uppercase font-bold text-lg text-gray-700">
            Price
          </div>
          <div className="border-2 border-gray-300 flex flex-col justify-center items-center px-4 py-2 rounded-lg bg-white shadow-md">
            <select
              name="price"
              id="price"
              className="w-full bg-transparent text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition ease-in-out duration-200"
            >
              <option value="">All Price</option>
              <option value="">Footwear</option>
              <option value="">Cloths</option>
            </select>
          </div>
        </div>

        <div className="flex items-end md:ml-auto">
         
        </div>
      </div>
    </div>
  );
}

export default Shop;
