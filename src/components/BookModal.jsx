import React from 'react';
import { X, Calendar, Users, BookOpen, Globe, Star, Hash, Building } from 'lucide-react';
import { getCoverUrl, getBookUrl } from '../services/bookApi';

const BookModal = ({ book, isOpen, onClose }) => {
  if (!isOpen) return null;

  const coverUrl = book.cover_i ? getCoverUrl(book.cover_i, 'L') : null;
  const bookUrl = getBookUrl(book.key);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Book Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Book Cover */}
            <div className="md:col-span-1">
              {coverUrl ? (
                <img
                  src={coverUrl}
                  alt={book.title}
                  className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
                  onError={(e) => {
                    const target = e.target;
                    target.style.display = 'none';
                    target.parentElement.innerHTML = `
                      <div class="w-full h-96 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-lg">
                        <div class="text-center text-gray-600">
                          <svg class="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                          </svg>
                          <p class="font-medium">No Cover Available</p>
                        </div>
                      </div>
                    `;
                  }}
                />
              ) : (
                <div className="w-full h-96 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-lg">
                  <div className="text-center text-gray-600">
                    <BookOpen className="w-16 h-16 mx-auto mb-4" />
                    <p className="font-medium">No Cover Available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Book Information */}
            <div className="md:col-span-2 space-y-4">
              <h1 className="text-2xl font-bold text-gray-800 leading-tight">{book.title}</h1>

              {book.author_name && book.author_name.length > 0 && (
                <div className="flex items-start space-x-2">
                  <Users className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Authors</p>
                    <p className="text-gray-600">{book.author_name.join(', ')}</p>
                  </div>
                </div>
              )}

              {book.first_publish_year && (
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-700">First Published</p>
                    <p className="text-gray-600">{book.first_publish_year}</p>
                  </div>
                </div>
              )}

              {book.number_of_pages_median && (
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-700">Pages</p>
                    <p className="text-gray-600">{book.number_of_pages_median} pages</p>
                  </div>
                </div>
              )}

              {book.ratings_average && book.ratings_count && (
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="font-medium text-gray-700">Rating</p>
                    <p className="text-gray-600">
                      {book.ratings_average.toFixed(1)} out of 5 ({book.ratings_count.toLocaleString()} ratings)
                    </p>
                  </div>
                </div>
              )}

              {book.language && book.language.length > 0 && (
                <div className="flex items-start space-x-2">
                  <Globe className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Languages</p>
                    <p className="text-gray-600">{book.language.join(', ')}</p>
                  </div>
                </div>
              )}

              {book.publisher && book.publisher.length > 0 && (
                <div className="flex items-start space-x-2">
                  <Building className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">Publishers</p>
                    <p className="text-gray-600">{book.publisher.slice(0, 5).join(', ')}</p>
                    {book.publisher.length > 5 && (
                      <p className="text-sm text-gray-500">+{book.publisher.length - 5} more</p>
                    )}
                  </div>
                </div>
              )}

              {book.isbn && book.isbn.length > 0 && (
                <div className="flex items-start space-x-2">
                  <Hash className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-700">ISBN</p>
                    <p className="text-gray-600 font-mono text-sm">{book.isbn[0]}</p>
                    {book.isbn.length > 1 && (
                      <p className="text-sm text-gray-500">+{book.isbn.length - 1} more</p>
                    )}
                  </div>
                </div>
              )}

              {book.subject && book.subject.length > 0 && (
                <div>
                  <p className="font-medium text-gray-700 mb-2">Subjects</p>
                  <div className="flex flex-wrap gap-2">
                    {book.subject.slice(0, 10).map((subject, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                    {book.subject.length > 10 && (
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                        +{book.subject.length - 10} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200">
                <a
                  href={bookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                  View on Open Library
                  <Globe className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;