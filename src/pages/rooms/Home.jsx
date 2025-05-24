import RoomCard from '../../components/RoomCard';
import Heading from '../../components/Heading';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/data/api';

const Home = () => {
  // const rooms = await getAllRooms();

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const getAllRooms = async () => {
      const { json } = await apiFetch(`/rooms/`);

      setRooms(json.rooms);
    };

    getAllRooms();
  }, []);

  return (
    <>
      <Heading title="Available Rooms" />
      {rooms.length > 0 ? (
        rooms.map((room) => <RoomCard room={room} key={room._id} />)
      ) : (
        <p>No rooms available at the moment</p>
      )}
    </>
  );
};

export default Home;
