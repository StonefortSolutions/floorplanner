import React from "react";
import {
  PencilIcon,
  ArmchairIcon,
  Clock10Icon,
  StarIcon,
  PlusCircleIcon,
} from "lucide-react";
import { Button } from "./ui/Button";
import { cn } from "../utils";

function UserDashboardSidebar({ className }) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <Button variant="default" size="sm" className="w-full justify-start">
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </div>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            My Floorplans
          </h2>
          <div className="space-y-1">
            <Button
              variant="secondary"
              size="sm"
              className="w-full justify-start"
            >
              <Clock10Icon className="mr-2 h-4 w-4" />
              Recent
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <StarIcon className="mr-2 h-4 w-4" />
              Favorites
            </Button>
          </div>
        </div>
        <div className="py-2">
          <h2 className="relative px-6 text-lg font-semibold tracking-tight">
            Featured Templates
          </h2>
        </div>
      </div>
    </div>
  );
}

export default UserDashboardSidebar;
