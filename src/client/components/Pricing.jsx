import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/Card";
import { CheckCircle2 } from "lucide-react";
import UpgradeButton from "./ui/UpgradeButton";

const tempPlans = [
  {
    name: "Free",
    amount: 0,
    description: "Free forever. For hobbyists and students.",
    features: ["3 Floorplans", "Basic furniture, 50+ items"],
  },
  {
    name: "Premium",
    amount: 2.99,
    description: "For professionals and small businesses.",
    features: ["Unlimited Floorplans", "All furniture, 200+ items"],
  },
];

function Pricing({ isDashboard }) {
  return (
    <div className="z-10 min-h-[50vh] w-full px-5 xl:px-0">
      {isDashboard && <h1 className="font-cal text-7xl/[5rem]">Pricing</h1>}
      <h3 className="text-2xl">Simple Price, No hidden fees, No surprises.</h3>

      <div className="p-3">
        {/* <h4 className="text-xl tracking-tight">
          My Subscription: <span className="font-semibold">PREMIUM</span>
        </h4>
        <h5 className="text-lg tracking-tight">Expires on: 12/31/2021</h5> */}
      </div>
      <div className="my-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        {tempPlans.map((plan) => (
          <PricingCard plan={plan} key={plan.name} isDashboard={isDashboard} />
        ))}
      </div>
    </div>
  );
}

function PricingCard({ plan, isDashboard }) {
  return (
    <Card className="border-white border-2 rounded-lg shadow-lg ">
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <div className="text-2xl font-bold">
          <span className="text-xl font-bold">$</span> {plan.amount}{" "}
          <span className="text-base font-normal"> / month</span>
        </div>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <ul className="flex flex-col px-6 pb-6">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center">
            <CheckCircle2 className="mr-2 h-6 w-6 fill-primary text-primary-foreground" />
            {feature}
          </li>
        ))}
      </ul>
      <div className="px-6 pb-6 w-full">
        {isDashboard && plan.name === "Premium" && <UpgradeButton />}
      </div>
    </Card>
  );
}

export default Pricing;
