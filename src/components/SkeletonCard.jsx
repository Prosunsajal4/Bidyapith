import React from "react";

const SkeletonCard = () => {
  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <figure className="relative">
        <div className="h-52 w-full bg-base-300"></div>
        <div className="absolute top-3 left-3 w-16 h-6 bg-base-300 rounded-full"></div>
        <div className="absolute top-3 right-3 w-14 h-6 bg-base-300 rounded-full"></div>
      </figure>

      {/* Content Skeleton */}
      <div className="card-body p-5">
        <div className="h-6 bg-base-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-base-300 rounded w-1/2 mb-4"></div>
        <div className="h-10 bg-base-300 rounded w-full"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
