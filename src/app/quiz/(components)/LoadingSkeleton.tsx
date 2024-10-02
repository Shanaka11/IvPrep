import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="flex gap-4 flex-col flex-wrap mt-5">
      <Skeleton className="w-full h-36 rounded-lg" />
      <Skeleton className="w-full h-36 rounded-lg" />
      <Skeleton className="w-full h-36 rounded-lg" />
    </div>
  );
};

export default LoadingSkeleton;
