import { CircleCheckBigIcon, Icon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function WeOffering() {
  return (
    <div className="xl:p-20 sm:p-10 p-5 text-gray-800 flex max-md:flex-col justify-between items-center mx-auto overflow-hidden min-2xl:h-auto max-2xl:min-h-screen">
      <div className="md:w-1/2 flex justify-center items-center">
        <img
          src="/landingPage/offering.png"
          alt="What we offering"
          className=" object-cover"
        />
      </div>

      <div className="md:w-1/2">
        <h1 className="font-bold 2xl:text-5xl lg:text-3xl sm:text-2xl text-xl">
          Discover the Benefits of Lesson Generator
        </h1>
        <p className=" sm:mt-8 mt-4">
          At Lesson Generator, we offer innovative solutions to make learning
          easier and more personalized. Our platform provides customizable
          lesson plans tailored to your needs, whether you're looking to enhance
          your skills, teach others, or explore new subjects.
        </p>
        <ul className="grid lg:grid-cols-2 grid-cols-1 mt-5">
            <li className="mt-2"><p className="font-semibold mr-2 flex"><CircleCheckBigIcon className="mr-2 w-4"/>Customizable Lesson Plans:</p> Tailor lessons to your specific needs and goals.</li>
            <li className="mt-2"><p className="font-semibold mr-2 flex"><CircleCheckBigIcon className="mr-2 w-4"/>User-Friendly Platform:</p>Easy-to-use tools that save time and enhance productivity.</li>
            <li className="mt-2"><p className="font-semibold mr-2 flex"><CircleCheckBigIcon className="mr-2 w-4"/>High-Quality Resources:</p>Access a range of reliable and effective learning materials.</li>
            <li className="mt-2"><p className="font-semibold mr-2 flex"><CircleCheckBigIcon className="mr-2 w-4"/>Flexible Learning: </p>Learn at your own pace, anytime, anywhere.</li>
        </ul>
        <div className="sm:my-8 my-4">
          <Link
            href={"#"}
            className="px-6 sm:py-3 py-2 border-2 border-primary text-white font-semibold hover:bg-transparent bg-primary hover:text-primary hover:border-primary transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
