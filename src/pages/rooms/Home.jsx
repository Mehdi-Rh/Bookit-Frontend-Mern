import RoomCard from '../../components/RoomCard';
import Heading from '../../components/Heading';
import { useEffect, useState } from 'react';

const Home = () => {
  // const rooms = await getAllRooms();

  const [rooms, setRooms] = useState([]);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getAllRooms = async () => {
      const response = await fetch(`${baseUrl}/rooms/`);
      const data = await response.json();
      setRooms(data.rooms);
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
