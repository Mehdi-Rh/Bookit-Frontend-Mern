// import { useTasksContext } from "./useTasksContext";

import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  //   const { dispatch: tasksDispatch } = useTasksContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user');

    // dispatch logout action
    dispatch({ type: 'LOGOUT' });
    // tasksDispatch({ type: "SET_TASKS", payload: null });
  };

  return { logout };
};
