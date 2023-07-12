import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

const Confirmed = () => {
  return (
    <div>
      <div className="flex items-center flex-col space-y-10">
        <div className="font-bold text-2xl">
          Success 🎉 Your premium subscription is now active!
        </div>
        <div>
          Enjoy building unlimited floor plans and access to our entire
          furniture catalog
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <div className="border m-5">
          <Link to={"/"}>
            <Button variant="link">Home</Button>
          </Link>
        </div>
        <div className="border m-5">
          <Link to={"/dashboard"}>
            <Button variant="link">Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmed;
