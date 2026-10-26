import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Metrics Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-4 sm:p-5 card-shadow">
            <div className="skeleton h-3 w-20 rounded mb-3"></div>
            <div className="skeleton h-8 w-12 rounded"></div>
          </div>
        ))}
      </div>

      {/* Filter Skeleton */}
      <div className="bg-white rounded-xl card-shadow p-4 sm:p-5">
        <div className="skeleton h-10 w-full rounded-lg mb-4"></div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="skeleton h-3 w-16 rounded mb-2"></div>
              <div className="skeleton h-10 w-full rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl card-shadow p-5">
            <div className="flex justify-between mb-3">
              <div className="skeleton h-4 w-16 rounded"></div>
              <div className="skeleton h-4 w-14 rounded-full"></div>
            </div>
            <div className="skeleton h-5 w-full rounded mb-2"></div>
            <div className="skeleton h-5 w-3/4 rounded mb-4"></div>
            <div className="flex gap-4 mb-4">
              <div className="skeleton h-3 w-24 rounded"></div>
              <div className="skeleton h-3 w-20 rounded"></div>
            </div>
            <div className="flex justify-between">
              <div className="skeleton h-6 w-20 rounded-full"></div>
              <div className="skeleton h-7 w-24 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 border-4 border-blue-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-10 h-10 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <span className="text-sm font-medium text-gray-500">Loading tasks from APIs...</span>
        </div>
      </div>
    </div>
  );
}