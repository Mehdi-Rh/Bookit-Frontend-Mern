'use client';
import useRemoveBooking from '@/hooks/bookings/useRemoveRoom';
import { toast } from 'react-toastify';
// import cancelBooking from "@/app/actions/cancelBooking";

const CancelBookingButton = ({ bookingId }) => {
  const { removeBooking } = useRemoveBooking();
  const handleCancelClick = async () => {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    // const cancelBooking = async (bookingId) => {
    //   removeBooking(bookingId);
    // };
    try {
      const result = await removeBooking(bookingId);

      if (result.success) {
        toast.success('Booking cancelled successfully!');
      }
    } catch (error) {
      console.log('Failed to cancel booking', error);
      return {
        error: 'Failed to cancel booking',
      };
    }
  };

  return (
    <button
      onClick={handleCancelClick}
      className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700"
    >
      Cancel Booking
    </button>
  );
};

export default CancelBookingButton;
