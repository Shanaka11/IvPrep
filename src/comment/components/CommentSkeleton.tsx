import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CommentSkeleton = () => {
  return (
    <div className="flex gap-4 flex-col flex-wrap w-full mt-2 p-4">
      <Skeleton className="w-full h-4 rounded-lg" />
      <Skeleton className="w-full h-4 rounded-lg" />
      <Skeleton className="w-1/2 h-4 rounded-lg" />
    </div>
  );
};

export default CommentSkeleton;
