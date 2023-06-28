import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardFooter,
  CardDescription,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { PencilIcon } from "lucide-react";
import { XCircleIcon } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/Dialog";
import { useToast } from "../hooks/useToast";
import { useDispatch, useSelector } from "react-redux";
import { fetchFloorplans } from "../store/floorplan";

const exampleFloorplans = [
  {
    id: 1,
    name: "My First Floorplan",
    description: "This is my first floorplan",
  },
  {
    id: 2,
    name: "My Second Floorplan",
    description: "This is my second floorplan",
  },
];

function UserDashboardHome() {
  const { toast } = useToast();
  const testToast = () => {
    toast({
      description: "This is a test toast",
    });
  };

  const { floorplans } = useSelector((state) => state.floorplan);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFloorplans());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Welcome to your dashboard. Here you can view your floorplans, create new
        ones, and edit existing ones.
      </p>
      <div className="mt-4">
        <h2 className="text-lg font-semibold tracking-tight">My Floorplans</h2>
        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {floorplans.map((floorplan) => (
            <Card key={floorplan.id}>
              <img
                src="https://i.redd.it/l8w3r7t6avh21.png"
                alt="fat yoshi"
                className="rounded-lg p-4"
              />
              <CardContent>
                <CardTitle>{floorplan.name}</CardTitle>
              </CardContent>
              <CardFooter>
                <div className="flex flex-row justify-between w-full">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <XCircleIcon className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => testToast()}
                  >
                    <PencilIcon className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserDashboardHome;
