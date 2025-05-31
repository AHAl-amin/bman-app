import { useState, useEffect } from 'react';
import { LuUpload } from 'react-icons/lu';
import { useParams } from 'react-router-dom';
import { useRecipeUpdateMutation, useGetRecipeDettailsQuery } from '../../../Rudux/feature/ApiSlice';
import toast, { Toaster } from 'react-hot-toast';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import ChefNote from './ChefNote';

function ChefRecipesEditPage() {

  const { id } = useParams();

  const { data: getRecipeDettails, isLoading: isFetching, isError, error } = useGetRecipeDettailsQuery(id);
  const [recipeUpdate, { isLoading: isSubmitting }] = useRecipeUpdateMutation();
  console.log('recipeUpdate', recipeUpdate);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    image: '',
    imagePreview: '',
  });
  console.log('formData', formData);

  const [isBasicInfoEditable, setIsBasicInfoEditable] = useState(false);

  // Log getRecipeDettails to debug its structure
  useEffect(() => {
    console.log('getRecipeDettails:', getRecipeDettails);
  }, [getRecipeDettails]);

  // Populate formData when getRecipeDettails is available
  useEffect(() => {
    if (getRecipeDettails) {
      // Adjust these fields based on the actual structure of getRecipeDettails
      setFormData({
        title: getRecipeDettails.title || getRecipeDettails.data?.title || '',
        category: getRecipeDettails.category || getRecipeDettails.data?.category_name || getRecipeDettails.data?.category || '',
        description: getRecipeDettails.description || getRecipeDettails.data?.description || '',
        image: getRecipeDettails.image || getRecipeDettails.data?.image || '',
        imagePreview: getRecipeDettails.image || getRecipeDettails.data?.image
          ? `http://192.168.10.124:3000/${getRecipeDettails.image || getRecipeDettails.data?.image}`
          : '',
      });
    }
  }, [getRecipeDettails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
   
  };



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: imageUrl,
      }));
    }
  };

  const handleBasicInfoSave = async () => {
    try {
      const form = new FormData();
      console.log('formData before submission:', formData); // Debug formData
      form.append('title', JSON.stringify(formData.title));
      form.append('category', JSON.stringify(formData.category));
      form.append('description', JSON.stringify(formData.description));
      if (formData.image instanceof File) {
        form.append('image', formData.image);

      }
     

      const res = await recipeUpdate({ id, form:form }).unwrap();
      console.log('Update response:', res);

      toast.success('Recipe updated successfully!');
      setIsBasicInfoEditable(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update recipe.');
    }
  };

  if (isFetching) {
    return <div className="text-center py-10">Loading recipe...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Error fetching recipe: {error?.message || 'Something went wrong'}
      </div>
    );
  }

  return (
    <div>
      <div className="px-12 lora">
        <h1 className="text-[34px] font-semibold text-[#5B21BD] my-2">Recipes Details View</h1>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 p-4 rounded-2xl">
            <div>
              <label className="block text-xl font-medium text-[#5B21BD] mb-2">Recipe Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Classic Chocolate Soufflé"
                className={`w-full p-2 border bg-[#FFFFFF] border-[#CCBAEB] rounded-md focus:outline-none ${
                  !isBasicInfoEditable ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!isBasicInfoEditable}
              />
            </div>

            <div>
              <label className="block text-xl font-medium text-[#5B21BD] mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="Type here category"
                className={`w-full p-2 border bg-[#FFFFFF] border-[#CCBAEB] rounded-md focus:outline-none ${
                  !isBasicInfoEditable ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!isBasicInfoEditable}
              />
            </div>

            <div>
              <label className="block text-xl font-medium text-[#5B21BD] mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="A light and airy dessert with a molten center"
                className={`w-full p-2 border bg-[#FFFFFF] border-[#CCBAEB] rounded-md focus:outline-none h-24 resize-none ${
                  !isBasicInfoEditable ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!isBasicInfoEditable}
              />
            </div>

            <div>
              <label className="block text-xl font-medium text-[#5B21BD] mb-2">Upload Image</label>
              <div className="w-full h-24 border bg-[#FFFFFF] border-[#CCBAEB] rounded-md flex items-center justify-center">
                {formData.imagePreview ? (
                  <img
                    src={formData.imagePreview}
                    className="max-h-full p-1 max-w-full object-contain"
                    alt="Recipe Preview"
                  />
                ) : (
                  <label
                    className={`cursor-pointer relative ${
                      !isBasicInfoEditable ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <LuUpload className="text-[20px] text-[#5B21BD] absolute bottom-5 left-11" />
                    <span className="text-[#5B21BD]">Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={!isBasicInfoEditable}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="col-span-2 flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={() => setIsBasicInfoEditable(true)}
                className="text-xl text-white bg-[#5B21BD] py-2 px-6 rounded-[10px] cursor-pointer"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={handleBasicInfoSave}
                disabled={isSubmitting}
                className={`text-xl text-white bg-[#5B21BD] py-2 px-6 rounded-[10px] cursor-pointer ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
          <Ingredients/>
          <Instructions/>
          <ChefNote/>
        </form>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default ChefRecipesEditPage;





