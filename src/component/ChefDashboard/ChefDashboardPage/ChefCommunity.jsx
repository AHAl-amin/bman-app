



import { useEffect, useRef, useState } from 'react';
import { BsSave, BsShare } from 'react-icons/bs';

import { IoIosHeartEmpty, IoMdAdd } from 'react-icons/io';
import { PiChefHatFill, PiDotsThreeOutlineFill } from 'react-icons/pi';
import { MdOutlineFileUpload } from "react-icons/md";
import { FaRegBookmark, FaRegCommentAlt } from 'react-icons/fa';
import { useChefCommentPostMutation, useChefCommunityPostCreateMutation, useDeletCommunityPostListMutation, useGetCommunityPostListQuery } from '../../../Rudux/feature/ApiSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';




const ChefCommunity = () => {
  const id = useParams();
  const [deletePost] = useDeletCommunityPostListMutation(id);

  const [chefCommunityPostCreate] = useChefCommunityPostCreateMutation();

  console.log(chefCommunityPostCreate, "firstname");
  const [chefCommentPost] = useChefCommentPostMutation();


  const { data: getCommunityPostList, refetch } = useGetCommunityPostListQuery();
  const communityPost = getCommunityPostList?.results?.data || [];
  console.log(communityPost, "communityPost");
  console.log(getCommunityPostList, "getCommunityPostList");


  // State for comment box and inputs
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [commentText, setCommentText] = useState('');

  // State for modal, image, form data, and posts
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setcontent] = useState('');

  const [activeDropdownId, setActiveDropdownId] = useState(null);
  // delete post function
  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId).unwrap();
      toast.success('Post deleted successfully!');
      setActiveDropdownId(null); // close dropdown
    } catch (error) {
      toast.error('Failed to delete the post.');
      console.error(error);
    }
  };
  const toggleDropdown = (postId) => {
    setActiveDropdownId((prev) => (prev === postId ? null : postId));
  };

  // Toggle modal visibility
  const toggleAddChefModal = () => {
    setIsModalOpen(!isModalOpen);
    // Reset form when closing modal
    if (isModalOpen) {
      setImage(null);
      setTitle('');
      setcontent('');
    }
  };










  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage({ file, preview: URL.createObjectURL(file) });
    }
  };

  // Handle form submission


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !image?.file) {
      toast.error('Please fill in all fields and upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image.file);

    try {
      const token = localStorage.getItem('access_token');

      const response = await fetch('http://192.168.10.124:3000/api/community/v1/post/create/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to share your creation. Please try again.');
      }



      toggleAddChefModal();
      toast.success('Your post was shared successfully!');
      refetch()
    } catch (err) {
      console.error('Error posting to community:', err);
      toast.error(err.message || 'Failed to share your creation. Please try again.');
    }
  };


  return (
    <div className="px-10 md:w-4/5  w-full py-4 lora mx-auto">
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

      <div className="space-y-8 mt-4 ">
        {communityPost.map((post) => (
          <div
            key={post.id}
            className="border border-white bg-white shadow-md rounded-lg p-4 "
          >
            {/* Header Section */}
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={post.avatarUrl}
                  alt="user/chef"
                  className="w-10 h-10 bg-gray-300 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold text-[#5B21BD] capitalize">{post.username}</p>
                  <p className="text-sm text-gray-500">{post.timeAgo}</p>
                </div>
              </div>


              <div className="relative flex items-center gap-6">
                {post.role === 'Chef' && (
                  <span className="flex items-center gap-2 bg-[#EFE9F8] px-2 py-1 rounded text-[#5B21BD]">
                    Chef <PiChefHatFill />
                  </span>
                )}
                <PiDotsThreeOutlineFill
                  className="text-[#A2A2A2] cursor-pointer"
                  onClick={() => { toggleDropdown(post.id) }}

                />


                {activeDropdownId === post.id && (
                  <div className="absolute right-0 top-8 bg-white border shadow-md rounded-lg z-50 w-32 ">
                    <button
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-sm text-gray-700 cursor-pointer"
                      onClick={() => {

                        console.log("Edit clicked for post:", post.id);
                        setActiveDropdownId(null); // close dropdown
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-sm text-red-600 cursor-pointer"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      Delete
                    </button>

                  </div>
                )}
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

                src={`http://192.168.10.124:3000/${post.image}`}
                alt="Post"
                className=" object-cover rounded-lg  w-full max-h-[500px] "
              />
            </div>

            {/* Interaction Buttons */}
            <div className="flex justify-center items-center mt-3 text-[#5B21BD] py-6">
              <div className="flex text-3xl space-x-10">
                <button className="flex items-center space-x-1 cursor-pointer">
                  <IoIosHeartEmpty />
                  <span className="ml-2 text-base">{post.likes}</span>
                </button>
                <button
                  className="flex items-center space-x-1 cursor-pointer"
                  onClick={() => {
                    setSelectedPostId(post.id);
                    setIsCommentModalOpen(true);
                  }}
                >

                  <FaRegCommentAlt />
                  <span className="ml-2 text-base">{Array.isArray(post.comments) ? post.comments.length : 0}</span>
                  {Array.isArray(post.comments) && post.comments.map((comment) => (
                    <div key={comment.id} className="text-sm text-gray-700">
                      {comment.content}
                    </div>
                  ))}
                </button>
                {isCommentModalOpen && (
                  <div className="fixed inset-0  z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow w-full max-w-md p-6 relative">
                      <button
                        onClick={() => setIsCommentModalOpen(false)}
                        className="absolute top-2 right-3 text-gray-600 text-xl cursor-pointer"
                      >
                        ×
                      </button>
                      <h2 className="text-xl font-bold  text-[#5B21BD] mb-4"> Comment</h2>

                      <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        rows="4"
                        placeholder="Write your comment "
                        className="w-full p-3 border text-gray-400 text-xl border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B21BD]"
                      ></textarea>

                      <div className="mt-4 flex justify-end space-x-2">

                        <button
                          onClick={async () => {
                            if (!commentText.trim()) {
                              toast.error('Comment cannot be empty');
                              return;
                            }

                            try {
                              await chefCommentPost({
                                id: selectedPostId,
                                formData: {
                                  content: commentText,
                                },
                              }).unwrap();


                              toast.success('Comment posted!');
                              setCommentText('');
                              setIsCommentModalOpen(false);
                              refetch(); // reload posts/comments
                            } catch (err) {
                              console.error(err);
                              toast.error('Failed to post comment.');
                            }
                          }}
                          className="px-2 py-1 bg-[#5B21BD] cursor-pointer text-white rounded-lg"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                )}


                <button className="flex items-center gap-2 cursor-pointer">
                  <FaRegBookmark />
                  <span className="text-base">save</span>
                </button>
                <button className="flex items-center gap-2 cursor-pointer">
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
                <label className="block text-gray-700 mb-2">content</label>
                <textarea
                  value={content}
                  onChange={(e) => setcontent(e.target.value)}
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


                  {image?.preview ? (
                    <img
                      src={image.preview}
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
      <Toaster position='top-right' />
    </div>
  );
};

export default ChefCommunity;