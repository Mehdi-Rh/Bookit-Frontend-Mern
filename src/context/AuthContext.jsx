import { createContext, useEffect, useReducer } from 'react';

export const AuthContext = createContext({ user: null, isUserLoading: true });

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload, isUserLoading: false };
    case 'LOGOUT':
      return { user: null, isUserLoading: false };
    case 'REDIRECT_LOGIN':
      return { user: null, isUserLoading: false };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isUserLoading: true,
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    } else dispatch({ type: 'REDIRECT_LOGIN' });
  }, []);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
