import React, { createContext, useReducer } from 'react';

export const RoomsContext = createContext(null);

const roomsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ROOMS':
      return {
        ...action.payload,
      };
    case 'CREATE_ROOM':
      return {
        ...state,
        rooms: [action.payload, ...state.rooms],
      };
    case 'DELETE_ROOM':
      return {
        ...state,
        rooms: state.rooms.filter((room) => room._id != action.payload._id),
      };
    default:
      return;
  }
};

export const RoomsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(roomsReducer, {
    rooms: [],
  });
  return <RoomsContext.Provider value={{ ...state, dispatch }}>{children} </RoomsContext.Provider>;
};
