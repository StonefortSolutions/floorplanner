import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

const NotAuthorized = () => {
  return (
    <div>
      <div className="flex items-center flex-col space-y-10">
        <div className="font-bold text-2xl">
          We're sorry, you are not authorized to view this page
        </div>
        <div className="border">
          <Link to={"/"}>
            <Button variant="link">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotAuthorized;
