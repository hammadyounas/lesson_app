import React from "react";
import Link from "next/link";

export default function LessonSection() {
  return (
    <div className="flex max-sm:flex-col justify-around items-center w-[90%] mx-auto overflow-hidden max-2xl:min-h-screen">
      {/* left side */}
      <div className="flex flex-col text-left lg:w-[60%] md:w-[60%]">
        <h1 className="text-3xl sm:text-4xl 2xl:text-6xl font-bold leading-snug max-sm:mt-10 text-gray-900">
          Simplify Learning with <br />
          <span className="text-primary">Lesson Generator</span>
        </h1>
        <p className="sm:my-10 my-5 xl:text-xl sm:text-lg text-gray-600">
          Create customized, engaging lessons effortlessly. Whether you're a
          student, a professional, or just exploring a new topic, our app makes
          learning simple and fun.
        </p>
        <div className="sm:mt-8 mt-4 flex space-x-2">
          <Link
            href={"/freePrompts"}
            className="px-6 sm:py-3 py-2 border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white hover:border-primary transition"
          >
            Get Started
          </Link>
          <Link
            href={"#"}
            className="px-6 sm:py-3 py-2 border-2 border-primary hover:text-primary font-semibold bg-primary text-white hover:bg-white transition"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* right side */}
      <div className="">
        <img
          src="/landingPage/section_one.png" // Replace this with your image path
          alt="Lesson Generator Illustration"
          className="w-full h-auto max-w-full md:max-w-md"
          style={{ margin: "0 20px" }} // Optional: add margins for extra spacing
        />
      </div>
    </div>
  );
}
