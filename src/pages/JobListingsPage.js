import React, { useState, useEffect, useRef } from 'react';
import { Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import JobCard from '../components/JobCard';
import Filter from '../components/Filter';
import InfiniteScroll from 'react-infinite-scroll-component';

const JobListingsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    companyName: '',
    jobRole: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searched, setSearched] = useState(false); // Track if search button is clicked
  const observer = useRef();

  const handleChange = (field) => (event) => {
    setFilters({ ...filters, [field]: event.target.value });
  };

  const handleApply = () => {
    setSearched(true); // Set searched to true when search button is clicked
    const filtered = jobs.filter((job) => {
      const { companyName, jobRole, location } = filters;
      return (
        (companyName === '' || job.companyName.toLowerCase().includes(companyName.toLowerCase())) &&
        (jobRole === '' || job.jobRole.toLowerCase().includes(jobRole.toLowerCase())) &&
        (location === '' || job.location.toLowerCase().includes(location.toLowerCase()))
      );
    });
    setFilteredJobs(filtered);
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://api.weekday.technology/adhoc/getSampleJdJSON', {
        page: page,
      });
      setJobs((prevJobs) => [...prevJobs, ...response.data.jdList]);
      setPage(page + 1);
      setLoading(false);
      if (response.data.jdList.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching job listings:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []); 

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 0.1
    };

    observer.current = new IntersectionObserver(handleObserver, options);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting && !loading && hasMore) {
      fetchJobs();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '6rem' }}>
      <div style={{ marginBottom: '2rem', width:'100%' }}>
        <Filter filters={filters} handleChange={handleChange} handleApply={handleApply} />
      </div>
      {searched && filteredJobs.length === 0 && (
        <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '2rem', color:'#808080', fontSize:'2rem' }}>
           😢  Can't find anything as such, you can try other opportunities as well.
        </Typography>
      )}
      <InfiniteScroll
        dataLength={filteredJobs.length > 0 ? filteredJobs.length : jobs.length}
        next={fetchJobs}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        scrollThreshold={0.9}
      >
        <Grid container spacing={6}>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <Grid item xs={4} key={index}>
                <JobCard job={job} />
              </Grid>
            ))
          ) : (
            jobs.map((job, index) => (
              <Grid item xs={4} key={index}>
                <JobCard job={job} />
              </Grid>
            ))
          )}
        </Grid>
      </InfiniteScroll>
    </div>
  );
};

export default JobListingsPage;
