import React from 'react'

export default function TryNowSection() {
  return (
    <div>
       <main className="flex-grow flex flex-col min-h-screen items-center justify-center text-center">
        <section className="flex flex-col items-center justify-center w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:space-x-40 max-w-full mx-auto xl:p-32 lg:p-10 p-5">
            {/* Left column - Text content */}
            <div className="flex flex-col justify-center items-start text-left ">
              <h1 className="lg:text-7xl text-5xl font-extrabold text-gray-900">
                TRY NOW!
              </h1>
              <p className='my-5 lg:text-lg text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam animi earum repudiandae quis, quod, obcaecati deleniti dolore sit nostrum reiciendis, cumque consectetur. Alias.</p>
              <div className="mt-2 max-sm:flex max-sm:justify-center max-sm:w-full">
                <a
                  className="px-6 sm:py-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  href="/freePrompts"
                >
                  Get Started
                </a>
              </div>
            </div>

            {/* Right column - Image */}
            <div className="flex justify-center items-center ">
              <img
                src="image_3.png" // Replace this with your image path
                alt="Lesson Generator Illustration"
                className="w-full h-auto max-w-sm md:max-w-lg"
                style={{ margin: "0 20px" }} // Optional: add margins for extra spacing
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
