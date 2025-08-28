import { useCallback } from 'react';
import { searchBooks } from '../services/bookApi';
import { useBookContext } from '../context/BookContext';

/**
 * Custom hook for book search functionality
 * @returns {Object} Search state and functions
 */
export const useBookSearch = () => {
  const { state, dispatch, ActionTypes } = useBookContext();
  const { books, loading, error, totalResults, currentParams, hasMore } = state;

  const performSearch = useCallback(async (params, append = false) => {
    if (!params.query.trim()) {
      dispatch({ type: ActionTypes.SET_BOOKS, payload: [] });
      dispatch({ type: ActionTypes.SET_HAS_MORE, payload: false });
      return;
    }

    dispatch({ type: ActionTypes.SET_LOADING, payload: true });
    dispatch({ type: ActionTypes.SET_ERROR, payload: null });

    try {
      const result = await searchBooks(params);
      
      if (append) {
        dispatch({ type: ActionTypes.APPEND_BOOKS, payload: result.docs });
      } else {
        dispatch({ 
          type: ActionTypes.SET_BOOKS, 
          payload: result.docs, 
          totalResults: result.numFound 
        });
      }
      
      dispatch({ 
        type: ActionTypes.SET_HAS_MORE, 
        payload: result.docs.length === params.limit && (params.offset + params.limit) < result.numFound 
      });
      
      dispatch({ type: ActionTypes.SET_SEARCH_PARAMS, payload: params });
      
      // Add to search history
      dispatch({ 
        type: ActionTypes.ADD_TO_HISTORY, 
        payload: {
          query: params.query,
          searchType: params.searchType,
          timestamp: new Date().toISOString(),
          resultCount: result.numFound
        }
      });
    } catch (err) {
      dispatch({ 
        type: ActionTypes.SET_ERROR, 
        payload: err instanceof Error ? err.message : 'An error occurred' 
      });
      
      if (!append) {
        dispatch({ type: ActionTypes.SET_BOOKS, payload: [] });
        dispatch({ type: ActionTypes.SET_HAS_MORE, payload: false });
      }
    } finally {
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    }
  }, [dispatch, ActionTypes]);

  const handleSearch = useCallback(async (params) => {
    await performSearch(params, false);
  }, [performSearch]);

  const loadMore = useCallback(async () => {
    if (!currentParams || !hasMore) return;
    
    const newParams = {
      ...currentParams,
      offset: currentParams.offset + currentParams.limit
    };
    
    await performSearch(newParams, true);
  }, [currentParams, hasMore, performSearch]);

  return {
    books,
    loading,
    error,
    totalResults,
    searchBooks: handleSearch,
    loadMore,
    hasMore
  };
};