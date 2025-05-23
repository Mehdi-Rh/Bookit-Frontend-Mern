import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa6';

const RoomImageUploader = ({ setImageFile }) => {
  const [imagePreview, setImagePreview] = useState(null); // For displaying the selected image

  // Function to handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Show preview of the selected image
      setImageFile(file); // Store the selected file
    }
  };

  // Function to remove the selected image
  const handleRemoveImage = () => {
    setImagePreview(null); // Clear the image preview
    setImageFile(null); // Clear the selected file
    document.querySelector('#imageInput').value = ''; // Reset the input field
  };

  return (
    <div className="mb-4">
      <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
        Image
      </label>
      <div className="flex items-center">
        <input
          className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
          type="file"
          id="imageInput"
          name="image"
          onChange={handleImageChange}
        />{' '}
        {imagePreview && (
          <button type="button" onClick={handleRemoveImage}>
            <FaTrash color="red" className="mx-4 h-16" />
          </button>
        )}
      </div>
      {imagePreview && (
        <div my-4>
          <img src={imagePreview} alt="Selected" style={{ width: '300px', height: 'auto' }} />
        </div>
      )}
    </div>
  );
};

export default RoomImageUploader;
