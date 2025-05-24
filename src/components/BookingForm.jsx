import { useAuthContext } from '@/hooks/auth/useAuthContext';
import useAddBooking from '@/hooks/bookings/useAddBooking';
import { useState } from 'react';
import { toast } from 'react-toastify';

const BookingForm = ({ room }) => {
  const [formData, setFormData] = useState({
    room_id: room._id,
    check_in_date: '',
    check_in_time: '',
    check_out_date: '',
    check_out_time: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { addBooking } = useAddBooking();

  const { user } = useAuthContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const getDate = (date, time) => {
      if (!date || !time) return null;
      const dateTimeString = `${date}T${time}`;
      return new Date(dateTimeString);
    };

    const boookingData = {
      user_id: user._id,
      room_id: formData.room_id,
      check_in: getDate(formData.check_in_date, formData.check_in_time),
      check_out: getDate(formData.check_out_date, formData.check_out_time),
    };

    const response = await addBooking(boookingData);

    toast.success('Form data collected!');
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">Book this Room</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input type="hidden" name="room_id" value={room.$id} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="check_in_date" className="block text-sm font-medium text-gray-700">
              Check-In Date
            </label>
            <input
              type="date"
              id="check_in_date"
              name="check_in_date"
              value={formData.check_in_date}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="check_in_time" className="block text-sm font-medium text-gray-700">
              Check-In Time
            </label>
            <input
              type="time"
              id="check_in_time"
              name="check_in_time"
              value={formData.check_in_time}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="check_out_date" className="block text-sm font-medium text-gray-700">
              Check-Out Date
            </label>
            <input
              type="date"
              id="check_out_date"
              name="check_out_date"
              value={formData.check_out_date}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="check_out_time" className="block text-sm font-medium text-gray-700">
              Check-Out Time
            </label>
            <input
              type="time"
              id="check_out_time"
              name="check_out_time"
              value={formData.check_out_time}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
          >
            Book Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
