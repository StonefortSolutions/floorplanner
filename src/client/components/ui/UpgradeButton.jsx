import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import { useToast } from "../../hooks/useToast";
import { useClerk } from "@clerk/clerk-react";

const UpgradeButton = () => {
  const { toast } = useToast();
  const { user } = useClerk();
  const userId = user.id;
  const [subs, setSubs] = useState([]);

  const subscribedToast = () => {
    toast({
      description: "You Are Already Subscribed!",
    });
  };

  const getSubscription = async () => {
    const { data } = await axios.post("/api/subscription/user", {
      userId,
    });
    setSubs(data);
  };

  useEffect(() => {
    getSubscription();
  }, []);

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
      {subs.length === 0 ? (
        <Button
          variant="default"
          size="lg"
          className=""
          onClick={checkoutHandler}
        >
          Upgrade
        </Button>
      ) : (
        <Button
          variant="default"
          size="lg"
          className=""
          onClick={subscribedToast}
        >
          SUBSCRIBED
        </Button>
      )}
    </div>
  );
};

export default UpgradeButton;
