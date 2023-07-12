import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import UpgradeButton from "../components/ui/UpgradeButton";

const Declined = () => {
  return (
    <div>
      <div className="flex items-center flex-col space-y-10">
        <div className="font-bold text-2xl">
          We're sorry, your payment was not processed
        </div>
        <div>
          Your payment information may have been entered incorrectly, or your
          payment was declined. Click the upgrade button to try again, or return
          to our home page
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <div className="m-5">
          <UpgradeButton />
        </div>
        <div className="border m-5">
          <Link to={"/"}>
            <Button variant="link">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Declined;
