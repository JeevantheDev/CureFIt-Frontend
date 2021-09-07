import { Button, Grid, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

export const SpecalizationForm = ({ currentSpecalization, loader, setFormError, formError, onSubmit }) => {
  const [specalize_name, setSpecalizeName] = useState('');

  useEffect(() => {
    setSpecalizeName(currentSpecalization.value);
  }, [currentSpecalization]);

  const handleSubmit = (event) => {
    event.preventDefault();
    specalize_name ? onSubmit(specalize_name) : setFormError('FILL ALL THE DATA');
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
            name="specalize_name"
            label="Add your spacelization name"
            placeholder="enter your specalization name"
            variant="outlined"
            value={specalize_name}
            onChange={(e) => setSpecalizeName(e.target.value)}
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

SpecalizationForm.propTypes = {
  currentSpecalization: PropTypes.arrayOf(Object).isRequired,
  loader: PropTypes.bool.isRequired,
  formError: PropTypes.string.isRequired,
  setFormError: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
