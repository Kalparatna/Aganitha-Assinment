import React from 'react';
import { BookOpen } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">BookFinder</h1>
              <p className="text-sm text-gray-600">Discover your next great read</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;