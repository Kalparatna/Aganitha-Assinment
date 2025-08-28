import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  books: [],
  loading: false,
  error: null,
  totalResults: 0,
  currentParams: null,
  hasMore: false,
  favorites: [],
  history: [],
  currentUser: null,
};

// Action types
const ActionTypes = {
  SET_BOOKS: 'SET_BOOKS',
  APPEND_BOOKS: 'APPEND_BOOKS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_SEARCH_PARAMS: 'SET_SEARCH_PARAMS',
  SET_HAS_MORE: 'SET_HAS_MORE',
  ADD_TO_FAVORITES: 'ADD_TO_FAVORITES',
  REMOVE_FROM_FAVORITES: 'REMOVE_FROM_FAVORITES',
  ADD_TO_HISTORY: 'ADD_TO_HISTORY',
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT',
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
    case ActionTypes.ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case ActionTypes.REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(book => book.key !== action.payload.key),
      };
    case ActionTypes.ADD_TO_HISTORY:
      // Prevent duplicate entries in history
      if (state.history.some(item => item.query === action.payload.query)) {
        return state;
      }
      return {
        ...state,
        history: [action.payload, ...state.history].slice(0, 10), // Keep only last 10 searches
      };
    case ActionTypes.SET_HISTORY:
      return {
        ...state,
        history: action.payload,
      };
    case ActionTypes.SET_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        currentUser: null,
        favorites: [], // Clear user-specific data
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

  // Load favorites from localStorage on initial render
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('bookFinderFavorites');
      const storedHistory = localStorage.getItem('bookFinderHistory');
      const storedUser = localStorage.getItem('bookFinderUser');
      
      if (storedFavorites) {
        const favorites = JSON.parse(storedFavorites);
        dispatch({ type: ActionTypes.SET_BOOKS, payload: favorites });
      }
      
      if (storedHistory) {
        const history = JSON.parse(storedHistory);
        dispatch({ type: ActionTypes.SET_HISTORY, payload: history });
      }
      
      if (storedUser) {
        const user = JSON.parse(storedUser);
        dispatch({ type: ActionTypes.SET_USER, payload: user });
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('bookFinderFavorites', JSON.stringify(state.favorites));
      localStorage.setItem('bookFinderHistory', JSON.stringify(state.history));
      if (state.currentUser) {
        localStorage.setItem('bookFinderUser', JSON.stringify(state.currentUser));
      } else {
        localStorage.removeItem('bookFinderUser');
      }
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }, [state.favorites, state.history, state.currentUser]);

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