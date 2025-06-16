



import { useState, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { PiChefHatFill, PiDotsThreeOutlineFill } from 'react-icons/pi';
import { MdOutlineFileUpload } from 'react-icons/md';
import { FaRegCommentAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import {
  useChefCommentPostMutation,

  useDeletCommunityPostListMutation,
  useGetCommunityPostListQuery,
} from '../../../Rudux/feature/ApiSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import ChefLikeUnlike from '../../ChefDashboard/ChefDashboardPage/ChefLikeUnlike';
import ChefBookmark from '../../ChefDashboard/ChefDashboardPage/chefBookmark.jsx';
import ChefSharePost from '../../ChefDashboard/ChefDashboardPage/ChefSharePost.jsx';

const POSTS_PER_PAGE = 10;

const Community = () => {
  const id = useParams();
  const [deletePost] = useDeletCommunityPostListMutation(id);
 
  const [chefCommentPost] = useChefCommentPostMutation();
  const [page, setPage] = useState(1);
  const { data: getCommunityPostList, refetch, isLoading,  } = useGetCommunityPostListQuery({ page });

  // Extract posts and handle pagination
  const communityPost = getCommunityPostList?.results?.data || [];

  const totalPosts = getCommunityPostList?.count || 0;
  const hasNextPage = !!getCommunityPostList?.next;
  const hasPreviousPage = page > 1; // Use page > 1 for simplicity
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  // Slice posts for the current page (align with API pagination)
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const endIndex = Math.min(startIndex + POSTS_PER_PAGE, totalPosts);
  const paginatedPosts = communityPost.slice(0, communityPost.length); // Use full array from API response

  const imageBaseUrl = 'http://192.168.10.124:3000';

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [commentText, setCommentText] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [viewCommentPostId, setViewCommentPostId] = useState(null);

  // Effect to log pagination details for debugging
  useEffect(() => {
    console.log('Page:', page, 'Community Post:', communityPost, 'Paginated Posts:', paginatedPosts, 'Total Posts:', totalPosts);
  }, [page, communityPost, paginatedPosts, totalPosts]);

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId).unwrap();
      toast.success('Post deleted successfully!');
      setActiveDropdownId(null);
      refetch();
    } catch (error) {
      toast.error('Failed to delete the post.');
    }
  };

  const toggleDropdown = (postId) => {
    setActiveDropdownId((prev) => (prev === postId ? null : postId));
  };

  const toggleAddChefModal = () => {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) {
      setImage(null);
      setTitle('');
      setContent('');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage({ file, preview: URL.createObjectURL(file) });
    }
  };




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

    if (!response.ok) throw new Error('Failed to share your creation.');

    toggleAddChefModal();
    toast.success('Your post was shared successfully!');
    // Invalidate cache and refetch
    refetch(); // Ensure refetch is called
    console.log('Refetch triggered after new post'); // Added for debugging
  } catch (err) {
    toast.error(err.message || 'Failed to share your creation.');
  }
};
  const handleNextPage = () => {
    if (hasNextPage) {
      setPage(page + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevPage = () => {
    if (hasPreviousPage) {
      setPage(page - 1);
      window.scrollTo(0, 0);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="px-10 md:w-4/5 w-full py-4 lora mx-auto">
      <div className='flex items-center justify-between'>
        <div>
          <h1 className="text-[#5B21BD] text-4xl md:text-[45px] font-semibold">Community</h1>
          <p className="text-[#A2A2A2] text-lg md:text-xl mt-2">
            Connect with other culinary enthusiasts, share your creations, and get inspired.
          </p>
        </div>
        <button
          onClick={toggleAddChefModal}
          className="flex items-center gap-2 px-4 py-2 text-white bg-[#5B21BD] rounded-[10px]"
        >
          <span className="font-medium">Share Creation</span>
          <IoMdAdd />
        </button>
      </div>

      <div className="space-y-8 mt-4">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((post) => (
            <div key={post.id} className="border border-white bg-white shadow-md rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={
                      post.image?.startsWith('http')
                        ? post.image
                        : `${imageBaseUrl}${post.image}`
                    }
                    alt="user/chef"
                    className="w-10 h-10 bg-gray-300 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold text-[#5B21BD] capitalize">{post.user}</p>
                    <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleString()}</p>
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
                    onClick={() => toggleDropdown(post.id)}
                  />
                  {activeDropdownId === post.id && (
                    <div className="absolute right-0 top-8 bg-white border shadow-md rounded-lg z-50 w-32">
                      <button
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-sm text-gray-700"
                        onClick={() => {
                          console.log("Edit clicked for post:", post.id);
                          setActiveDropdownId(null);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-sm text-red-600"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-3">
                <p className="text-[#5B21BD] font-semibold capitalize">{post.title}</p>
                <p className="text-[#A2A2A2] text-sm mt-1">{post.content}</p>
              </div>
              <div className="mt-3">
                <img
                  src={
                    post.image?.startsWith('http')
                      ? post.image
                      : `${imageBaseUrl}${post.image}`
                  }
                  alt="Post"
                  className="object-cover rounded-lg w-full max-h-[500px]"
                />
              </div>
              <div className="flex justify-center items-center mt-3 text-[#5B21BD] py-6">
                <div className="flex text-3xl space-x-6">
                  <ChefLikeUnlike post={post} />
                  <button
                    className="flex items-center space-x-1 cursor-pointer"
                    onClick={() => {
                      setSelectedPostId(post.id);
                      setIsCommentModalOpen(true);
                    }}
                  >
                    <FaRegCommentAlt />
                  </button>
                  <span
                    onClick={() => setViewCommentPostId(post.id)}
                    className="text-base font-bold cursor-pointer"
                  >
                    {Array.isArray(post.comments) && post.comments.length > 0 && (
                      <span>{post.comments.length} comment</span>
                    )}
                  </span>
                  <ChefBookmark postId={post.id} isInitiallyBookmarked={post.is_bookmarked} />
                  <ChefSharePost postId={post.id} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No posts found</p>
          </div>
        )}
      </div>

      {totalPosts > POSTS_PER_PAGE && (
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevPage}
            disabled={!hasPreviousPage}
            className={`flex items-center px-4 py-2 rounded-lg ${
              hasPreviousPage ? 'bg-[#5B21BD] text-white hover:bg-[#4a1a9a]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } transition-colors duration-200`}
          >
            <FaArrowLeft className="mr-2" />
            Previous
          </button>
          <div className="text-[#5B21BD] font-medium">
            Page {page} of {totalPages}
          </div>
          <button
            onClick={handleNextPage}
            disabled={!hasNextPage}
            className={`flex items-center px-4 py-2 rounded-lg ${
              hasNextPage ? 'bg-[#5B21BD] text-white hover:bg-[#4a1a9a]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } transition-colors duration-200`}
          >
            Next
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      )}

      {isCommentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur  bg-opacity-30">
          <div className="bg-white rounded-lg shadow w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsCommentModalOpen(false)}
              className="absolute top-2 right-3 text-gray-600 text-xl cursor-pointer"
            >
              ×
            </button>
            <h2 className="text-xl font-bold text-[#5B21BD] mb-4">Comment</h2>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows="4"
              placeholder="Write your comment"
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
                      formData: { content: commentText },
                    }).unwrap();
                    toast.success('Comment posted!');
                    setCommentText('');
                    setIsCommentModalOpen(false);
                    refetch();
                  } catch (err) {
                    toast.error('Failed to post comment.');
                  }
                }}
                className="px-4 py-2 bg-[#5B21BD] text-white rounded-lg cursor-pointer"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {viewCommentPostId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur bg-opacity-30">
          <div className="bg-white rounded-lg shadow w-full max-w-md p-6 relative">
            <button
              onClick={() => setViewCommentPostId(null)}
              className="absolute top-2 right-3 text-gray-600 text-xl cursor-pointer"
            >
              ×
            </button>
            <h2 className="text-xl font-bold text-[#5B21BD] mb-4">Comments</h2>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {communityPost
                .find(post => post.id === viewCommentPostId)
                ?.comments?.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-3">
                    <img
                      src={comment.avatarUrl || '/default-avatar.png'}
                      alt="User"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-gray-800 font-semibold">{comment.user}</p>
                      <p className="text-sm text-gray-600">{comment.content}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

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
              <div>
                <label className="block text-gray-700 mb-2 text-xl">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#5B21BD]"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-xl mb-2">Description</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#5B21BD]"
                  rows="4"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 text-xl">Photo</label>
                <div
                  className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  {image?.preview ? (
                    <img
                      src={image.preview}
                      className="max-w-full max-h-48 object-contain mb-2"
                      alt="Preview"
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
                  className="px-4 py-2 border border-[#B0BFB6] rounded-[10px] text-[#5B21BD]"
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

export default Community;