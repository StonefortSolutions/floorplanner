import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

const NotFound = () => {
  return (
    <div className="flex items-center flex-col space-y-10">
      <div className="font-bold text-2xl">404: Page not found</div>
      <div className="border">
        <Link to={"/"}>
          <Button variant="link">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
