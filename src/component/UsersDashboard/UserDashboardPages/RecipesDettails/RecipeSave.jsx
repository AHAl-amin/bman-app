import React from 'react';
import { useRecipeSaveMutation } from '../../../../Rudux/feature/ApiSlice';
import { IoIosHeartEmpty } from 'react-icons/io';
import toast from 'react-hot-toast';

const RecipeSave = ({ recipeId }) => {
  const [recipeSave, { isLoading }] = useRecipeSaveMutation();

  const handleSave = async () => {
    try {
      const response = await recipeSave({ id: recipeId }).unwrap();
      toast.success(response?.message || 'Recipe saved successfully!');
    } catch (error) {
      console.error('Error saving recipe:', error);
      toast.error('Failed to save recipe.');
    }
  };

  return (
    <button
      onClick={handleSave}
      className="flex items-center text-[#5B21BD] border border-[#5B21BD] rounded p-1 cursor-pointer px-2"
      disabled={isLoading}
    >
      <span className="mr-2">{isLoading ? 'Saving...' : 'Save'}</span>
      <IoIosHeartEmpty />
    </button>
  );
};

export default RecipeSave;
