// import getMyBookings from "../actions/getMyBookings";
// import Heading from "../../components/Heading";
import BookedRoomCard from './BookedRoomCard';
import Heading from '../../components/Heading';
import { useAuthContext } from '@/hooks/auth/useAuthContext';
import { useEffect, useState } from 'react';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  const { user } = useAuthContext();

  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getMyBookings = async () => {
      const response = await fetch(`${baseUrl}/bookings/my-bookings?userId=${user._id}`);
      const data = await response.json();

      console.log({ data });
      setBookings(data.bookings);
    };

    getMyBookings();
  }, []);
  return (
    <>
      <Heading title="My Bookings" />
      {bookings.length === 0 ? (
        <p className="text-gray-600 mt-4">You have no bookings</p>
      ) : (
        bookings.map((booking) => <BookedRoomCard key={booking._id} booking={booking} />)
      )}
    </>
  );
};

export default BookingsPage;
