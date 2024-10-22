import React from 'react'

export default function DemoSection() {
  return (
    <div>
       {/* Demo Section */}
       <main className="flex-grow flex flex-col min-h-screen items-center justify-center text-center ">
        <section className="flex flex-col w-full ">
          <div className="flex flex-col items-center justify-between min-h-screen bg-gray-800 w-full mx-auto sm:p-6 p-4">
            {/* Top - Text content */}
            <div className="flex flex-col lg:w-1/2 justify-center items-center text-center sm:mt-20 mt-10">
              <h1 className="sm:text-7xl text-5xl font-extrabold text-white">Demo</h1>
              <p className="mt-4 sm:text-lg text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            {/* Bottom - Full Page Image */}
            <div className="flex-grow  max-h-screen w-5/6 flex justify-center m-10">
              <img
                src="image_2.png" // Replace this with your image path
                alt="Lesson Generator Illustration"
                className=" "
                style={{ margin: "0 20px" }} // Optional: add margins for extra spacing
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
