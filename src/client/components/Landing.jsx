import React from "react";
import {
  PencilIcon,
  ArmchairIcon,
  Clock10Icon,
  StarIcon,
  SparklesIcon,
  ArrowRightIcon,
} from "lucide-react";
import { Badge } from "./ui/Badge";
import Pricing from "./Pricing";

function Landing() {
  return (
    <>
      <div className="flex flex-col items-center justify-center p-8 ">
        <a href="/sign-up">
          <Badge variant="default" className="mb-4">
            Get started for FREE
            <ArrowRightIcon className="h-4 w-4 ml-1" />
          </Badge>
        </a>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-wide leading-5 lg:text-5xl">
          Welcome to FloorPlanner
        </h1>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Unleash Your Creativity with 3D Floor Plans!
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6  mb-4 p-8">
          Designing the perfect space starts with a vision. Whether you're an
          architect, interior designer, real estate professional, or simply
          someone with a passion for creating beautiful spaces, FloorPlanner is
          here to bring your ideas to life. Our web app empowers you to
          effortlessly sketch and visualize stunning 3D floor plans, providing
          you with a powerful toolset to transform your concepts into reality.
        </p>
        <section>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Why choose FloorPlanner?
          </h3>
          {/* Tailwind Grid 2x4 on large, single column on mobile */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 mt-4">
            <div className="flex flex-col items-center justify-center bg-secondary p-2 rounded-lg border animate-gradient bg-gradient-to-br dark:from-gray-700 via-background dark:via-background dark:to-slate-700 from-gray-200 to-slate-300">
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
            <div className="relative lg:max-w-5xl lg:mx-auto">
              <div className="absolute -inset-2">
                <div
                  className="w-full h-full mx-auto opacity-30 blur-lg filter animate-gradient"
                  style={{
                    background:
                      "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
                  }}
                />
              </div>
              <div className="flex flex-col items-center justify-center bg-secondary p-2 rounded-lg border">
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full  bg-gradient-to-tr from-orange-400 to-pink-500">
                  <SparklesIcon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold tracking-tight">Fancy</h4>
                <p className="leading-7 font-thin p-2">
                  Create beautiful 2d and 3d floor plans with ease. Color the
                  floors or the walls, add furniture and decorations, and more.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-secondary p-2 rounded-lg border animate-gradient bg-gradient-to-br dark:from-gray-700 via-background dark:via-background dark:to-slate-700 from-gray-200 to-slate-300">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500">
                <StarIcon className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold tracking-tight">Powerful</h4>
              <p className="leading-7 font-thin p-2">
                FloorPlanner is trusted by thousands of professionals around the
                world. Floorplanner is packed with features that enable you to
                create detailed and precise floor plans.
              </p>
            </div>
          </div>
        </section>
        <p className="leading-7 [&:not(:first-child)]:mt-6 mb-8 p-8">
          With FloorPlanner, the possibilities are endless. Whether you're
          working on a residential home, office building, or any other
          architectural project, our intuitive interface and cutting-edge
          technology make it a breeze to create detailed and precise floor
          plans. Our app is packed with a wide range of features that enable you
          to customize every aspect of your design, from room dimensions to
          furniture placement, ensuring that every detail is just as you
          envision.
        </p>
        <Pricing isDashboard={false} />
      </div>
    </>
  );
}

export default Landing;
