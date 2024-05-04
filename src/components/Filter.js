import React from 'react';
import { TextField, Button, Grid } from '@material-ui/core';

const Filter = ({ filters, onFilterChange, onApplyFilters }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onFilterChange({ [name]: value });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          name="minExperience"
          label="Minimum Experience"
          value={filters.minExperience}
          onChange={handleChange}
          type="number"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          name="companyName"
          label="Company Name"
          value={filters.companyName}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      {/* Add more filter fields as needed */}
      <Grid item xs={12} sm={6} md={4}>
        <Button variant="contained" color="primary" onClick={onApplyFilters}>
          Apply Filters
        </Button>
      </Grid>
    </Grid>
  );
};

export default Filter;
