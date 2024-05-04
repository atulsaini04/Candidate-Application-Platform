import { createSlice } from '@reduxjs/toolkit';

export const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        minExperience: 0,
        companyName: '',
        location: '',
        remote: false,
        techStack: '',
        role: '',
        minBasePay: 0,
    },
    reducers: {
        setFilter: (state, action) => {
            state[action.payload.key] = action.payload.value;
        },
    },
});

export const { setFilter } = filtersSlice.actions;

export const selectFilters = (state) => state.filters;

export default filtersSlice.reducer;