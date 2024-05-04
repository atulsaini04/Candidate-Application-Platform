// src/components/Filter.js
import React from 'react';
import { TextField, Button, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';

const Filter = ({ filters, handleChange, handleApply }) => {
  return (
    <div>
      {/* <TextField label="Minimum Experience" type="number" value={filters.minExperience} onChange={handleChange('minExperience')} />
      {/* Other filter inputs */}
      {/* <Button variant="contained" color="primary" onClick={handleApply}>Apply</Button> */} 
    </div>
  );
};

export default Filter;
