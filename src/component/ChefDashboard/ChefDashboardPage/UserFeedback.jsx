


import React, { useState, useEffect, useRef } from 'react';
import { CiFilter } from 'react-icons/ci';
import { HiDotsHorizontal, HiStar } from 'react-icons/hi';
import { useGetCategoryListQuery } from '../../../Rudux/feature/ApiSlice';


function UserFeedback() {
  const facebookUserData = [
    {
      User: 'pappu roy',
      Recipe: 'Chocolate Souffle',
      Rating: 5,
      Comment: 'Amazing recipe! I substituted dairy milk with almond milk and it still turned out perfect...',
      Date: '12/5/2023',
    },
    {
      User: 'rahul sen',
      Recipe: 'Vanilla Souffle',
      Rating: 4,
      Comment: 'Really good! I used oat milk instead of dairy, and it was delicious.',
      Date: '13/5/2023',
    },
    {
      User: 'anita das',
      Recipe: 'Lemon Cheesecake',
      Rating: 5,
      Comment: 'Perfect dessert! The crust was crispy and the filling was creamy.',
      Date: '14/5/2023',
    },
    {
      User: 'sumon khan',
      Recipe: 'Tiramisu',
      Rating: 3,
      Comment: 'It was okay, but I think I added too much coffee. Will try again!',
      Date: '15/5/2023',
    },
    {
      User: 'priya mehta',
      Recipe: 'Red Velvet Cake',
      Rating: 2,
      Comment: 'Loved it! The cream cheese frosting was the best part.',
      Date: '16/5/2023',
    },
    {
      User: 'arjun singh',
      Recipe: 'Blueberry Muffins',
      Rating: 1,
      Comment: 'Tasty and fluffy! I added extra blueberries for more flavor.',
      Date: '17/5/2023',
    },
    {
      User: 'nisha verma',
      Recipe: 'Caramel Flan',
      Rating: 5,
      Comment: 'So smooth and rich! The caramel sauce was perfect.',
      Date: '18/5/2023',
    },
  ];

  const [selectedRecipe, setSelectedRecipe] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [showRecipeDropdown, setShowRecipeDropdown] = useState(false);
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);
  
 const {data:categoryList} = useGetCategoryListQuery();
  console.log(categoryList, "sdfsfdsf")

  const recipeDropdownRef = useRef(null);
  const ratingDropdownRef = useRef(null);

  // Get unique recipes for the dropdown
  const uniqueRecipes = [...new Set(facebookUserData.map((item) => item.Recipe))];

  // Generate rating options (1 to 5)
  const ratingOptions = Array.from({ length: 5 }, (_, i) => i + 1);

  // Filter data based on selected recipe and rating
  const filteredData = facebookUserData.filter((item) => {
    const matchesRecipe = selectedRecipe ? item.Recipe === selectedRecipe : true;
    const matchesRating = selectedRating ? item.Rating === parseInt(selectedRating) : true;
    return matchesRecipe && matchesRating;
  });

  const renderStars = (rating) => {
    const totalStars = 5;
    const stars = [];

    for (let i = 0; i < rating; i++) {
      stars.push(<HiStar key={`filled-${i}`} className="text-[#FACC15] inline" />);
    }

    for (let i = rating; i < totalStars; i++) {
      stars.push(<HiStar key={`unfilled-${i}`} className="text-[#E4E4E4] inline" />);
    }

    return stars;
  };

  const handleRecipeFilter = (recipe) => {
    setSelectedRecipe(recipe);
    setShowRecipeDropdown(false);
  };

  const handleRatingFilter = (rating) => {
    setSelectedRating(rating);
    setShowRatingDropdown(false);
  };

  const clearRecipeFilter = () => {
    setSelectedRecipe('');
    setShowRecipeDropdown(false);
  };

  const clearRatingFilter = () => {
    setSelectedRating('');
    setShowRatingDropdown(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (recipeDropdownRef.current && !recipeDropdownRef.current.contains(event.target)) {
        setShowRecipeDropdown(false);
      }
      if (ratingDropdownRef.current && !ratingDropdownRef.current.contains(event.target)) {
        setShowRatingDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="py-2 px-10 lora">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[#5B21BD] text-[34px] font-semibold">User Facebook</h1>
          <p className="text-[#9E9E9E] mb-6">Manage feedback from users on your recipes</p>
        </div>
        <div className="flex gap-4">
          {/* Filter by Recipe Button */}
          <div className="relative" ref={recipeDropdownRef}>
            <button
              onClick={() => setShowRecipeDropdown(!showRecipeDropdown)}
              className="text-[#5B21BD] border border-[#5B21BD] py-2 px-6 rounded-full flex items-center gap-2 cursor-pointer"
              aria-label="Filter by recipe"
              aria-expanded={showRecipeDropdown}
            >
              <CiFilter />
              <span>Filter by Recipe</span>
            </button>
            {showRecipeDropdown && (
              <div className="absolute top-12 left-0 text-[#5B21BD] bg-white border border-[#5B21BD]  rounded-lg shadow-lg w-48 z-10">
                <button
                  onClick={clearRecipeFilter}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#5B21BD]/10 cursor-pointer"
                >
                  All
                </button>
                {uniqueRecipes.map((recipe, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecipeFilter(recipe)}
                    className="w-full text-left px-4 py-2 hover:bg-[#5B21BD]/10 cursor-pointer capitalize"
                  >
                    {recipe}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filter by Rating Button */}
          <div className="relative" ref={ratingDropdownRef}>
            <button
              onClick={() => setShowRatingDropdown(!showRatingDropdown)}
              className="text-[#5B21BD] border border-[#5B21BD] py-2 px-6 rounded-full flex items-center gap-2 cursor-pointer"
              aria-label="Filter by rating"
              aria-expanded={showRatingDropdown}
            >
              <CiFilter />
              <span>Filter by Rating</span>
            </button>
            {showRatingDropdown && (
              <div className="absolute top-12 left-0 text-[#5B21BD] bg-white border border-[#5B21BD] ounded-lg shadow-lg rounded-lg w-48 z-10">
                <button
                  onClick={clearRatingFilter}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#5B21BD]/10 cursor-pointer"
                >
                  All
                </button>
                {ratingOptions.map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRatingFilter(rating)}
                    className="w-full text-left px-4 py-2 hover:bg-[#5B21BD]/10 cursor-pointer"
                  >
                    {rating} Star{rating > 1 ? 's' : ''}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <table className="w-full bg-white border border-[#E4E4E4]">
          <thead>
            <tr className="bg-[#5B21BD]/80 text-white">
              <th className="p-2 text-left md:pl-6">User</th>
              <th className="p-2 text-left">Recipe</th>
              <th className="p-2 text-left">Rating</th>
              <th className="p-2 text-left md:pl-20">Comment</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="border-b border-b-[#E4E4E4] h-[76px]">
                <td className="p-2 text-[#939393] md:pl-6 capitalize">{item.User}</td>
                <td className="p-2 text-[#939393] capitalize">{item.Recipe}</td>
                <td className="p-2">{renderStars(item.Rating)}</td>
                <td className="p-2 text-[#939393] md:pl-20">{item.Comment}</td>
                <td className="p-2 text-[#939393]">{item.Date}</td>
                <td className="p-2 text-[#939393] cursor-pointer">
                  <HiDotsHorizontal />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserFeedback;