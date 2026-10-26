import React from 'react';

export default function EmptyState({ onClearFilters }) {
  return (
    <div className="bg-white rounded-xl card-shadow p-8 sm:p-12 text-center animate-fade-in">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-lg font-bold text-gray-700 mb-2">
        No tasks match your selected filters
      </h3>
      <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
        Try adjusting your search query or clearing some filters to see more results.
      </p>
      <button
        onClick={onClearFilters}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white 
          rounded-lg font-semibold text-sm hover:bg-blue-700 
          transition-all duration-200 active:scale-95 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M6 18L18 6M6 6l12 12" />
        </svg>
        Clear All Filters
      </button>
    </div>
  );
}