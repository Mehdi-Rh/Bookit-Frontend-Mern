import { apiFetch } from '@/data/api';
import { useAuthContext } from '../auth/useAuthContext';
import { useBookingsContext } from './useBookingContext';
import { useNavigate } from 'react-router';

const useAddBooking = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const { dispatch } = useBookingsContext();
  const addBooking = async (booking) => {
    // if (!user) {
    //   setError('You must be logged in');
    //   return;
    // }

    const { json, response } = await apiFetch(`/bookings/add`, {
      method: 'POST',
      body: JSON.stringify({ ...booking, user_id: user?._id }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
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
      dispatch({ type: 'CREATE_BOOKING', payload: json });
      navigate('/bookings');
    }
    return response;
  };

  return { addBooking };
};

export default useAddBooking;
