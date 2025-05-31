


import { GoBellFill } from 'react-icons/go';

import { Link, NavLink, useLocation } from 'react-router-dom';

function ChefDashboardNavber() {
  // State to manage modal visibility and image upload
 

  // Get current path
  const location = useLocation();
  const isChefCommunityPath = location.pathname === '/chef_dashboard/chef_community';

  // Toggle modal visibility
  // const toggleAddChefModal = () => {
  //   if (isChefCommunityPath) {
  //     setIsModalOpen(!isModalOpen);
  //   }
  // };

  // // Handle image upload
  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setImage(imageUrl);
  //   }
  // };

  return (
    <div className="flex items-center justify-end pt-10 lora h-16 px-6 md:max-w-[170vh] mx-auto md:ml-[260px] md:w-[calc(100%-240px)] lora">
      <div className="flex items-center space-x-8">
        {/* <button
          onClick={toggleAddChefModal}
          className="flex items-center gap-2 px-4 py-2 text-white bg-[#5B21BD] rounded-[10px] cursor-pointer"
        >

          <span className="font-medium">Share Creation</span>
          <IoMdAdd />
        </button> */}

        <NavLink to="/dashboard/user_notifications">
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-transform duration-200 cursor-pointer">
              <GoBellFill className="h-7 w-7 text-[#5B21BD]" />
            </button>
            <div className="absolute text-[10px] p-[5px] top-[6px] right-[10px] bg-gray-200 rounded-full"></div>
          </div>
        </NavLink>

        <div className="flex items-center space-x-2">
          <div className="hidden md:block">
            <img
              src="https://i.ibb.co.com/x2wkVkr/Whats-App-Image-2024-07-04-at-10-43-40-AM.jpg"
              alt="User profile"
              className="h-10 w-10 rounded-full"
            />
          </div>
          <span className="text-[17px] font-medium md:block hidden text-gray-400">Cameron</span>
        </div>
      </div>

      {/* Modal - Only show on /chef_dashboard/chef_community */}
      {/* {isModalOpen && isChefCommunityPath && (
        <div className="fixed inset-0 bg-[#5B21BDCC] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#5B21BD]">Share Your Creation</h2>
              <button
                onClick={toggleAddChefModal}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  placeholder=""
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B21BD]"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Share Details About Your Creation, Modification You Made “‘Share Details About Your Creation, Modification You Made Or Tips For Others’"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B21BD]"
                  rows="4"
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Photo</label>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 text-xl font-medium">Photo</label>
                  <div
                    className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => document.getElementById('fileInput').click()}
                  >
                    {image ? (
                      <img src={image} alt="Uploaded preview" className="max-w-full max-h-48 object-contain mb-2" />
                    ) : (
                      <>
                        <FiUpload className='text-[25px]' />
                        <span className="text-gray-500">Upload Image</span>
                      </>
                    )}
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={toggleAddChefModal}
                  className="px-4 py-2 border border-[#B0BFB6] rounded-[10px] text-[#5B21BD] hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-[#5B21BD] text-white rounded-[10px] cursor-pointer"
                >
                  Share Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}

    
    </div>
  );
}

export default ChefDashboardNavber;