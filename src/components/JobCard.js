// src/components/JobCard.js
import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@material-ui/core';

const JobCard = ({ job }) => {
  console.log(job)
  console.log(job.companyName)
  
  console.log(job.location)
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{job.companyName}</Typography>
        <Typography variant="subtitle1">Role: {job.jobRole}</Typography>
        <Typography variant="subtitle2">Location: {job.location}</Typography>
        <Typography variant="body2">{job.jobDetailsFromCompany}</Typography>
        <Typography variant="body2">Experience: {job.minExp} - {job.maxExp} years</Typography>
        <Typography variant="body2">Salary: {job.minJdSalary} - {job.maxJdSalary} {job.salaryCurrencyCode}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" href={job.jdLink} target="_blank">Apply</Button>
      </CardActions>
    </Card>
  );
};

export default JobCard;
