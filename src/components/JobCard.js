import React from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';

const JobCard = ({ job }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2">
          {job.title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {job.company}
        </Typography>
        <Typography variant="body2" component="p">
          Location: {job.location}
        </Typography>
        <Typography variant="body2" component="p">
          Experience Required: {job.experience}
        </Typography>
        <Typography variant="body2" component="p">
          {job.description}
        </Typography>
        <Button variant="contained" color="primary">
          Apply
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;
