import Heading from '@/components/Heading';
import useAddRoom from '@/hooks/rooms/useAddRoom';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import RoomImageUploader from './RoomImageUploader';

const AddRoom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const { addRoom } = useAddRoom();

  const [imageURL, setImageURL] = useState(null); // For storing the uploaded image URL from Cloudinary
  const [imageFile, setImageFile] = useState(null); // To keep track of the selected file
  const [loadingImage, setLoadingImage] = useState(false);

  const handleImageUpload = async (roomData) => {
    setLoadingImage(true);
    if (!imageFile) {
      alert('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'Bookit'); // Replace with your Cloudinary upload preset
    formData.append('cloud_name', 'dtkglh0u7'); // Replace with your Cloudinary cloud name

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dtkglh0u7/image/upload`, // Replace <your_cloud_name> with your actual cloud name
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        setImageURL(data.secure_url); // Store the uploaded image URL
        const response = await addRoom({ ...roomData, image: data.secure_url });
        alert('Image uploaded successfully!');
        setLoadingImage(false);
      } else {
        alert('Failed to upload image.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('An error occurred while uploading the image.');
    }
  };

  const onSubmit = async (data) => {
    await handleImageUpload(data);
  };

  return (
    <>
      <Heading title="Add a Room" />
      <div className="bg-white shadow-lg rounded-lg p-6 w-120">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Room Name
            </label>
            <input
              type="text"
              id="name"
              className="border border-solid border-neutral-300 rounded w-full py-2 px-3"
              placeholder="Enter a name (Large Conference Room)"
              required
              {...register('name')}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              className="border border-solid border-neutral-300 rounded w-full h-24 py-2 px-3"
              placeholder="Enter a description for the room"
              required
              {...register('description')}
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="sqft" className="block text-gray-700 font-bold mb-2">
              Square Feet
            </label>
            <input
              type="number"
              id="sqft"
              className="border border-solid border-neutral-300 rounded w-full py-2 px-3"
              placeholder="Enter room size in ft"
              required
              {...register('sqft')}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="capacity" className="block text-gray-700 font-bold mb-2">
              Capacity
            </label>
            <input
              type="number"
              id="capacity"
              className="border border-solid border-neutral-300 rounded w-full py-2 px-3"
              placeholder="Number of people the room can hold"
              required
              {...register('capacity')}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price_per_hour" className="block text-gray-700 font-bold mb-2">
              Price Per Hour
            </label>
            <input
              type="number"
              id="price_per_hour"
              className="border border-solid border-neutral-300 rounded w-full py-2 px-3"
              placeholder="Enter price per hour"
              required
              {...register('price_per_hour')}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              className="border border-solid border-neutral-300 rounded w-full py-2 px-3"
              placeholder="Enter full address"
              required
              {...register('address')}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              className="border border-solid border-neutral-300 rounded w-full py-2 px-3"
              placeholder="Location (Building, Floor, Room)"
              required
              {...register('location')}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="availability" className="block text-gray-700 font-bold mb-2">
              Availability
            </label>
            <input
              type="text"
              id="availability"
              className="border border-solid border-neutral-300 rounded w-full py-2 px-3"
              placeholder="Availability (Monday - Friday, 9am - 5pm)"
              required
              {...register('availability')}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="amenities" className="block text-gray-700 font-bold mb-2">
              Amenities
            </label>
            <input
              type="text"
              id="amenities"
              className="border border-solid border-neutral-300 rounded w-full py-2 px-3"
              placeholder="Amenities CSV (projector, whiteboard, etc.)"
              required
              {...register('amenities')}
            />
          </div>

          <RoomImageUploader setImageFile={setImageFile} />

          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {loadingImage ? (
                <div role="status" style={{ display: 'flex', justifyContent: 'center' }}>
                  <svg
                    aria-hidden="true"
                    class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRoom;
