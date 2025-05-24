import { apiFetch } from '@/data/api';
import { useAuthContext } from '../auth/useAuthContext';
import { useRoomsContext } from './useRoomContext';
import { useNavigate } from 'react-router';

const useRemoveRoom = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const { dispatch } = useRoomsContext();
  const removeRoom = async (id) => {
    // if (!user) {
    //   setError('You must be logged in');
    //   return;
    // }

    const { json, response } = await apiFetch(`/rooms/remove/${id}`, {
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
      dispatch({ type: 'REMOVE_ROOM', payload: json });
      navigate('/');
    }
    return response;
  };

  return { removeRoom };
};

export default useRemoveRoom;
