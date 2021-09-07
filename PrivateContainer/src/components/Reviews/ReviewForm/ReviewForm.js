import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  marginInput: {
    margin: '0.5rem 0',
  },
  ratingHeader: {
    margin: '0.7rem 0',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '18px',
    letterSpacing: '0.05em',
    color: '#555',
  },
}));

export const ReviewForm = ({ cancelForm }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <form>
      <TextField
        className={classes.marginInput}
        fullWidth
        size="small"
        variant="outlined"
        label="For which health problem/treatment did you visit ?"
        name="review_title"
        type="text"
      />
      <TextField
        className={classes.marginInput}
        fullWidth
        size="small"
        variant="outlined"
        label="Tell us about your experience"
        name="review_desc"
        type="text"
        multiline
        minRows="5"
      />
      <Typography className={classes.ratingHeader} gutterBottom>
        Give Your Rating
      </Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <Box my={1}>
        <Button color="primary" size="small" variant="contained">
          Post
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            cancelForm(false);
          }}
          style={{ marginLeft: '1rem' }}
          color="secondary"
          size="small"
          variant="contained"
        >
          cancel
        </Button>
      </Box>
    </form>
  );
};

ReviewForm.propTypes = {
  cancelForm: PropTypes.func.isRequired,
};
