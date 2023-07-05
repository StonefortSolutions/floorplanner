import React, { useEffect } from "react";
import {
  Users2Icon,
  BadgeDollarSignIcon,
  Table2Icon,
  StarIcon,
  BarChartHorizontalIcon,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/Popover";
import { cn } from "../../utils";
import { useDispatch, useSelector } from "react-redux";

function SidebarContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Administration
          </h2>
          <div className="space-y-1">
            <Button
              variant={location.pathname === "/admin" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => navigate(`/admin`)}
            >
              <BarChartHorizontalIcon className="mr-2 h-4 w-4" />
              Stats
            </Button>
            <Button
              variant={
                location.pathname === "/admin/users" ? "secondary" : "ghost"
              }
              size="sm"
              className="w-full justify-start"
              onClick={() => navigate(`/admin/users`)}
            >
              <Users2Icon className="mr-2 h-4 w-4" />
              Users
            </Button>
            <Button
              variant={
                location.pathname === "/admin/subscriptions"
                  ? "secondary"
                  : "ghost"
              }
              size="sm"
              className="w-full justify-start"
              onClick={() => navigate(`/admin/subscriptions`)}
            >
              <BadgeDollarSignIcon className="mr-2 h-4 w-4" />
              Subscriptions
            </Button>
            <Button
              variant={
                location.pathname === "/admin/floorplans"
                  ? "secondary"
                  : "ghost"
              }
              size="sm"
              className="w-full justify-start"
              onClick={() => navigate(`/admin/floorplans`)}
            >
              <Table2Icon className="mr-2 h-4 w-4" />
              Floor Plans
            </Button>
            <Button
              variant={
                location.pathname === "/admin/templates" ? "secondary" : "ghost"
              }
              size="sm"
              className="w-full justify-start"
              onClick={() => navigate(`/admin/templates`)}
            >
              <StarIcon className="mr-2 h-4 w-4" />
              Templates
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function AdminSidebar({ className }) {
  return (
    <>
      <div className={cn("pb-4 md:hidden", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-center"
            >
              Admin Menu
            </Button>
          </PopoverTrigger>
          <PopoverContent align="center">
            <SidebarContent className="w-full" />
          </PopoverContent>
        </Popover>
      </div>
      <div className={cn("hidden md:block w-1/5", className)}>
        <SidebarContent />
      </div>
    </>
  );
}

export default AdminSidebar;
