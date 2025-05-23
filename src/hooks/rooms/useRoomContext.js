import { RoomsContext } from '../../context/RoomsContext';
import { useContext } from 'react';

export const useRoomsContext = () => {
  const context = useContext(RoomsContext);

  if (!context) {
    throw Error('useRoomsContext must be used inside a RoomsContextProvider');
  }

  return context;
};
