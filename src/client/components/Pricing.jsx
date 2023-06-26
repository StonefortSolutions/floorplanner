import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/Card";
import { CheckCircle2 } from "lucide-react";
import { Button } from "./ui/Button";

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
      <h1 className="font-cal text-7xl/[5rem]">Pricing</h1>
      <h3 className="text-2xl">Simple Price, No hidden fees, No surprises.</h3>
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
    <Card className="border-white border-2 rounded-lg shadow-lg">
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
        {isDashboard && plan.name === "Premium" && (
          <Button variant="default" size="lg" className="">
            Upgrade
          </Button>
        )}
      </div>
    </Card>
  );
}

export default Pricing;
