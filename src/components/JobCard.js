import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, CardActions, CardMedia } from '@material-ui/core';

const capitalize = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const JobCard = ({ job }) => {
  const [showFullDetails, setShowFullDetails] = useState(false);

  const toggleShowFullDetails = () => {
    setShowFullDetails(!showFullDetails);
  };

  const jobDetails = showFullDetails ? job.jobDetailsFromCompany : job.jobDetailsFromCompany.substring(0, job.jobDetailsFromCompany.indexOf(' ', job.jobDetailsFromCompany.length * 0.7)) + '...';

  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '2rem' }}>
        <div style={{ width: '20%' }}>
          <CardMedia
            component="img"
            height="100"
            image={job.logoUrl}
            alt={job.companyName}
            style={{
              padding: '0px',
              borderRadius: '8px',
              objectFit: 'contain',
              margin: '1rem' 
            }} 
          />
        </div>
        <div style={{ width: '80%', marginLeft: '2rem' }}>
          <Typography variant="h4">{job.companyName}</Typography>
          <Typography variant="subtitle1">Role: {capitalize(job.jobRole)}</Typography>
          <Typography variant="subtitle2">Location: {capitalize(job.location)}</Typography>
        </div>
      </div>
      <CardContent>
        <Typography variant="body2">
          <span style={{ position: 'relative' }}>
            {jobDetails}
            {!showFullDetails && (
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.7))',
                  backdropFilter: 'blur(5px)',
                  borderRadius: '5px',
                  pointerEvents: 'none',
                  bottom: 0,
                  right: '50%',
                  zIndex: -1
                }}
              ></div>
            )}
          </span>
        </Typography>
        {!showFullDetails && <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Button 
            color="primary" 
            onClick={toggleShowFullDetails} 
            style={{ fontWeight: 'bold' }}
          >
            Read More
          </Button>
        </div>}
        {showFullDetails && <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Button color="primary" onClick={toggleShowFullDetails} style={{ fontWeight: 'bold' }}>Show Less</Button>
        </div>}
        <Typography variant="body2">Experience: {job.minExp} - {job.maxExp} years</Typography>
        <Typography variant="body2">Salary: {job.minJdSalary} - {job.maxJdSalary} {job.salaryCurrencyCode} ✅</Typography>
      </CardContent>
      <CardActions style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1rem' }}>
        <Button variant="contained" color="primary" href={job.jdLink} target="_blank">Easy Apply</Button>
        <Button variant="contained" color="primary" href={job.jdLink} target="_blank">Unlock Referral</Button>
      </CardActions>
    </Card>
  );
};

export default JobCard;
