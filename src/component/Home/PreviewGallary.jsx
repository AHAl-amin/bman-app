


import React, { useState } from 'react'
import { IoIosHeartEmpty } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Subscribsion from './Subscribsion';

function PreviewGallary({ recipeData }) {
  console.log(recipeData, "adsfsfsdf")
  const [isModalOpen, setIsModalOpen] = useState(false);



  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="grid 2xl:grid-cols-3 py-10   lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-between gap-6">
        {recipeData.map((recipe) => (
          <div
            key={recipe.id}
            className="w-full bg-white rounded-xl flex flex-col "
          >
            {/* Image Section */}
            <div className="relative">
              <img
                className="w-full h-48 object-cover rounded-t-2xl"
                src={`http://192.168.10.124:3000${recipe.image}`}
                alt={recipe.title}
              />
            </div>

            {/* Content Section */}
            <div className="p-4 border-x-2 border-b-2 rounded-b-xl border-gray-100 space-y-2">
              {/* Title */}
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold text-[#5B21BD] lora capitalize">
                  {recipe.title}
                </h2>
                <IoIosHeartEmpty className="text-[#5B21BD] w-[16px] h-[16px]" />
              </div>

              {/* Category */}
              <p className="mt-1 text-sm text-white bg-[#5B21BD] inline-block px-4 py-1 rounded-[29px] capitalize">
                {recipe.category}
              </p>

              {/* Description */}
              <p className="mt-2 text-[#676767] text-[16px]">{recipe.description}</p>

              {/* Rating and Update Date */}
              <div className="mt-3 flex justify-between items-center">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span className="ml-1 text-gray-600">{recipe.rating}</span>
                </div>
                <p className="text-[12px] text-gray-500">
                  Updated: {new Date("May 23, 2025, 09:08 PM").toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>

              {/* Button */}

            </div>
          </div>
        ))}
      </div>

      <div className=''>
        <button
          onClick={openModal}
          className="w-full bg-[#5B21BD] border mt-2 cursor-pointer text-white font-bold py-3 px-4 rounded-[10px] transition-colors duration-200"
        >
          Select This Chef
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#5B21BDCC] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg h-[96%]  w-4/6">

            <div className="flex space-x-4 p-2">

              <button
                onClick={() => {
                  // Add your confirmation logic here
                  closeModal();
                }}
                className="px-6 py-2 bg-[#5B21BD] text-white rounded-[10px] hover:bg-[#5B21BD] transition-colors cursor-pointer duration-200"
              >
                Back
              </button>
            </div>

            <Subscribsion />
          </div>
        </div>
      )}
    </div>
  )
}

export default PreviewGallary