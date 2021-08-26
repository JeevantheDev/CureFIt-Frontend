import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { AuthContext } from '../../app/context/auth.context';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  baseStyle: {
    margin: '1rem 0',
    width: '50ch',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  customLink: {
    fontWeight: 'bold',
    marginLeft: 'auto',
    '&:hover': {
      textDecoration: 'underline',
    },
    cursor: 'pointer',
  },
}));

export const PasswordForm = () => {
  const classes = useStyles();
  const { token } = useParams();
  const {
    authResponseState: [formError, setFormError],
    loaderState: [submitLoader],
    resetPasswordAction,
  } = useContext(AuthContext);

  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  const onSubmitButton = (e) => {
    e.preventDefault();
    if (password === '' || confirm_password === '') {
      setFormError('Fill all the fields');
    } else if (password !== confirm_password) {
      setFormError('Password do not match.');
    } else {
      resetPasswordAction({ password, token });
    }
  };

  return (
    <form onSubmit={onSubmitButton} className={classes.root}>
      {formError && <Alert severity="error">{formError}</Alert>}
      <TextField
        className={classes.baseStyle}
        placeholder="enter your new password"
        variant="outlined"
        label="New Password"
        name="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <TextField
        className={classes.baseStyle}
        placeholder="enter your password again"
        variant="outlined"
        label="Confirm Password"
        name="confirm_password"
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Button type="submit" className={classes.baseStyle} color="primary" variant="contained">
        {submitLoader ? <CircularProgress color="inherit" size={25} /> : 'Create Password'}
      </Button>
    </form>
  );
};
