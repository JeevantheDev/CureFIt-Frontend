import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

export const TrainingCertificateForm = ({ currentTrainingCertificate, loader, setFormError, formError, onSubmit }) => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    setName(currentTrainingCertificate.name);
    setYear(currentTrainingCertificate.year);
  }, [currentTrainingCertificate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    name && year ? onSubmit({ name, year }) : setFormError('FILL ALL THE DATA');
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
            name="name"
            label="Add your training name"
            placeholder="enter your training name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

TrainingCertificateForm.propTypes = {
  currentTrainingCertificate: PropTypes.arrayOf(Object).isRequired,
  loader: PropTypes.bool.isRequired,
  formError: PropTypes.string.isRequired,
  setFormError: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
