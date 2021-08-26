import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { AuthContext } from '../../app/context/auth.context';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    marginRight: 'auto',
    '&:hover': {
      textDecoration: 'underline',
    },
    cursor: 'pointer',
  },
}));

export const SigninForm = () => {
  const classes = useStyles();
  const {
    authResponseState: [formError, setFormError],
    loaderState: [submitLoader],
    userLoginAction,
  } = useContext(AuthContext);

  const [user_email, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  const [passwordReset, setPasswordReset] = useState(false);

  const onSubmitButton = (e) => {
    e.preventDefault();
    userLoginAction({ user_email, password, passwordReset });
  };

  return (
    <form onSubmit={onSubmitButton} className={classes.root}>
      {formError && <Alert severity="error">{formError}</Alert>}
      <TextField
        className={classes.baseStyle}
        placeholder="enter your email id"
        variant="outlined"
        label="Email ID"
        name="user_email"
        type="email"
        onChange={(e) => setUserEmail(e.target.value)}
      />

      {!passwordReset && (
        <TextField
          className={classes.baseStyle}
          placeholder="enter your password"
          variant="outlined"
          label="Password"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      )}

      <Typography
        onClick={(e) => {
          e.stopPropagation();
          setPasswordReset(passwordReset ? false : true);
          setFormError('');
        }}
        className={classes.customLink}
        color="secondary"
      >
        {!passwordReset ? 'Forget Password ?' : 'Back to Login'}
      </Typography>

      <Button type="submit" className={classes.baseStyle} color="primary" variant="contained">
        {submitLoader ? <CircularProgress color="inherit" size={25} /> : passwordReset ? 'Send Email' : 'Login'}
      </Button>
    </form>
  );
};
