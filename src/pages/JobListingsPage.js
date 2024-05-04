import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectListings } from "../features/jobListingsSlice";
import { selectFilters } from "../features/filtersSlice";
// import { fetchListings } from "../api/jobApi";
import { fetchJobListings } from '../api/jobApi';


const JobListingsPage = () => {
    const dispatch = useDispatch();
    const listings = useSelector(selectListings);
    const filters = useSelector(selectFilters);

    // Fetch job listings when the component mounts
    React.useEffect(() => {
        dispatch(fetchJobListings(filters));
    }, [dispatch, filters]);

    return <div > { /* Render job listings and filter component */ } </div>;
};

export default JobListingsPage;