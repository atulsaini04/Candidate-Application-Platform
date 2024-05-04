// src/pages/JobListingsPage.js
import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import JobCard from '../components/JobCard';
import Filter from '../components/Filter';

const JobListingsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    companyName: '',
    jobRole: '',
    location: ''
    // Add other filter fields here
  });

  const handleChange = (field) => (event) => {
    setFilters({ ...filters, [field]: event.target.value });
  };

  const handleApplyFilters = () => {
    const filtered = jobs.filter(job => {
      for (const key in filters) {
        if (filters[key] !== '' && String(job[key]).toLowerCase().indexOf(filters[key].toLowerCase()) === -1) {
          return false;
        }
      }
      return true;
    });
    setFilteredJobs(filtered);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.post('https://api.weekday.technology/adhoc/getSampleJdJSON');
      setJobs(response.data.jdList);
      setFilteredJobs(response.data.jdList);
    } catch (error) {
      console.error('Error fetching job listings:', error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Filter filters={filters} handleChange={handleChange} handleApply={handleApplyFilters} />
      </Grid>
      <Grid item xs={9}>
        <Grid container spacing={2}>
          {filteredJobs.map((job) => (
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
