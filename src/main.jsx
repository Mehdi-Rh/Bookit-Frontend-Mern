import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthContextProvider } from './context/AuthContext';
import { RoomsContextProvider } from './context/RoomsContext';
import { BookingsContextProvider } from './context/BookingsContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <RoomsContextProvider>
        <BookingsContextProvider>
          <App />
        </BookingsContextProvider>
      </RoomsContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
