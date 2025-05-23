import { useAuthContext } from '../auth/useAuthContext';
import { useRoomsContext } from './useRoomContext';
import { useNavigate } from 'react-router';

const useAddRoom = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const { dispatch } = useRoomsContext();
  const addRoom = async (room) => {
    // if (!user) {
    //   setError('You must be logged in');
    //   return;
    // }

    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiUrl}/api/rooms/add`, {
      method: 'POST',
      body: JSON.stringify({ ...room, user_id: user?._id }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
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
      dispatch({ type: 'CREATE_ROOM', payload: json });
      navigate('/');
    }
    return response;
  };

  return { addRoom };
};

export default useAddRoom;
