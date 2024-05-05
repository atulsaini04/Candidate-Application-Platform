import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  makeStyles
} from "@material-ui/core";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  outlinedSelect: {
    width: '12rem',
  },
}));

const capitalize = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const Filter = ({ filters, handleChange, handleApply }) => {
  const classes = useStyles();
  const [jobData, setJobData] = useState([]);
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [uniqueMinExp, setUniqueMinExp] = useState([]);
  const [uniqueJobRoles, setUniqueJobRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://api.weekday.technology/adhoc/getSampleJdJSON');
        setJobData(response.data.jdList);
        // Extract unique locations
        const locations = new Set(response.data.jdList.map(job => job.location));
        setUniqueLocations(Array.from(locations));
        // Extract unique minimum experience values
        const minExpValues = new Set(response.data.jdList.map(job => job.minExp === null ? "FRESHER" : job.minExp));
        setUniqueMinExp(Array.from(minExpValues));
        // Extract unique job roles
        const jobRoles = new Set(response.data.jdList.map(job => job.jobRole));
        setUniqueJobRoles(Array.from(jobRoles));
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Grid
        zeroMinWidth
        container
        spacing={2}
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid item>
          <FormControl variant="outlined" fullWidth>
            <InputLabel zeroMinWidth>Company Name</InputLabel>
            <Select
              value={filters.companyName}
              onChange={handleChange("companyName")}
              label="Company Name"
              className={classes.outlinedSelect}
            >
              <MenuItem value="">All</MenuItem>
              {jobData.map((job) => (
                <MenuItem key={job.jdUid} value={job.companyName}>{capitalize(job.companyName)}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Job Role</InputLabel>
            <Select
              value={filters.jobRole}
              onChange={handleChange("jobRole")}
              label="Job Role"
              className={classes.outlinedSelect}
            >
              <MenuItem value="">All</MenuItem>
              {uniqueJobRoles.map((jobRole, index) => (
                <MenuItem key={index} value={jobRole}>{capitalize(jobRole)}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Location</InputLabel>
            <Select
              value={filters.location}
              onChange={handleChange("location")}
              label="Location"
              className={classes.outlinedSelect}
            >
              <MenuItem value="">All</MenuItem>
              {uniqueLocations.map((location, index) => (
                <MenuItem key={index} value={location}>{capitalize(location)}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Min Experience</InputLabel>
            <Select
              value={filters.minExp}
              onChange={handleChange("minExp")}
              label="Min Experience"
              className={classes.outlinedSelect}
            >
              <MenuItem value="">All</MenuItem>
              {uniqueMinExp.sort((a, b) => {
                if (a === "FRESHER") return -1;
                if (b === "FRESHER") return 1;
                return a - b;
              }).map((exp, index) => (
                <MenuItem key={index} value={exp}>{exp}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Min Base Pay</InputLabel>
            <Select
              value={filters.minJdSalary}
              onChange={handleChange("minJdSalary")}
              label="Min Base Pay"
              className={classes.outlinedSelect}
            >
              <MenuItem value="">All</MenuItem>
              {jobData
                .map((job) => ({
                  value: job.minJdSalary !== null ? job.minJdSalary : 0,
                  label: job.minJdSalary !== null ? job.minJdSalary : "UNPAID"
                }))
                .sort((a, b) => a.value - b.value)
                .map((item, index) => (
                  <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleApply}>
            Search
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Filter;
