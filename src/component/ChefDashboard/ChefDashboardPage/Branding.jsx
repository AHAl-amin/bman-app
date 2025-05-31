import { useEffect, useRef, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { useGetChefBrandingListQuery } from '../../../Rudux/feature/ApiSlice';

const Branding = () => {
  const { data: getChefBrandingList, refetch } = useGetChefBrandingListQuery();
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    description: '',
    expertice: '',
    logo: null,
  });

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle logo file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file.', { position: 'top-right' });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB.', { position: 'top-right' });
        return;
      }
      setFormData((prev) => ({
        ...prev,
        logo: file,
      }));
    }
  };

  // Populate form data from API on mount
  useEffect(() => {
  if (getChefBrandingList?.data && getChefBrandingList.data[0]) {
    setFormData({
      name: getChefBrandingList.data[0].name || '',
      tagline: getChefBrandingList.data[0].tagline || '',
      description: getChefBrandingList.data[0].description || '',
      expertice: getChefBrandingList.data[0].expertice || '',
      logo: getChefBrandingList.data[0].logo || null,
    });
  }
}, [getChefBrandingList]);

  // Clean up logo preview URL
  useEffect(() => {
    return () => {
      if (formData.logo) {
        URL.revokeObjectURL(formData.logo);
      }
    };
  }, [formData.logo]);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      if (formData.tagline) formDataToSend.append('tagline', formData.tagline);
      if (formData.description) formDataToSend.append('description', formData.description);
      if (formData.expertice) formDataToSend.append('expertice', formData.expertice);
      if (formData.logo) formDataToSend.append('logo', formData.logo);

      const response = await fetch('http://192.168.10.124:3000/api/chef_dashboard/v1/branding/create/', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || errorData.message || 'Failed to save branding');
      }

      await response.json();
      if (fileInputRef.current) fileInputRef.current.value = '';
      toast.success('Branding saved successfully!', { position: 'top-right' });
      refetch()
      console.log(formData, 'formData after save');

      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      toast.error(`Error: ${error.message}`, { position: 'top-right' });
      if (fileInputRef.current) fileInputRef.current.value = '';
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-14 lora py-4">
      <h2 className="text-[34px] text-[#5B21BD] font-bold mb-3">Branding</h2>
      <p className="text-xl mb-3 text-[#9E9E9E]">
        Customize your brand appearance and settings
      </p>
      <div className="flex items-center justify-center">
        <div className="flex w-full gap-10">
          {/* Left Section: Form */}
          <div className="w-1/2">
            <h2 className="text-3xl text-[#5B21BD] font-semibold mb-4">Brand Settings</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-xl font-medium text-[#5B21BD] mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your brand name"
                  className="w-full p-2 border bg-white border-[#CCBAEB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#CCBAEB]"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="tagline" className="block text-xl font-medium text-[#5B21BD] mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleInputChange}
                  placeholder="Enter a catchy tagline"
                  className="w-full p-2 border rounded-md bg-white focus:outline-none focus:ring-1 border-[#CCBAEB] focus:ring-[#CCBAEB]"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-xl font-medium text-[#5B21BD] mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your brand..."
                  className="w-full p-2 border rounded-md bg-white border-[#CCBAEB] focus:outline-none focus:ring-1 focus:ring-[#CCBAEB]"
                  rows="4"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="expertice" className="block text-xl font-medium text-[#5B21BD] mb-1">
                  Expertice
                </label>
                <input
                  type="text"
                  name="expertice"
                  value={formData.expertice}
                  onChange={handleInputChange}
                  placeholder="e.g., French Pastry, Patisserie"
                  className="w-full p-2 border rounded-md bg-white border-[#CCBAEB] focus:outline-none focus:ring-1 focus:ring-[#CCBAEB]"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="logo" className="block text-xl font-medium text-[#5B21BD] mb-3">
                  Logo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-md bg-white px-4 py-10 flex flex-col text-center justify-center items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="logo-upload"
                    ref={fileInputRef}
                  />
                  <label htmlFor="logo-upload" className="cursor-pointer text-[#5B21BD]">
                    <FiUpload className="text-[25px] mx-auto" />
                    <span>Drag & Drop Files Here</span>
                  </label>
                  {formData.logo ? (
                    typeof formData.logo === 'string' ? (
                      <img
                        src={formData.logo.startsWith('http') ? formData.logo : `http://192.168.10.124:3000${formData.logo}`}
                        alt="Preview Logo"
                        className="h-[100px] rounded-[10px]"
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(formData.logo)}
                        alt="Preview Logo"
                        className="h-[100px] rounded-[10px]"
                      />
                    )
                  ) : (
                    <img
                      src="https://i.ibb.co.com/pBTdN8Bn/image-2.jpg"
                      alt="Default Logo"
                      className="h-[100px] rounded-[10px]"
                    />
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`bg-[#5B21BD] text-white w-[150px] px-4 py-2 rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  }`}
              >
                {isLoading ? 'Saving...' : 'Save Brand'}
              </button>
            </form>
          </div>

          {/* Right Section: Preview */}
          <div className="w-1/2 mt-22">
            <div className="bg-[#EFE9F8] border text-[#5B21BD] p-4 rounded-[10px] flex gap-10">
              {formData.logo ? (
                typeof formData.logo === 'string' ? (
                  <img
                    src={formData.logo.startsWith('http') ? formData.logo : `http://192.168.10.124:3000${formData.logo}`}
                    alt="Preview Logo"
                    className="h-[100px] rounded-[10px]"
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(formData.logo)}
                    alt="Preview Logo"
                    className="h-[100px] rounded-[10px]"
                  />
                )
              ) : (
                <img
                  src="https://i.ibb.co.com/pBTdN8Bn/image-2.jpg"
                  alt="Default Logo"
                  className="h-[100px] rounded-[10px]"
                />
              )}
              <div className="space-y-2">
                <h1 className="text-[36px] text-[#5B21BD] font-bold">
                  {formData.name || 'Your Brand'}
                </h1>
                <p className="text-xl font-semibold text-[#666666]">
                  {formData.tagline || 'Delicious recipes made simple'}
                </p>
                <p className="text-[#666666] text-[18px]">
                  {formData.description || 'Your brand description will appear here.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default Branding;