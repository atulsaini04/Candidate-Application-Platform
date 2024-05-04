import { createSlice } from '@reduxjs/toolkit';

export const jobListingsSlice = createSlice({
    name: 'jobListings',
    initialState: {
        listings: [],
    },
    reducers: {
        setListings: (state, action) => {
            state.listings = action.payload;
        },
    },
});

export const { setListings } = jobListingsSlice.actions;

export const selectListings = (state) => state.jobListings.listings;

export default jobListingsSlice.reducer;