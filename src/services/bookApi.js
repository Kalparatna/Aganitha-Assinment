const BASE_URL = 'https://openlibrary.org';

/**
 * Search for books using the Open Library API
 * @param {import('../types/book.js').SearchParams} params - Search parameters
 * @returns {Promise<import('../types/book.js').BookSearchResponse>}
 */
export const searchBooks = async (params) => {
  const { query, searchType, limit, offset } = params;
  
  if (!query.trim()) {
    return { docs: [], numFound: 0, start: 0 };
  }

  let searchUrl = `${BASE_URL}/search.json?`;
  
  // Build search parameters based on type
  switch (searchType) {
    case 'title':
      searchUrl += `title=${encodeURIComponent(query)}`;
      break;
    case 'author':
      searchUrl += `author=${encodeURIComponent(query)}`;
      break;
    case 'isbn':
      searchUrl += `isbn=${encodeURIComponent(query)}`;
      break;
    case 'subject':
      searchUrl += `subject=${encodeURIComponent(query)}`;
      break;
  }
  
  searchUrl += `&limit=${limit}&offset=${offset}`;
  
  try {
    const response = await fetch(searchUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Failed to fetch books. Please try again.');
  }
};

/**
 * Get cover image URL
 * @param {number} coverId - Cover ID
 * @param {'S' | 'M' | 'L'} size - Image size
 * @returns {string}
 */
export const getCoverUrl = (coverId, size = 'M') => {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};

/**
 * Get book URL on Open Library
 * @param {string} key - Book key
 * @returns {string}
 */
export const getBookUrl = (key) => {
  return `${BASE_URL}${key}`;
};