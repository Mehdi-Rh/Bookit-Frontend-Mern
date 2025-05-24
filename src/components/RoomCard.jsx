import useRemoveRoom from '@/hooks/rooms/useRemoveRoom';
import { Link } from 'react-router';

const RoomCard = ({ room, sourcePage = null }) => {
  const imageSrc = `/images/rooms/${room.image}`;

  const { removeRoom } = useRemoveRoom();

  return (
    <div className="bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <img
          src={room.image}
          width={400}
          height={100}
          alt={room.name}
          className="w-full sm:w-32 sm:h-32 mb-3 sm:mb-0 object-cover rounded-lg"
        />
        <div className="space-y-1">
          <h4 className="text-lg font-semibold">{room.name}</h4>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800"> Address:</span> {room.address}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Availability:</span>
            {room.availability}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800"> Price:</span>${room.price_per_hour}/hour
          </p>
        </div>
      </div>
      <div className="flex gap-2 self-end">
        <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0 self-end">
          <Link
            to={`/rooms/${room._id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-blue-700"
          >
            View Room
          </Link>
        </div>
        {sourcePage === 'my-rooms' && (
          <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0 self-end">
            <span
              onClick={() => removeRoom(room._id)}
              className="bg-red-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-red-700"
            >
              Remove
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomCard;
