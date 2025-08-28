// Book search result interface (converted to JSDoc comments for better documentation)

/**
 * @typedef {Object} BookSearchResult
 * @property {string} key
 * @property {string} title
 * @property {string[]} [author_name]
 * @property {number} [first_publish_year]
 * @property {string[]} [isbn]
 * @property {number} [cover_i]
 * @property {string[]} [subject]
 * @property {string[]} [publisher]
 * @property {number} [number_of_pages_median]
 * @property {number} [ratings_average]
 * @property {number} [ratings_count]
 * @property {string[]} [language]
 */

/**
 * @typedef {Object} BookSearchResponse
 * @property {BookSearchResult[]} docs
 * @property {number} numFound
 * @property {number} start
 */

/**
 * @typedef {Object} SearchParams
 * @property {string} query
 * @property {'title' | 'author' | 'isbn' | 'subject'} searchType
 * @property {number} limit
 * @property {number} offset
 */

// Export empty object to make this a module
export {};