import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AppContext } from '../../../app/context/app.context';
// import { UserContext } from '../../../screens/userScreen/context/user.context';
import { PRODUCT_APPLICATION_URL } from '../../../app/router/ApplicationRoutes';
import { FormContext } from '../../../app/context/form.context';
import { REVIEW_MODEL } from '../../../app/entity/constant';
import Alert from '@material-ui/lab/Alert';

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
  const { slug } = useParams();
  const history = useHistory();
  const {
    tokenState: [currentToken],
    setReturnUrl,
  } = useContext(AppContext);
  const {
    editState: [isEditFlag],
    loaderState: [submitLoader],
    formState: [formError],
    reviewState: [selectedReview],
  } = useContext(FormContext);
  // const { createUpdateReviewsAction } = useContext(UserContext);

  const [review_title, setReviewTitle] = useState('');
  const [review_desc, setReviewDesc] = useState('');
  const [review_for, setReviewFor] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setReviewTitle(selectedReview ? selectedReview.review_title : '');
    setReviewDesc(selectedReview ? selectedReview.review_desc : '');
    setReviewFor(selectedReview ? selectedReview.review_for : REVIEW_MODEL.PROFILE);
    setRating(selectedReview ? selectedReview.rating : 0);
  }, [selectedReview]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!currentToken && setReturnUrl) {
      setReturnUrl(history.location.pathname);
      history.push({
        pathname: PRODUCT_APPLICATION_URL.AUTH_SIGNIN_CONTAINER,
      });
    } else {
      const payloadObj = {
        id: selectedReview ? selectedReview._id : '',
        review_title,
        review_desc,
        review_for: review_for,
        review_of: slug,
        rating: rating,
        isEditFlag,
      };
      // createUpdateReviewsAction(payloadObj);
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
      {formError && (
        <Alert style={{ marginBottom: '1rem' }} severity="error">
          {formError}
        </Alert>
      )}
      <TextField
        className={classes.marginInput}
        fullWidth
        size="small"
        variant="outlined"
        label="For which health problem/treatment did you visit ?"
        name="review_title"
        type="text"
        value={review_title}
        onChange={(e) => setReviewTitle(e.target.value)}
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
        value={review_desc}
        onChange={(e) => setReviewDesc(e.target.value)}
      />
      <Typography className={classes.ratingHeader} gutterBottom>
        Give Your Rating
      </Typography>
      <Rating
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
      <Box my={1}>
        <Button type="submit" color="primary" size="small" variant="contained">
          {isEditFlag ? (submitLoader ? 'Updating...' : 'Update') : submitLoader ? 'Posting...' : 'Post'}
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
