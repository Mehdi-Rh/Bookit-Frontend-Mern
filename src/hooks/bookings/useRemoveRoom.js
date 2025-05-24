import { apiFetch } from '@/data/api';
import { useAuthContext } from '../auth/useAuthContext';
import { useBookingsContext } from './useBookingContext';
import { useNavigate } from 'react-router';

const useRemoveBooking = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const { dispatch } = useBookingsContext();
  const removeBooking = async (id) => {
    // if (!user) {
    //   setError('You must be logged in');
    //   return;
    // }

    const { json, response } = await apiFetch(`/bookings/remove/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({ id, user_id: user?._id }),
    });

    if (!response.ok) {
      //   setError(json.error);
      //   setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      //   setEmptyFields([]);
      //   setTitle('');
      //   setLoad('');
      //   setReps('');
      dispatch({ type: 'REMOVE_BOOKING', payload: json });
      navigate('/');
    }
    return response;
  };

  return { removeBooking };
};

export default useRemoveBooking;
