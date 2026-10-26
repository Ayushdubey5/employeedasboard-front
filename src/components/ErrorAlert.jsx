import React from 'react';

export default function ErrorAlert({ error, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 sm:p-8 text-center animate-fade-in">
      <div className="text-5xl mb-4">⚠️</div>
      <h3 className="text-lg font-bold text-red-800 mb-2">
        Failed to Load Tasks
      </h3>
      <p className="text-sm text-red-600 mb-6 max-w-md mx-auto">
        {error}
      </p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white 
          rounded-lg font-semibold text-sm hover:bg-red-700 
          transition-all duration-200 active:scale-95 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Retry
      </button>
    </div>
  );
}