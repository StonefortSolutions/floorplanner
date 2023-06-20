import React from "react";
import { Button } from "./ui/Button";
import { PlayCircleIcon, PencilIcon, ArmchairIcon } from "lucide-react";
import { cn } from "../utils";

function ApplicationSidebar({ className }) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Create
          </h2>
          <div className="space-y-1">
            <Button
              variant="secondary"
              size="sm"
              className="w-full justify-start"
            >
              <PencilIcon className="mr-2 h-4 w-4" />
              Walls
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <ArmchairIcon className="mr-2 h-4 w-4" />
              Furniture
            </Button>
          </div>
        </div>
        <div className="py-2">
          <h2 className="relative px-6 text-lg font-semibold tracking-tight">
            Info
          </h2>
        </div>
      </div>
    </div>
  );
}

export default ApplicationSidebar;
