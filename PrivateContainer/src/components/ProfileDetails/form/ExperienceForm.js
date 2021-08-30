import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

export const ExperienceForm = ({ currentExperience, loader, setFormError, formError, onSubmit }) => {
  const [work_place, setWorkPlace] = useState('');
  const [position, setPosition] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    setWorkPlace(currentExperience.work_place);
    setPosition(currentExperience.position);
    setYear(currentExperience.year);
  }, [currentExperience]);

  const handleSubmit = (event) => {
    event.preventDefault();
    work_place && position && year ? onSubmit({ work_place, position, year }) : setFormError('FILL ALL THE DATA');
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
            name="work_place"
            label="Add your work place name"
            placeholder="enter your work place name"
            variant="outlined"
            value={work_place}
            onChange={(e) => setWorkPlace(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            size="small"
            fullWidth
            name="position"
            label="Add your position name"
            placeholder="enter your position name"
            variant="outlined"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
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

ExperienceForm.propTypes = {
  currentExperience: PropTypes.arrayOf(Object).isRequired,
  loader: PropTypes.bool.isRequired,
  formError: PropTypes.string.isRequired,
  setFormError: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
