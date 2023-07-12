import axios from "axios";
import React from "react";
import { Button } from "./Button";

const UpgradeButton = () => {
  const checkoutHandler = async () => {
    try {
      const { data } = await axios.post("/api/stripe");
      window.location = data.url;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button
        variant="default"
        size="lg"
        className=""
        onClick={checkoutHandler}
      >
        Upgrade
      </Button>
    </div>
  );
};

export default UpgradeButton;
