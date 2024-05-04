// src/actions/jobListingsActions.js
export const FETCH_JOB_LISTINGS_REQUEST = 'FETCH_JOB_LISTINGS_REQUEST';
export const FETCH_JOB_LISTINGS_SUCCESS = 'FETCH_JOB_LISTINGS_SUCCESS';
export const FETCH_JOB_LISTINGS_FAILURE = 'FETCH_JOB_LISTINGS_FAILURE';

export const fetchJobListingsRequest = () => ({
  type: FETCH_JOB_LISTINGS_REQUEST
});

export const fetchJobListingsSuccess = (jobListings) => ({
  type: FETCH_JOB_LISTINGS_SUCCESS,
  payload: jobListings
});

export const fetchJobListingsFailure = (error) => ({
  type: FETCH_JOB_LISTINGS_FAILURE,
  payload: error
});
