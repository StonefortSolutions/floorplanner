import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import axios from "axios";
import { Loader2 } from "lucide-react";

const Confirmed = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [subs, setSubs] = useState([]);

  const getSubscription = async () => {
    const { data } = await axios.post("/api/subscription/session", {
      sessionId,
    });
    setSubs(data);
    if (data.length === 0) {
      navigate("/notauthorized");
    }
  };

  useEffect(() => {
    getSubscription();
  }, []);

  return (
    <div>
      {subs.length === 0 ? (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin h-20 w-20 dark:text-slate-200" />
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Confirmed;
