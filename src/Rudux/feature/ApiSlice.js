
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://192.168.10.124:3000",

  prepareHeaders: (headers, { getState, endpoint }) => {
    const accessToken = localStorage.getItem("access_token");
    const token = getState().auth.token || accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    // Only set Content-Type to application/json for non-file uploads
    if
      (
      !["recipeCreate", "updateProfile", "aiTraining"].includes(endpoint)
    ) {
      headers.set("Content-Type", "application/json");
    }
    return headers;
  },
});




export const ApiSlice = createApi({
  reducerPath: "ApiSlice",
  baseQuery,
  tagTypes: ["Profile", "ChefDashboard", "usUserDashboard", "Project", "Employees", "updateRecipes", "ChefCommunity"], // Add 'updateRecipes' to tagTypes
  endpoints: (builder) => ({

    // Other endpoints remain unchanged
    getProfile: builder.query({
      query: () => "/api/auth/v1/profile/",
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation({
      query: (formDataToSend) => ({
        url: "/api/auth/v1/update-profile/",
        method: "PUT",
        body: formDataToSend,
      }),
      invalidatesTags: ["Profile"],
    }),
    getAllRecipes: builder.query({
      query: (arg, api) => {
        const brandId = api.getState().brand.selectedBrandId; // Use api.getState()
        return brandId
          ? `/api/main/v1/recipes/${brandId}`
          : "/api/recipe/v1/all/1";
      },
      providesTags: ["UserDashboard"],
    }),
    getAllBrands: builder.query({
      query: () => "/api/main/v1/chef/brands/",
      providesTags: ["UserDashboard"],
    }),

    // chef dashboard

    recipeCreate: builder.mutation({
      query: (formattedData) => ({
        url: "api/recipe/v1/create/",
        method: "POST",
        body: formattedData, // do not stringify!
      }),
      invalidatesTags: ["ChefDashboard"],
    }),



    getCategoryList: builder.query({
      query: () => "/api/recipe/v1/categories/",

    }),


    getCreateRecipe: builder.query({
      query: () => "/api/recipe/v1/all/",
      providesTags: ["ChefDashboard"],
    }),

    getRecipeDettails: builder.query({
      query: (id) => `/api/recipe/v1/details/${id}/`,

    }),
    deleteChefRecipe: builder.mutation({
      query: (id) => ({
        url: `/api/recipe/v1/delete/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["ChefDashboard"],
    }),



    aiTraining: builder.mutation({
      query: ({ formDataToSend, id }) => ({
        url: `/api/recipe/v1/ai-train/create/${id}/`,
        method: "POST",
        body: JSON.stringify(formDataToSend),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    // recipe update
    recipeUpdate: builder.mutation({
      query: ({ recipeId, form }) => ({
        url: `/api/recipe/v1/update/${recipeId}/`,
        method: 'PUT',
        body: JSON.stringify(form)// Use the form data directly
      }),
      invalidatesTags: ['ChefDashboard'], // Invalidate cache to refresh recipe list
    }),
    // ingradients instruction and chaf note part
    getIngradientsData: builder.query({
      query: (id) => `/api/recipe/v1/ingredient/get/${id}/`,

    }),
    getInstructionData: builder.query({
      query: (id) => `/api/recipe/v1/instruction/get/${id}/`,

    }),
    getChefNoteData: builder.query({
      query: (id) => `/api/recipe/v1/chef-note/add/get/${id}/`,

    }),

    PutIngradientsData: builder.mutation({
      query: ({ id, form }) => ({
        url: `/api/recipe/v1/ingredient/${id}/update/`,
        method: 'PUT',
        body: JSON.stringify(form)// Use the form data directly
      }),

    }),

    PutInstructionData: builder.mutation({
      query: ({ id, form }) => ({
        url: `/api/recipe/v1/instruction/${id}/update/`,
        method: 'PUT',
        body: JSON.stringify(form)// Use the form data directly
      }),

    }),

    putChefNoteData: builder.mutation({
      query: ({ id, form }) => ({
        url: `/api/recipe/v1/chef-note/${id}/update/`,
        method: 'PUT',
        body: JSON.stringify(form)// Use the form data directly
      }),

    }),
    DeletIngradientsData: builder.mutation({
      query: (id) => ({
        url: `/api/recipe/v1/ingredient/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["ChefDashboard"],
    }),
    DeletInstructionsData: builder.mutation({
      query: (id) => ({
        url: `/api/recipe/v1/instruction/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["ChefDashboard"],
    }),
    DeletChefNoteData: builder.mutation({
      query: (id) => ({
        url: `/api/recipe/v1/chef-note/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["ChefDashboard"],
    }),


    PustIngradientsData: builder.mutation({
      query: ({ formattedData, id }) => ({
        url: `/api/recipe/v1/ingredient/add/${id}/`,
        method: "POST",
        body: formattedData,
      }),
      invalidatesTags: ["ChefDashboard"],
    }),
    PustInstructionsData: builder.mutation({
      query: ({ formattedData, id }) => ({
        url: `/api/recipe/v1/instruction/add/${id}/`,
        method: "POST",
        body: formattedData,
      }),
      invalidatesTags: ["ChefDashboard"],
    }),
    PustChefNoteData: builder.mutation({
      query: ({ formattedData, id }) => ({
        url: `/api/recipe/v1/chef-note/add/${id}/`,
        method: "POST",
        body: formattedData,
      }),
      invalidatesTags: ["ChefDashboard"],
    }),

    // chef branding create	

    chefBrandingCreate: builder.mutation({
      query: (formData) => ({
        url: "/api/chef_dashboard/v1/branding/create/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["ChefDashboard"],
    }),

    getChefBrandingList: builder.query({
      query: () => "/api/chef_dashboard/v1/branding/get/",
      providesTags: ["ChefDashboard"]
    }),

    // chef subscription plan create

    chefSubscriptionPlanCreate: builder.mutation({
      query: (formData) => ({
        url: "/api/subscriptions/v1/chef-plans/create/",
        method: "POST",
        body: formData
      }),
      invalidatesTags: ["ChefDashboard"],
    }),

    getSubscriptionPlanList: builder.query({
      query: () => "/api/subscriptions/v1/chef-plans/list/admin/"
    }),

    // landing page / main page
    getManiChefBrandList: builder.query({
      query: () => "/api/main/v1/chef/brands/",
      providesTags: ["ChefDashboard"]
    }),
    getManiChefBrandListById: builder.query({
      query: (id) => `/api/main/v1/chef/brand/${id}/`,
      providesTags: ["ChefDashboard"]
    }),
    getMainSubscription: builder.query({
      query: (id) => `/api/main/v1/user/subscribe/chef/${id}/`,
      providesTags: ["ChefDashboard"]
    }),

    


    // chef community section
    chefCommunityPostCreate: builder.mutation({
      query: (formData) => ({
        url: "/api/community/v1/post/create/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["ChefDashboard"],
    }),
    getCommunityPostList: builder.query({
      query: () => "/api/community/v1/posts/",
      providesTags: ["CommunityPosts"],
    }),

    DeletCommunityPostList: builder.mutation({
      query: (id) => ({
        url: `/api/community/v1/post/delete/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["CommunityPosts"], // Use the correct tag that `useGetCommunityPostListQuery` provides
    }),
    chefCommentPost: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/community/v1/post/${id}/comment/`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["ChefDashboard"],
    }),
    PostBookmark: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/api/community/v1/post/${id}/bookmark-unbookmark/`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["ChefDashboard"],
    }),

    PostLikeUnlike: builder.mutation({
      query: ({id}) => ({
        url: `/api/community/v1/post/${id}/like-unlike/`,
        method: "POST",
       
      }),
      invalidatesTags: ["ChefDashboard"],
    }),
    ShareChefPost: builder.mutation({
      query: ({id}) => ({
        url: `/api/community/v1/post/${id}/share/`,
        method: "POST",
       
      }),
      invalidatesTags: ["ChefDashboard"],
    }),

    // chef Ai chat bot
  AiMassageCreate: builder.mutation({
      query: () => ({
        url: "/api/chatbot/v1/chat/message/",
        method: "POST",
       
      }),
      invalidatesTags: ["ChefDashboard"],
    }),


  }),
});

// Export hooks for usage in components
export const {
  useRecipeCreateMutation,

  useGetCategoryListQuery, useGetCreateRecipeQuery, useDeleteChefRecipeMutation, useAiTrainingMutation, useRecipeUpdateMutation, useGetRecipeDettailsQuery, useChefPlanCreateMutation, useGetIngradientsDataQuery, useGetInstructionDataQuery, useGetChefNoteDataQuery, usePutIngradientsDataMutation, usePutInstructionDataMutation, usePutChefNoteDataMutation, useDeletIngradientsDataMutation, useDeletInstructionsDataMutation, usePustIngradientsDataMutation, usePustInstructionsDataMutation, usePustChefNoteDataMutation, useDeletChefNoteDataMutation, useChefBrandingCreateMutation, useGetChefBrandingListQuery, useChefSubscriptionPlanCreateMutation, useGetSubscriptionPlanListQuery, useGetManiChefBrandListQuery, useGetManiChefBrandListByIdQuery, useGetProfileQuery, useUpdateProfileMutation, useGetAllRecipesQuery, useGetAllBrandsQuery, useChefCommunityPostCreateMutation, useGetCommunityPostListQuery, useDeletCommunityPostListMutation, useChefCommentPostMutation,usePostBookmarkMutation,
  usePostLikeUnlikeMutation, useShareChefPostMutation, useAiMassageCreateMutation, useGetMainSubscriptionQuery
} = ApiSlice;

export default ApiSlice;