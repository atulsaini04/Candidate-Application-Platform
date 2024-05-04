// src/components/Filter.js
import React from 'react';
import { TextField, Button, Grid } from '@material-ui/core';

const Filter = ({ filters, handleChange, handleApply }) => {
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <TextField
          label="Company Name"
          value={filters.companyName}
          onChange={handleChange('companyName')}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Job Role"
          value={filters.jobRole}
          onChange={handleChange('jobRole')}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Location"
          value={filters.location}
          onChange={handleChange('location')}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={handleApply}>Apply</Button>
      </Grid>
    </Grid>
  );
};

export default Filter;
