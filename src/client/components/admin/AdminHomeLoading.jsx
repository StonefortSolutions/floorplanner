import React from "react";
import { Skeleton } from "../ui/Skeleton";

function AdminHomeLoading() {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-3">
        <Skeleton className="h-36" />
        <Skeleton className="h-36 " />
        <Skeleton className="h-36" />
        <Skeleton className="h-36 " />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Skeleton className="col-span-4" />
        <div className="col-span-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div className="" key={i}>
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminHomeLoading;
