import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { useBookSearch } from './hooks/useBookSearch';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import BookGrid from './components/BookGrid';
import BookModal from './components/BookModal';
import LoadMoreButton from './components/LoadMoreButton';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const { books, loading, error, totalResults, searchBooks, loadMore, hasMore } = useBookSearch();
  const [selectedBook, setSelectedBook] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (params) => {
    setHasSearched(true);
    await searchBooks(params);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Find Your Perfect Book
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search through millions of books by title, author, ISBN, or subject. 
            Discover detailed information, ratings, and find your next favorite read.
          </p>
        </div>

        {/* Search Form */}
        <div className="mb-8">
          <SearchForm onSearch={handleSearch} loading={loading} />
        </div>

        {/* Results Summary */}
        {hasSearched && !loading && books.length > 0 && (
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              Found <span className="font-semibold text-gray-800">{totalResults.toLocaleString()}</span> books
              {totalResults > books.length && ` (showing first ${books.length})`}
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-8">
            <ErrorMessage 
              message={error} 
              onRetry={() => window.location.reload()} 
            />
          </div>
        )}

        {/* No Results */}
        {hasSearched && !loading && books.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No books found</h3>
            <p className="text-gray-600">Try adjusting your search terms or search by a different category.</p>
          </div>
        )}

        {/* Book Grid */}
        <BookGrid books={books} onBookClick={handleBookClick} loading={loading} />

        {/* Load More Button */}
        <LoadMoreButton onLoadMore={loadMore} loading={loading} hasMore={hasMore} />

        {/* Book Details Modal */}
        {selectedBook && (
          <BookModal
            book={selectedBook}
            isOpen={!!selectedBook}
            onClose={handleCloseModal}
          />
        )}

        {/* Welcome State */}
        {!hasSearched && (
          <div className="text-center py-16">
            <div className="max-w-lg mx-auto">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Ready to discover amazing books?
              </h3>
              <p className="text-gray-600 mb-6">
                Use the search above to find books by title, author, ISBN, or explore by subject. 
                Get detailed information including covers, ratings, and publication details.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="font-medium text-gray-800">Search by Title</div>
                  <div className="text-gray-600">Find specific books</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="font-medium text-gray-800">Search by Author</div>
                  <div className="text-gray-600">Discover all works</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="font-medium text-gray-800">Search by ISBN</div>
                  <div className="text-gray-600">Exact book lookup</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="font-medium text-gray-800">Browse Subjects</div>
                  <div className="text-gray-600">Explore topics</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              Powered by <a href="https://openlibrary.org" className="text-blue-600 hover:underline">Open Library API</a>
            </p>
            <p className="text-sm">
              Built with ❤️ for college students and book lovers everywhere
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;