import React, { createContext, useReducer } from 'react';

export const BookingsContext = createContext(null);

const bookingsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOOKINGS':
      return {
        ...action.payload,
      };
    case 'CREATE_BOOKING':
      return {
        ...state,
        bookings: [action.payload, ...state.bookings],
      };
    case 'DELETE_BOOKING':
      return {
        ...state,
        bookings: state.bookings.filter((booking) => booking._id != action.payload._id),
      };
    default:
      return;
  }
};

export const BookingsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingsReducer, {
    bookings: [],
  });
  return (
    <BookingsContext.Provider value={{ ...state, dispatch }}>{children} </BookingsContext.Provider>
  );
};
