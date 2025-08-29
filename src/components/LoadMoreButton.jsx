import React from 'react';
import { ChevronDown } from 'lucide-react';

const LoadMoreButton = ({ onLoadMore, loading, hasMore }) => {
  if (!hasMore) {
    return null;
  }

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={onLoadMore}
        disabled={loading}
        className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            <span>Loading...</span>
          </>
        ) : (
          <>
            <span>More Books</span>
            <ChevronDown className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
};

export default LoadMoreButton;