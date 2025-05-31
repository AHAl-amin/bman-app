



import React, { useState } from 'react';
import { BsSave, BsShare } from 'react-icons/bs';

import { IoIosHeartEmpty, IoMdAdd } from 'react-icons/io';
import { PiChefHatFill, PiDotsThreeOutlineFill } from 'react-icons/pi';
import { MdOutlineFileUpload } from "react-icons/md";
import { FaRegCommentAlt } from 'react-icons/fa';

// JSON Data (can be moved to state or fetched from an API)
const initialCommunityPosts = [
  {
    id: 1,
    role: 'Chef',
    username: 'Chef',
    timeAgo: '1 Day Ago',
    title: 'New Technique: Mirror Glaze for Bonbons',
    content:
      "I'm excited to share this new technique I've been perfecting for creating mirror-glazed bonbons. The secret is in temperature control!",
    imageUrl: 'https://i.ibb.co.com/NdC53ZPN/image-1.jpg',
    avatarUrl: 'https://i.ibb.co.com/60hvPZRS/bannerimg-01.png',
    likes: 41,
    comments: 41,
  },
  {
    id: 2,
    role: 'User',
    username: 'User',
    timeAgo: '1 Day Ago',
    title: 'New Technique: Mirror Glaze for Bonbons',
    content:
      "I'm excited to share this new technique I've been perfecting for creating mirror-glazed bonbons. The secret is in temperature control!",
    imageUrl: 'https://i.ibb.co.com/NdC53ZPN/image-1.jpg',
    avatarUrl: 'https://i.ibb.co.com/60hvPZRS/bannerimg-01.png',
    likes: 41,
    comments: 41,
  },
  {
    id: 3,
    role: 'Chef',
    username: 'Chef',
    timeAgo: '1 Day Ago',
    title: 'New Technique: Mirror Glaze for Bonbons',
    content:
      "I'm excited to share this new technique I've been perfecting for creating mirror-glazed bonbons. The secret is in temperature control!",
    imageUrl: 'https://i.ibb.co.com/NdC53ZPN/image-1.jpg',
    avatarUrl: 'https://i.ibb.co.com/60hvPZRS/bannerimg-01.png',
    likes: 41,
    comments: 41,
  },
  {
    id: 4,
    role: 'User',
    username: 'User',
    timeAgo: '1 Day Ago',
    title: 'New Technique: Mirror Glaze for Bonbons',
    content:
      "I'm excited to share this new technique I've been perfecting for creating mirror-glazed bonbons. The secret is in temperature control!",
    imageUrl: 'https://i.ibb.co.com/NdC53ZPN/image-1.jpg',
    avatarUrl: 'https://i.ibb.co.com/60hvPZRS/bannerimg-01.png',
    likes: 41,
    comments: 41,
  },
];

const Community = () => {
  // State for modal, image, form data, and posts
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [communityPosts, setCommunityPosts] = useState(initialCommunityPosts);

  // Toggle modal visibility
  const toggleAddChefModal = () => {
    setIsModalOpen(!isModalOpen);
    // Reset form when closing modal
    if (isModalOpen) {
      setImage(null);
      setTitle('');
      setDescription('');
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !image) {
      alert('Please fill in all fields and upload an image.');
      return;
    }

    // Create new post (simulating a new post addition)
    const newPost = {
      id: communityPosts.length + 1,
      role: 'User', // Adjust based on user role logic
      username: 'CurrentUser', // Replace with actual username
      timeAgo: 'Just Now',
      title,
      content: description,
      imageUrl: image, // In a real app, this would be uploaded to a server
      avatarUrl: 'https://i.ibb.co.com/60hvPZRS/bannerimg-01.png', // Replace with user avatar
      likes: 0,
      comments: 0,
    };

    // Update posts
    setCommunityPosts([newPost, ...communityPosts]);

    // Close modal and reset form
    toggleAddChefModal();
  };

  return (
    <div className="px-10 py-4 lora">
      <div className='flex items-center justify-between'>
        <div>
          <h1 className="text-[#5B21BD] text-4xl md:text-[45px] font-semibold">Community</h1>
          <p className="text-[#A2A2A2] text-lg md:text-xl mt-2">
            Connect with other culinary enthusiasts, share your creations, and get inspired.
          </p>
        </div>
        <button
          onClick={toggleAddChefModal}
          className="flex items-center gap-2 px-4 py-2 text-white bg-[#5B21BD] rounded-[10px] cursor-pointer"
        >
          <span className="font-medium">Share Creation</span>
          <IoMdAdd />
        </button>
      </div>

      <div className="space-y-8 mt-4">
        {communityPosts.map((post) => (
          <div
            key={post.id}
            className="border border-white bg-white shadow-md rounded-lg p-4"
          >
            {/* Header Section */}
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={post.avatarUrl}
                  alt="Avatar"
                  className="w-10 h-10 bg-gray-300 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold text-[#5B21BD] capitalize">{post.username}</p>
                  <p className="text-sm text-gray-500">{post.timeAgo}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                {post.role === 'Chef' && (
                  <span className="flex items-center gap-2 bg-[#EFE9F8] px-2 py-1 rounded text-[#5B21BD]">
                    Chef <PiChefHatFill />
                  </span>
                )}
                <PiDotsThreeOutlineFill className="text-[#A2A2A2] cursor-pointer" />
              </div>
            </div>

            {/* Post Content */}
            <div className="mt-3">
              <p className="text-[#5B21BD] font-semibold capitalize">{post.title}</p>
              <p className="text-[#A2A2A2] text-sm mt-1">{post.content}</p>
            </div>

            {/* Image Section */}
            <div className="mt-3">
              <img
                src={post.imageUrl}
                alt="Post"
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </div>

            {/* Interaction Buttons */}
            <div className="flex justify-center items-center mt-3 text-[#5B21BD] py-6">
              <div className="flex text-3xl space-x-10">
                <button className="flex items-center space-x-1">
                  <IoIosHeartEmpty />
                  <span className="ml-2 text-base">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1">
                  <FaRegCommentAlt />
                  <span className="ml-2 text-base">{post.comments}</span>
                </button>
                <button className="flex items-center gap-2">
                  <BsSave />
                  <span className="text-base">save</span>
                </button>
                <button className="flex items-center gap-2">
                  <BsShare />
                  <span className="text-base">share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#5B21BDCC] bg-opacity-50 flex items-center justify-center z-100">
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your creation's title"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B21BD]"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Share details about your creation, modifications you made, or tips for others"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B21BD]"
                  rows="4"
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2 text-xl font-medium">Photo</label>
                <div
                  className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  {image ? (
                    <img
                      src={image}
                      alt="Uploaded preview"
                      className="max-w-full max-h-48 object-contain mb-2"
                    />
                  ) : (
                    <>
                      <MdOutlineFileUpload className="text-[25px] text-gray-500" />
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

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={toggleAddChefModal}
                  className="px-4 py-2 border border-[#B0BFB6] rounded-[10px] text-[#5B21BD] hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5B21BD] text-white rounded-[10px] cursor-pointer"
                >
                  Share Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;