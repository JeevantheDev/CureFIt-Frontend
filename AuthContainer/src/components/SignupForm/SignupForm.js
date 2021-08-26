import React, { useContext, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Typography } from '@material-ui/core';
import { USER_TYPE, ROLES } from '../../app/entity/constant';
import { AuthContext } from '../../app/context/auth.context';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

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
  customSelect: {
    fontWeight: 'bold',
    fontSize: '22px',
    lineHeight: '29px',
    fontVariant: 'small-caps',
    margin: '0 2rem',
  },
  customLink: {
    fontWeight: 'bold',
    marginLeft: 'auto',
    '&:hover': {
      textDecoration: 'underline',
    },
    cursor: 'pointer',
  },
  customBorder: {
    borderColor: '#DBD9D9',
  },
}));

export const SignupForm = () => {
  const classes = useStyles();
  const {
    userTypeState: [currentUserType, setCurrentUserType],
    authResponseState: [formError, setFormError],
    loaderState: [submitLoader],
    userSignupAction,
  } = useContext(AuthContext);

  const [user_name, setUserName] = useState('');
  const [user_email, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitButton = (e) => {
    e.preventDefault();
    userSignupAction({ user_name, user_email, user_type: currentUserType, password });
  };

  return (
    <>
      {!currentUserType && (
        <div className={classes.root}>
          {USER_TYPE.map((user, idx) => (
            <Box
              className={classes.customBorder}
              key={idx}
              borderBottom={2}
              mb={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <user.icon fontSize="large" />
              <Typography className={classes.customSelect}>signup as {user.type}</Typography>
              <Typography
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentUserType(user.value);
                  setFormError('');
                }}
                className={classes.customLink}
                color="secondary"
              >
                Signup Here
              </Typography>
            </Box>
          ))}
        </div>
      )}
      {currentUserType && (
        <form onSubmit={onSubmitButton} className={classes.root}>
          {formError && <Alert severity="error">{formError}</Alert>}
          <Typography
            onClick={(e) => {
              e.stopPropagation();
              setCurrentUserType(null);
              setFormError('');
            }}
            className={classes.customLink}
            color="secondary"
          >
            NOT {ROLES[currentUserType]} ?
          </Typography>
          <TextField
            className={classes.baseStyle}
            placeholder="enter your name"
            variant="outlined"
            label="Full Name"
            name="user_name"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            className={classes.baseStyle}
            placeholder="enter your email id"
            variant="outlined"
            label="Email ID"
            name="user_email"
            type="email"
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <TextField
            className={classes.baseStyle}
            placeholder="enter your new password"
            variant="outlined"
            label="Create Password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" className={classes.baseStyle} color="primary" variant="contained">
            {submitLoader ? <CircularProgress color="inherit" size={25} /> : 'Signup'}
          </Button>
        </form>
      )}
    </>
  );
};
