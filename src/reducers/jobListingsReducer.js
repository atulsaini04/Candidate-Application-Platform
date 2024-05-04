// src/reducers/jobListingsReducer.js
import { FETCH_JOB_LISTINGS_REQUEST, FETCH_JOB_LISTINGS_SUCCESS, FETCH_JOB_LISTINGS_FAILURE } from '../actions/jobListingActions.js';

const initialState = {
  loading: false,
  jobListings: [],
  error: ''
};

const jobListingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOB_LISTINGS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_JOB_LISTINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        jobListings: action.payload,
        error: ''
      };
    case FETCH_JOB_LISTINGS_FAILURE:
      return {
        ...state,
        loading: false,
        jobListings: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default jobListingsReducer;
