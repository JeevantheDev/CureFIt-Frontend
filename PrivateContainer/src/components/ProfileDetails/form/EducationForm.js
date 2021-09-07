import { Button, Grid, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

export const EducationForm = ({ currentEducation, loader, setFormError, formError, onSubmit }) => {
  const [degree, setDegree] = useState('');
  const [college, setCollege] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    setDegree(currentEducation.degree);
    setCollege(currentEducation.college);
    setYear(currentEducation.year);
  }, [currentEducation]);

  const handleSubmit = (event) => {
    event.preventDefault();
    degree && college && year ? onSubmit({ degree, college, year }) : setFormError('FILL ALL THE DATA');
  };
  return (
    <form onSubmit={handleSubmit}>
      {formError && (
        <Alert style={{ marginBottom: '1rem' }} severity="error">
          {formError}
        </Alert>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            size="small"
            fullWidth
            name="degree"
            label="Add your degree name"
            placeholder="enter your degree name"
            variant="outlined"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            size="small"
            fullWidth
            name="college"
            label="Add your college name"
            placeholder="enter your college name"
            variant="outlined"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            size="small"
            fullWidth
            name="year"
            label="Add your duration"
            placeholder="enter your duration e.g: 2000 - 2002"
            variant="outlined"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" color="secondary" type="submit">
            {loader ? 'Submitting' : 'Submit'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

EducationForm.propTypes = {
  currentEducation: PropTypes.string.isRequired,
  loader: PropTypes.bool.isRequired,
  formError: PropTypes.string.isRequired,
  setFormError: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
