import React, { useState } from 'react';
import { User, LogOut, Heart, History, X } from 'lucide-react';
import { useBookContext } from '../context/BookContext';
import BookCard from './BookCard';

const UserProfile = ({ isOpen, onClose }) => {
  const { state, dispatch, ActionTypes } = useBookContext();
  const { currentUser, favorites, history } = state;
  const [activeTab, setActiveTab] = useState('favorites'); // 'favorites' or 'history'

  if (!isOpen || !currentUser) return null;

  const handleLogout = () => {
    dispatch({ type: ActionTypes.LOGOUT });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Profile
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* User Info */}
          <div className="mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{currentUser.name}</h3>
                <p className="text-gray-600">{currentUser.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`flex items-center px-4 py-2 font-medium ${activeTab === 'favorites' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('favorites')}
            >
              <Heart className={`w-4 h-4 mr-2 ${activeTab === 'favorites' ? 'text-blue-600' : 'text-gray-500'}`} />
              Favorites
            </button>
            <button
              className={`flex items-center px-4 py-2 font-medium ${activeTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('history')}
            >
              <History className={`w-4 h-4 mr-2 ${activeTab === 'history' ? 'text-blue-600' : 'text-gray-500'}`} />
              Search History
            </button>
          </div>

          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Your Favorite Books</h3>
              
              {favorites.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">You haven't added any favorites yet</p>
                  <p className="text-sm text-gray-500 mt-1">Search for books and click the heart icon to add them here</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favorites.map(book => (
                    <BookCard 
                      key={book.key} 
                      book={book} 
                      onClick={() => {}} 
                      isFavorite={true}
                      onToggleFavorite={() => {
                        dispatch({ 
                          type: ActionTypes.REMOVE_FROM_FAVORITES, 
                          payload: book 
                        });
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Searches</h3>
              
              {history.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <History className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">No search history yet</p>
                  <p className="text-sm text-gray-500 mt-1">Your recent searches will appear here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {history.map((item, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-800">"{item.query}"</p>
                          <p className="text-sm text-gray-600">
                            Searched by: {item.searchType} • 
                            {new Date(item.timestamp).toLocaleDateString()} • 
                            {item.resultCount} results
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;