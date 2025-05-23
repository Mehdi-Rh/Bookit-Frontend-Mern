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

    const apiUrl = import.meta.env.VITE_API_URL;

    const response = await fetch(`${apiUrl}/api/bookings/remove/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({ id, user_id: user?._id }),
    });
    const json = await response.json();

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
