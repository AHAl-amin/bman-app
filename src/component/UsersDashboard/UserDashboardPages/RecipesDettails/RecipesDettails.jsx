import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetRecipeDettailsQuery, useRecipeCommentCreateMutation, useGetRecipeCommentListQuery } from '../../../../Rudux/feature/ApiSlice';
import toast, { Toaster } from 'react-hot-toast';


function RecipesDettails() {
  const { id } = useParams(); // Get the recipe ID from URL
  const { data: getRecipeDettails, isLoading, isError } = useGetRecipeDettailsQuery(id); // Fetch recipe data
  const { data: getRecipeCommentList, isLoading: isCommentsLoading, isError: isCommentsError } = useGetRecipeCommentListQuery(id); 

  const [recipeCommentCreate, { isLoading: isCommentLoading, error: commentError }] = useRecipeCommentCreateMutation();
  

  const commentDataInfo = getRecipeCommentList?.data || [];
  console.log(commentDataInfo, "Comment Data Info");	
  console.log("Recipe ID from useParams:", id);
  console.log("Comments from API:", getRecipeCommentList);


  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    if (rating === 0 || comment.trim() === '') {
      toast.error('Please provide a rating and a comment.');
      return;
    }

    // Ensure id is a number and not undefined
    const recipeId = id ? Number(id) : null;
    if (!recipeId) {
      toast.error('Recipe ID is missing. Please check the URL or routing.');
      console.error('Recipe ID is undefined or invalid:', id);
      return;
    }

    // Prepare the payload for the API
    const commentData = {
      user: 8, // Ideally, get this from auth context
      content: comment, // Comment text from state
      rating: rating, // Rating from state
     
    };

    try {
      // Send the comment to the API with id and commentData
      const response = await recipeCommentCreate({ id: recipeId, commentData }).unwrap();
      console.log('API Response:', response);
      // const newReview = {
      //   name: 'Current User', // Replace with real user name from auth context
      //   avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      //   time: 'Just now',
      //   comment: response.data.content,
      //   rating: response.data.rating,
      // };
      setComment('');
      setRating(0);
      setHover(0);
      toast.success(response.message); // Show success message from API
    } catch (error) {
      console.error('Error posting comment:', error);
      toast.error('Failed to post comment. Please try again.');
    }
  };

  const [activeTab, setActiveTab] = useState('Ingredients');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    if (!getRecipeDettails?.data) return null;

    switch (activeTab) {
      case 'Ingredients':
        return (
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-[#5B21BD] mb-4">Recipe Ingredients</h2>
            <div className="space-y-6">
              {getRecipeDettails.data.ingredients.map((ingredient, index) => (
                <div key={index} className="flex text-[#CCBAEB] gap-6">
                  <p className="w-4/10 border border-[#CCBAEB] rounded-[10px] py-3 px-3">
                    {ingredient.name}
                  </p>
                  <p className="w-2/10 border border-[#CCBAEB] rounded-[10px] text-center py-3 px-3">
                    {ingredient.quantity}
                  </p>
                  <p className="w-4/10 border border-[#CCBAEB] rounded-[10px] py-3 px-3">
                    {ingredient.unit || 'N/A'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Instructions':
        return (
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-[#5B21BD] mb-4">Recipe Instructions</h2>
            <div className="space-y-6 text-[#CCBAEB]">
              {getRecipeDettails.data.instructions.map((instruction, index) => (
                <p
                  key={index}
                  className="w-full border border-[#CCBAEB] rounded-[10px] py-3 px-3"
                >
                  {`${index + 1}. ${instruction.text}`}
                </p>
              ))}
            </div>
          </div>
        );
      case "Chef's Notes":
        return (
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-[#5B21BD] mb-4">Chef's Notes</h2>
            <div className="space-y-6 text-[#CCBAEB]">
              {getRecipeDettails.data.chef_notes.map((note, index) => (
                <p
                  key={index}
                  className="w-full border border-[#CCBAEB] rounded-[10px] py-3 px-3"
                >
                  {`${index + 1}. ${note.text}`}
                </p>
              ))}
            </div>
          </div>
        );
      case 'Comments':
        return (
          <div className="p-6 rounded-[10px]">
            <h2 className="text-xl font-semibold mb-4">Comments & Rating</h2>
            <div className="space-y-4 lora">
              {isCommentsLoading && <p className="text-[#5B21BD]">Loading comments...</p>}
              {isCommentsError && <p className="text-red-500">Error loading comments.</p>}
             {commentDataInfo && commentDataInfo?.length > 0 ? (
  commentDataInfo?.map((comment, index) => (
    <div
      key={comment.id} // Use comment.id for unique key
      className="flex items-start space-x-4 p-4 border border-[#D9E0DC] rounded-[10px]"
    >
      <img
        src="https://randomuser.me/api/portraits/men/5.jpg" // Replace with comment.user.avatar if available
        alt={`User ${comment.user}`}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex justify-between">
          <div className="flex items-center gap-6">
            <h3 className="text-[24px] font-medium text-[#5B21BD]">
              {`User ${comment.user}`} {/* Fallback to user ID */}
            </h3>
           <span className="text-sm text-gray-500">
              {new Date(comment.created_at).toLocaleString('en-US', {
                weekday: 'long', // e.g., "Tuesday"
                year: 'numeric', // e.g., "2025"
                month: 'numeric', // e.g., "6"
                day: 'numeric', // e.g., "3"
                hour: 'numeric', // e.g., "7"
                minute: '2-digit', // e.g., "19"
                hour12: true // Use 12-hour format with AM/PM
              })}
            </span>
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${i < comment.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <p className="text-gray-600 mt-1">{comment.content}</p>
      </div>
    </div>
  ))
) : null}
            </div>
            <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex gap-4 mb-4">
                <h3 className="text-lg font-medium text-[#555050]">Your Rating:</h3>
                <div className="flex items-center 4">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                      <label key={index}>
                        <input
                          type="radio"
                          name="rating"
                          value={ratingValue}
                          onClick={() => setRating(ratingValue)}
                          className="hidden"
                        />
                        <svg
                          className={`w-6 h-6 cursor-pointer ${
                            ratingValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(0)}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </label>
                    );
                  })}
                </div>
              </div>
              <textarea
                className="w-full p-2 border rounded-[10px] border-[#D9E0DC]"
                rows="3"
                placeholder="Share your experience..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <button
                className="mt-3 px-4 py-2 bg-[#5B21BD] cursor-pointer text-white rounded-lg"
                onClick={handleSubmit}
                disabled={isCommentLoading}
              >
                {isCommentLoading ? 'Posting...' : 'Post Comment'}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Handle loading, error, and not found states
  if (isLoading) {
    return (
      <div className="py-6 px-10">
        <p className="text-[#5B21BD] text-xl">Loading recipe...</p>
      </div>
    );
  }

  if (isError || !getRecipeDettails?.data) {
    return (
      <div className="py-6 px-10">
        <p className="text-[#5B21BD] text-xl">Recipe not found or an error occurred.</p>
      </div>
    );
  }

  const recipe = getRecipeDettails.data; // Use API data

  return (
    <div className="py-6 px-10">
      <div className="rounded-lg overflow-hidden py-3 px-3">
        {/* Header Section */}
        <div
          className="relative h-[600px] flex items-center justify-center bg-cover bg-center rounded-xl"
          style={{ backgroundImage: `url(http://192.168.10.124:3000/${recipe.image})` }} // Dynamic background image from API
        >
          <div className="absolute inset-0 bg-[#5B21BD78] bg-opacity-50 rounded-xl"></div>
          <h1 className="relative text-5xl font-bold text-white z-10 capitalize">{recipe.title}</h1> {/* Dynamic title */}
        </div>

        {/* Metadata Section */}
        <div className="flex justify-between items-center px-2 mt-2 py-4">
          <div>
            <span className="bg-[#CCBAEB] rounded-[29px] px-3 py-1 mr-5 text-[#5B21BD] capitalize">
              {recipe.category_name} {/* Dynamic category from API */}
            </span>
            <span>Updated: {recipe.updated_at.split('T')[0]}</span> {/* Dynamic updated date, formatted */}
          </div>
          <div className="flex gap-6">
            <button className="flex items-center text-[#5B21BD] border border-[#5B21BD] rounded p-1 cursor-pointer px-2">
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
              Save
            </button>
            <button className="flex items-center text-[#5B21BD] border border-[#5B21BD] rounded p-1 cursor-pointer px-2">
              Chat
              <svg
                className="w-5 h-5 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
            </button>
            <button className="flex items-center text-[#5B21BD] border border-[#5B21BD] rounded p-1 cursor-pointer px-2">
              Share
              <svg
                className="w-5 h-5 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="px-6 py-4 text-[#696969] text-[16px]">
          {recipe.description} {/* Dynamic description from API */}
        </p>

        {/* Tabs */}
        <div className="flex bg-[#EFE9F8] py-2 justify-around text-[20px] rounded-[10px]">
          <button
            className={`px-20 py-2 rounded-[10px] ${
              activeTab === 'Ingredients' ? 'bg-[#5B21BD] text-white' : 'text-gray-600'
            }`}
            onClick={() => handleTabClick('Ingredients')}
          >
            Ingredients
          </button>
          <button
            className={`px-20 py-2 rounded-[10px] ${
              activeTab === 'Instructions' ? 'bg-[#5B21BD] text-white' : 'text-gray-600'
            }`}
            onClick={() => handleTabClick('Instructions')}
          >
            Instructions
          </button>
          <button
            className={`px-20 py-2 rounded-[10px] ${
              activeTab === "Chef's Notes" ? 'bg-[#5B21BD] text-white' : 'text-gray-600'
            }`}
            onClick={() => handleTabClick("Chef's Notes")}
          >
            Chef's Notes
          </button>
          <button
            className={`px-20 py-2 rounded-[10px] ${
              activeTab === 'Comments' ? 'bg-[#5B21BD] text-white' : 'text-gray-600'
            }`}
            onClick={() => handleTabClick('Comments')}
          >
            Comments
          </button>
        </div>

        {/* Tab Content */}
        {renderContent()}
      </div>
      <Toaster position='top-right'/>
    </div>
  );
}

export default RecipesDettails;









// import  { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useGetRecipeDettailsQuery, useRecipeCommentCreateMutation } from '../../../../Rudux/feature/ApiSlice';


// function RecipesDettails() {
//   const { id } = useParams(); // Get the recipe ID from URL
//   const { data: getRecipeDettails, isLoading, isError } = useGetRecipeDettailsQuery(id); // Fetch recipe data
// const {recipeCommentCreate} = useRecipeCommentCreateMutation();
// console.log("recipeCommentCreate:", recipeCommentCreate);

//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);
//   const [comment, setComment] = useState('');
//   const [reviews, setReviews] = useState([
//     {
//       name: 'Pappu Roy',
//       avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
//       time: '1 day ago',
//       comment: 'I tried this recipe last weekend and it turned out amazing! The ganache was perfectly smooth and the shells had a great snap. Will definitely make again.',
//       rating: 5,
//     },
   
//   ]);

//   const handleSubmit = () => {
//     if (rating === 0 || comment.trim() === '') {
//       alert('Please provide a rating and a comment.');
//       return;
//     }

//     const newReview = {
//       name: 'Current User',
//       avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
//       time: 'Just now',
//       comment: comment,
//       rating: rating,
//     };

//     setReviews([newReview, ...reviews]);
//     setComment('');
//     setRating(0);
//     setHover(0);
//   };

//   const [activeTab, setActiveTab] = useState('Ingredients');

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   const renderContent = () => {
//     if (!getRecipeDettails?.data) return null;

//     switch (activeTab) {
//       case 'Ingredients':
//         return (
//           <div className="px-6 py-4">
//             <h2 className="text-xl font-semibold text-[#5B21BD] mb-4">Recipe Ingredients</h2>
//             <div className="space-y-6">
//               {getRecipeDettails.data.ingredients.map((ingredient, index) => (
//                 <div key={index} className="flex text-[#CCBAEB] gap-6">
//                   <p className="w-4/10 border border-[#CCBAEB] rounded-[10px] py-3 px-3">
//                     {ingredient.name}
//                   </p>
//                   <p className="w-2/10 border border-[#CCBAEB] rounded-[10px] text-center py-3 px-3">
//                     {ingredient.quantity}
//                   </p>
//                   <p className="w-4/10 border border-[#CCBAEB] rounded-[10px] py-3 px-3">
//                     {ingredient.unit || 'N/A'}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );
//       case 'Instructions':
//         return (
//           <div className="px-6 py-4">
//             <h2 className="text-xl font-semibold text-[#5B21BD] mb-4">Recipe Instructions</h2>
//             <div className="space-y-6 text-[#CCBAEB]">
//               {getRecipeDettails.data.instructions.map((instruction, index) => (
//                 <p
//                   key={index}
//                   className="w-full border border-[#CCBAEB] rounded-[10px] py-3 px-3"
//                 >
//                   {`${index + 1}. ${instruction.text}`}
//                 </p>
//               ))}
//             </div>
//           </div>
//         );
//       case "Chef's Notes":
//         return (
//           <div className="px-6 py-4">
//             <h2 className="text-xl font-semibold text-[#5B21BD] mb-4">Chef's Notes</h2>
//             <div className="space-y-6 text-[#CCBAEB]">
//               {getRecipeDettails.data.chef_notes.map((note, index) => (
//                 <p
//                   key={index}
//                   className="w-full border border-[#CCBAEB] rounded-[10px] py-3 px-3"
//                 >
//                   {`${index + 1}. ${note.text}`}
//                 </p>
//               ))}
//             </div>
//           </div>
//         );
//       case 'Comments':
//         return (
//           <div className="p-6 rounded-[10px]">
//             <h2 className="text-xl font-semibold mb-4">Comments & Rating</h2>
//             <div className="space-y-4 lora">
//               {reviews.map((review, index) => (
//                 <div
//                   key={index}
//                   className="flex items-start space-x-4 p-4 border border-[#D9E0DC] rounded-[10px]"
//                 >
//                   <img
//                     src={review.avatar}
//                     alt={review.name}
//                     className="w-12 h-12 rounded-full object-cover"
//                   />
//                   <div className="flex-1">
//                     <div className="flex justify-between">
//                       <div className="flex items-center gap-6">
//                         <h3 className="text-[24px] font-medium text-[#5B21BD]">{review.name}</h3>
//                         <span className="text-sm text-gray-500">{review.time}</span>
//                       </div>
//                       <div className="flex items-center">
//                         {[...Array(5)].map((_, i) => (
//                           <svg
//                             key={i}
//                             className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                         ))}
//                       </div>
//                     </div>
//                     <p className="text-gray-600 mt-1">{review.comment}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
//               <div className="flex gap-4 mb-4">
//                 <h3 className="text-lg font-medium text-[#555050]">Your Rating:</h3>
//                 <div className="flex items-center 4">
//                   {[...Array(5)].map((_, index) => {
//                     const ratingValue = index + 1;
//                     return (
//                       <label key={index}>
//                         <input
//                           type="radio"
//                           name="rating"
//                           value={ratingValue}
//                           onClick={() => setRating(ratingValue)}
//                           className="hidden"
//                         />
//                         <svg
//                           className={`w-6 h-6 cursor-pointer ${
//                             ratingValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
//                           }`}
//                           onMouseEnter={() => setHover(ratingValue)}
//                           onMouseLeave={() => setHover(0)}
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       </label>
//                     );
//                   })}
//                 </div>
//               </div>
//               <textarea
//                 className="w-full p-2 border rounded-[10px] border-[#D9E0DC]"
//                 rows="3"
//                 placeholder="Share your experience..."
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//               ></textarea>
//               <button
//                 className="mt-3 px-4 py-2 bg-[#5B21BD] cursor-pointer text-white rounded-lg"
//                 onClick={handleSubmit}
//               >
//                 Post Comment
//               </button>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   // Handle loading, error, and not found states
//   if (isLoading) {
//     return (
//       <div className="py-6 px-10">
//         <p className="text-[#5B21BD] text-xl">Loading recipe...</p>
//       </div>
//     );
//   }

//   if (isError || !getRecipeDettails?.data) {
//     return (
//       <div className="py-6 px-10">
//         <p className="text-[#5B21BD] text-xl">Recipe not found or an error occurred.</p>
//       </div>
//     );
//   }

//   const recipe = getRecipeDettails.data; // Use API data

//   return (
//     <div className="py-6 px-10">
//       <div className="rounded-lg overflow-hidden py-3 px-3">
//         {/* Header Section */}
//         <div
//           className="relative h-[600px] flex items-center justify-center bg-cover bg-center rounded-xl"
//           style={{ backgroundImage: `url(http://192.168.10.124:3000/${recipe.image})` }} // Dynamic background image from API
//         >
        
//           <div className="absolute inset-0 bg-[#5B21BD78] bg-opacity-50 rounded-xl"></div>
//           <h1 className="relative text-5xl font-bold text-white z-10 capitalize">{recipe.title}</h1> {/* Dynamic title */}
//         </div>

//         {/* Metadata Section */}
//         <div className="flex justify-between items-center px-2 mt-2 py-4">
//           <div>
//             <span className="bg-[#CCBAEB] rounded-[29px] px-3 py-1 mr-5 text-[#5B21BD] capitalize">
//               {recipe.category_name} {/* Dynamic category from API */}
//             </span>
//             <span>Updated: {recipe.updated_at.split('T')[0]}</span> {/* Dynamic updated date, formatted */}
//           </div>
//           <div className="flex gap-6">
//             <button className="flex items-center text-[#5B21BD] border border-[#5B21BD] rounded p-1 cursor-pointer px-2">
//               <svg
//                 className="w-5 h-5 mr-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                 ></path>
//               </svg>
//               Save
//             </button>
//             <button className="flex items-center text-[#5B21BD] border border-[#5B21BD] rounded p-1 cursor-pointer px-2">
//               Chat
//               <svg
//                 className="w-5 h-5 ml-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                 ></path>
//               </svg>
//             </button>
//             <button className="flex items-center text-[#5B21BD] border border-[#5B21BD] rounded p-1 cursor-pointer px-2">
//               Share
//               <svg
//                 className="w-5 h-5 ml-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
//                 ></path>
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Description */}
//         <p className="px-6 py-4 text-[#696969] text-[16px]">
//           {recipe.description} {/* Dynamic description from API */}
//         </p>

//         {/* Tabs */}
//         <div className="flex bg-[#EFE9F8] py-2 justify-around text-[20px] rounded-[10px]">
//           <button
//             className={`px-20 py-2 rounded-[10px] ${
//               activeTab === 'Ingredients' ? 'bg-[#5B21BD] text-white' : 'text-gray-600'
//             }`}
//             onClick={() => handleTabClick('Ingredients')}
//           >
//             Ingredients
//           </button>
//           <button
//             className={`px-20 py-2 rounded-[10px] ${
//               activeTab === 'Instructions' ? 'bg-[#5B21BD] text-white' : 'text-gray-600'
//             }`}
//             onClick={() => handleTabClick('Instructions')}
//           >
//             Instructions
//           </button>
//           <button
//             className={`px-20 py-2 rounded-[10px] ${
//               activeTab === "Chef's Notes" ? 'bg-[#5B21BD] text-white' : 'text-gray-600'
//             }`}
//             onClick={() => handleTabClick("Chef's Notes")}
//           >
//             Chef's Notes
//           </button>
//           <button
//             className={`px-20 py-2 rounded-[10px] ${
//               activeTab === 'Comments' ? 'bg-[#5B21BD] text-white' : 'text-gray-600'
//             }`}
//             onClick={() => handleTabClick('Comments')}
//           >
//             Comments
//           </button>

        
         
//         </div>

//         {/* Tab Content */}
//         {renderContent()}
//       </div>
//     </div>
//   );
// }

// export default RecipesDettails;




