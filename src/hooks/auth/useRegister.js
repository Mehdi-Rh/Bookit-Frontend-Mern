import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { apiFetch } from '@/data/api';

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    const { json, response } = await apiFetch(`/user/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
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

  return { signup, isLoading, error, namez: 'mehdi' };
};
