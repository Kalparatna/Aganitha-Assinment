import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BookProvider } from './context/BookContext';
import ErrorBoundary from './components/ErrorBoundary';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <BookProvider>
        <App />
      </BookProvider>
    </ErrorBoundary>
  </StrictMode>
);