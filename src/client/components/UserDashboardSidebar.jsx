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
  const [active, setActive] = React.useState("recent");
  const handleSetActive = (value) => {
    setActive(value);
  };
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <a href="/editor">
            <Button
              variant="default"
              size="sm"
              className="w-full justify-start"
            >
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              Create New
            </Button>
          </a>
        </div>
      </div>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            My Floorplans
          </h2>
          <div className="space-y-1">
            <Button
              variant={active === "recent" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => handleSetActive("recent")}
            >
              <Clock10Icon className="mr-2 h-4 w-4" />
              Recent
            </Button>
            <Button
              variant={active === "favorites" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => handleSetActive("favorites")}
            >
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
