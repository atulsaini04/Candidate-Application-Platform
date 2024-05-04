// src/pages/JobListingsPage.js
import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobListingsRequest, fetchJobListingsSuccess, fetchJobListingsFailure } from '../actions/jobListingActions.js';
import JobCard from '../components/JobCard';
import Filter from '../components/Filter';
import axios from 'axios';

const JobListingsPage = () => {
  const dispatch = useDispatch();
  const { jobListings, loading, error } = useSelector(state => state.jobListings);

  useEffect(() => {
    dispatch(fetchJobListingsRequest());
    fetchJobs();
  }, [dispatch]);

  const fetchJobs = async () => {
    try {
      const response = await axios.post('https://api.weekday.technology/adhoc/getSampleJdJSON');
      dispatch(fetchJobListingsSuccess(response.data.jdList)); // Assuming response.data is an array of job objects
    } catch (error) {
      dispatch(fetchJobListingsFailure(error.message));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Filter />
      </Grid>
      <Grid item xs={9}>
        <Grid container spacing={2}>
          {jobListings.map((job) => (
            <Grid item xs={12} key={job.jdUid}>
              <JobCard job={job} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default JobListingsPage;
