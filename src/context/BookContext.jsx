import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  books: [],
  loading: false,
  error: null,
  totalResults: 0,
  currentParams: null,
  hasMore: false,
};

// Action types
const ActionTypes = {
  SET_BOOKS: 'SET_BOOKS',
  APPEND_BOOKS: 'APPEND_BOOKS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_SEARCH_PARAMS: 'SET_SEARCH_PARAMS',
  SET_HAS_MORE: 'SET_HAS_MORE',
};

// Reducer function
const bookReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_BOOKS:
      return {
        ...state,
        books: action.payload,
        totalResults: action.totalResults || 0,
      };
    case ActionTypes.APPEND_BOOKS:
      return {
        ...state,
        books: [...state.books, ...action.payload],
      };
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ActionTypes.SET_SEARCH_PARAMS:
      return {
        ...state,
        currentParams: action.payload,
      };
    case ActionTypes.SET_HAS_MORE:
      return {
        ...state,
        hasMore: action.payload,
      };
    default:
      return state;
  }
};

// Create context
const BookContext = createContext();

// Context provider component
export const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  return (
    <BookContext.Provider value={{ state, dispatch, ActionTypes }}>
      {children}
    </BookContext.Provider>
  );
};

// Custom hook to use the book context
export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBookContext must be used within a BookProvider');
  }
  return context;
};