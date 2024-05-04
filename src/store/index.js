import { configureStore } from '@reduxjs/toolkit';
import jobListingsReducer from '../features/jobListingsSlice';
import filtersReducer from '../features/filtersSlice';

export const store = configureStore({
    reducer: {
        jobListings: jobListingsReducer,
        filters: filtersReducer,
    },
});

export default store;