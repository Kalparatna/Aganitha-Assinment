import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const SearchForm = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch({
        query: query.trim(),
        searchType,
        limit: 20,
        offset: 0
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books..."
            className="block w-full pl-10 pr-24 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            disabled={loading}
          />
          <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-3">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 hover:bg-gray-200 p-2 rounded-md mr-2"
            >
              <Filter className="h-5 w-5" />
            </button>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors font-medium"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-wrap gap-2">
              <label className="text-sm font-medium text-gray-700 mr-3">Search by:</label>
              {[
                { value: 'title', label: 'Title' },
                { value: 'author', label: 'Author' },
                { value: 'isbn', label: 'ISBN' },
                { value: 'subject', label: 'Subject' }
              ].map(option => (
                <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="searchType"
                    value={option.value}
                    checked={searchType === option.value}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-600">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchForm;