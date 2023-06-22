import React from "react";
import { PencilIcon, ArmchairIcon, Clock10Icon, StarIcon } from "lucide-react";

function Landing() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to FloorPlanner
        </h1>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Unleash Your Creativity with 3D Floor Plans!
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Designing the perfect space starts with a vision. Whether you're an
          architect, interior designer, real estate professional, or simply
          someone with a passion for creating beautiful spaces, FloorPlanner is
          here to bring your ideas to life. Our web app empowers you to
          effortlessly sketch and visualize stunning 3D floor plans, providing
          you with a powerful toolset to transform your concepts into reality.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          With FloorPlanner, the possibilities are endless. Whether you're
          working on a residential home, office building, or any other
          architectural project, our intuitive interface and cutting-edge
          technology make it a breeze to create detailed and precise floor
          plans. Our app is packed with a wide range of features that enable you
          to customize every aspect of your design, from room dimensions to
          furniture placement, ensuring that every detail is just as you
          envision.
        </p>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Why choose FloorPlanner?
          {/* Tailwind Grid 2x4 on large, single column on mobile */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="flex flex-col items-center justify-center bg-secondary p-2 rounded-lg border">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500">
                <PencilIcon className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold tracking-tight">
                Easy to Use
              </h4>
              <p className="leading-7 font-thin p-2">
                FloorPlanner is designed to be intuitive and user-friendly, so
                you can get started right away.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center bg-secondary p-2 rounded-lg border">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500">
                <ArmchairIcon className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold tracking-tight">
                Versatile
              </h4>
              <p className="leading-7 font-thin p-2">
                FloorPlanner is perfect for any project, from residential homes
                to commercial buildings.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center bg-secondary p-2 rounded-lg border">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500">
                <Clock10Icon className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold tracking-tight">
                Efficient
              </h4>
              <p className="leading-7 font-thin p-2">
                FloorPlanner is designed to be intuitive and user-friendly, so
                you can get started right away.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center bg-secondary p-2 rounded-lg border">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500">
                <StarIcon className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold tracking-tight">Powerful</h4>
              <p className="leading-7 font-thin p-2">
                FloorPlanner is designed to be intuitive and user-friendly, so
                you can get started right away.
              </p>
            </div>
          </div>
        </h3>
      </div>
    </>
  );
}

export default Landing;
