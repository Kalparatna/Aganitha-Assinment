import React from 'react';
import { BookOpen, Calendar, Users, Star, ExternalLink } from 'lucide-react';
import { getCoverUrl, getBookUrl } from '../services/bookApi';

const BookCard = ({ book, onClick }) => {
  const coverUrl = book.cover_i ? getCoverUrl(book.cover_i, 'M') : null;
  const bookUrl = getBookUrl(book.key);

  const handleCardClick = () => {
    onClick(book);
  };

  const handleExternalClick = (e) => {
    e.stopPropagation();
    window.open(bookUrl, '_blank');
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-200 hover:border-blue-300 transform hover:-translate-y-1"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden rounded-t-lg bg-gray-100">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={book.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              const target = e.target;
              target.style.display = 'none';
              target.parentElement.innerHTML = `
                <div class="w-full h-48 flex items-center justify-center bg-gray-200">
                  <div class="text-center text-gray-500">
                    <svg class="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                    </svg>
                    <p class="text-xs">No Cover</p>
                  </div>
                </div>
              `;
            }}
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="text-center text-gray-600">
              <BookOpen className="w-12 h-12 mx-auto mb-2" />
              <p className="text-xs font-medium">No Cover Available</p>
            </div>
          </div>
        )}
        
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button
            onClick={handleExternalClick}
            className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
            title="View on Open Library"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {book.title}
        </h3>
        
        {book.author_name && book.author_name.length > 0 && (
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Users className="w-4 h-4 mr-1" />
            <span className="line-clamp-1">
              {book.author_name.slice(0, 2).join(', ')}
              {book.author_name.length > 2 && ` +${book.author_name.length - 2} more`}
            </span>
          </div>
        )}

        {book.first_publish_year && (
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Published {book.first_publish_year}</span>
          </div>
        )}

        {book.ratings_average && book.ratings_count && (
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <Star className="w-4 h-4 mr-1 text-yellow-500" />
            <span>
              {book.ratings_average.toFixed(1)} ({book.ratings_count.toLocaleString()} ratings)
            </span>
          </div>
        )}

        {book.subject && book.subject.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {book.subject.slice(0, 3).map((subject, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {subject}
              </span>
            ))}
            {book.subject.length > 3 && (
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{book.subject.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;