import React from 'react'

export default function LessonSection() {
  return (
    <div>
      <main className="flex-grow flex flex-col min-h-screen items-center justify-center text-center">
        <section className="flex flex-col items-center justify-center w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:space-x-40 max-w-full mx-auto xl:p-32 lg:p-10  max-lg:pt-24 max-lg:px-5">
            {/* Left column - Text content */}
            <div className="flex flex-col justify-center items-start text-left">
              <h1 className="lg:text-7xl text-5xl font-extrabold text-blue-700">
                Lesson Generator
              </h1>
              <p className="sm:mt-16 mt-10 text-lg text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="sm:mt-8 mt-4">
                <button className="px-6 sm:py-3 py-2 border-2 border-blue-600 text-blue-700 font-semibold rounded-md hover:bg-blue-700 hover:text-white hover:border-blue-700 transition">
                  Get Started
                </button>
              </div>
            </div>

            {/* Right column - Image */}
            <div className="flex justify-center items-center">
              <img
                src="teacher_bot.png" // Replace this with your image path
                alt="Lesson Generator Illustration"
                className="w-full h-auto max-w-full md:max-w-md"
                style={{ margin: "0 20px" }} // Optional: add margins for extra spacing
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
