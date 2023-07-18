import React, { useEffect, useState } from "react";
import {
  PencilIcon,
  ArmchairIcon,
  Clock10Icon,
  StarIcon,
  PlusCircleIcon,
  GemIcon,
  CreditCardIcon,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/Popover";
import { cn } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { createFloorplan } from "../store/floorplan";
import { useToast } from "../hooks/useToast";
import { useClerk } from "@clerk/clerk-react";
import axios from "axios";

function SidebarContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const singleFloorplan = useSelector(
    (state) => state.floorplan.singleFloorplan
  );
  const { user } = useClerk();
  // const userId = user?.id;
  const [subs, setSubs] = useState(false);
  const [floorplans, setFloorplans] = useState([]);
  const { toast } = useToast();

  const subscriptionToast = () => {
    toast({
      description:
        "Please Upgrade Your Subscription To Premium To Build More Floorplans",
    });
  };

  const getFloorplans = async () => {
    const { data } = await axios.get("/api/floorplan");
    setFloorplans(data);
  };

  const getSubscription = async () => {
    const { data } = await axios.get("/api/subscription/user");
    if (data.length === 0) {
      setSubs(false);
    } else {
      setSubs(true);
    }
  };

  useEffect(() => {
    getSubscription();
    getFloorplans();
  }, []);

  useEffect(() => {
    if (singleFloorplan !== null && singleFloorplan.id !== null) {
      navigate(`/editor/${singleFloorplan.id}`);
    }
  }, [singleFloorplan]);

  const createFloorplanHandler = () => {
    if (subs === false && floorplans.length >= 3) {
      subscriptionToast();
    } else {
      dispatch(createFloorplan());
    }
  };

  return (
    <>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <Button
            variant="default"
            size="sm"
            className="w-full justify-start"
            onClick={createFloorplanHandler}
          >
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            Create New Floorplan
          </Button>
        </div>
      </div>
      <div className="py-4 space-y-4">
        <h2 className="relative px-6 text-lg font-semibold tracking-tight">
          Featured Templates
        </h2>
      </div>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            My Floorplans
          </h2>
          <div className="space-y-1">
            <Button
              variant={
                location.pathname === "/dashboard" ? "secondary" : "ghost"
              }
              size="sm"
              className="w-full justify-start"
              onClick={() => navigate(`/dashboard`)}
            >
              <Clock10Icon className="mr-2 h-4 w-4" />
              Recent
            </Button>
            <Button
              variant={
                location.pathname === "/dashboard/favorites"
                  ? "secondary"
                  : "ghost"
              }
              size="sm"
              className="w-full justify-start"
              onClick={() => navigate(`/dashboard/favorites`)}
            >
              <StarIcon className="mr-2 h-4 w-4" />
              Favorites
            </Button>
          </div>
        </div>

        <div className="py-2">
          <h2 className="relative px-6 text-lg font-semibold tracking-tight">
            My Subscription
          </h2>
          <div className="px-4 py-2">
            <div className="space-y-1">
              <Button
                variant={
                  location.pathname === "/dashboard/pricing"
                    ? "secondary"
                    : "ghost"
                }
                size="sm"
                className="w-full justify-start"
                onClick={() => navigate(`/dashboard/pricing`)}
              >
                <CreditCardIcon className="mr-2 h-4 w-4" />
                Subscription
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function UserDashboardSidebar({ className }) {
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
              Dashboard Menu
            </Button>
          </PopoverTrigger>
          <PopoverContent align="center">
            <SidebarContent className="w-full" />
          </PopoverContent>
        </Popover>
      </div>
      <div className={cn("hidden md:block", className)}>
        <SidebarContent />
      </div>
    </>
  );
}

export default UserDashboardSidebar;
