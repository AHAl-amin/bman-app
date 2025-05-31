import { createSlice } from "@reduxjs/toolkit";

const brandSlice = createSlice({
	name: "brand",
	initialState: {
		selectedBrandId: null, // Initial state for brand_id
	},
	reducers: {
		setBrandId: (state, action) => {
			state.selectedBrandId = action.payload;
		},
	},
});

export const { setBrandId } = brandSlice.actions;
export default brandSlice.reducer;
