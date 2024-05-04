// src/reducers/index.js
import { combineReducers } from 'redux';
import jobListingsReducer from './jobListingsReducer';

const rootReducer = combineReducers({
  jobListings: jobListingsReducer
  // Add other reducers here if needed
});

export default rootReducer;
