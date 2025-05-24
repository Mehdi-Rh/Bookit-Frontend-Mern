import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { apiFetch } from '@/data/api';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const { json, response } = await apiFetch(`/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else if (response.ok) {
      // save the user to the local storage
      localStorage.setItem('user', JSON.stringify(json));

      // update the useCoontext
      dispatch({ type: 'LOGIN', payload: json });

      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
