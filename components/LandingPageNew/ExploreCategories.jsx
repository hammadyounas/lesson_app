import Link from "next/link";
import React from "react";

export default function ExploreCategories() {
  return (
    <div className="xl:p-20 sm:p-10 p-5 bg-primary text-white flex flex-col justify-center items-center mx-auto overflow-hidden min-2xl:h-auto max-2xl:min-h-screen ">
      <div className="grid lg:grid-cols-4 grid-cols-2">
        <div className="col-span-2">
          <h1 className="text-white font-bold 2xl:text-4xl lg:text-3xl sm:text-2xl text-xl">
            Explore Our Categories
          </h1>
          <p className="text-white sm:mt-8 mt-4">
            Discover a world of possibilities with our diverse categories. From
            technology and education to health, travel, food, and art, there’s
            something for everyone. Start exploring and find what inspires you!
          </p>
          <div className="sm:my-8 my-4">
            <Link
              href={"#"}
              className="px-6 sm:py-3 py-2 border-2 border-white text-black font-semibold hover:bg-primary bg-white hover:text-white hover:border-primary transition"
            >
              All Categories
            </Link>
          </div>
        </div>
        <div className="col-span-1 w-full sm:p-2 flex justify-center">
          <img
            src="/landingPage/category_one.jpg"
            alt="fisrt category"
            className="object-cover  w-full"
          />
          <p></p>
        </div>
        <div className="col-span-1 sm:p-2 flex justify-center">
          <img
            src="/landingPage/category_three.jpg"
            alt="fisrt category"
            className="object-cover  w-full"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-4 grid-cols-2  max-sm:mt-2">
        <div className="col-span-1 w-full sm:p-2 flex justify-center">
          <img
            src="/landingPage/category_four.jpg"
            alt="fisrt category"
            className="object-cover  w-full"
          />
        </div>
        <div className="col-span-1 sm:p-2 flex justify-center">
          <img
            src="/landingPage/category_five.jpg"
            alt="fisrt category"
            className="object-cover  w-full"
          />
        </div>
        <div className="col-span-1 w-full sm:p-2 flex justify-center  max-sm:mt-2">
          <img
            src="/landingPage/category_two.jpg"
            alt="fisrt category"
            className="object-cover bg-white w-full"
          />
        </div>
        <div className="col-span-1 sm:p-2 flex justify-center  max-sm:mt-2">
          <img
            src="/landingPage/category_seven.png"
            alt="fisrt category"
            className="object-cover w-full bg-white"
          />
        </div>
      </div>
    </div>
  );
}
