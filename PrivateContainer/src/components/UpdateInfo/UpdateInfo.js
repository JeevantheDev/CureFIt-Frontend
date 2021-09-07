import { Avatar, Button, Divider, Grid, TextField, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { AppContext } from '../../app/context/app.context';
import { FormContext } from '../../app/context/form.context';
import { ServiceHeader } from '../shared/ServiceHeader/ServiceHeader';

const useStyles = makeStyles((theme) => ({
  parent: {
    backgroundColor: theme.palette.background.paper,
    minWidth: '100%',
  },
  largeAvatar: {
    width: theme.spacing(25),
    height: theme.spacing(25),
  },
  userName: {
    fontWeight: 'bold',
    margin: '0.5rem 0 0 0',
    fontSize: '1.5rem',
    letterSpacing: '0.07em',
  },
  commonPadding: {
    padding: '15px',
  },
  formInfo: {
    padding: theme.spacing(2),
  },
  buttonStyle: {
    fontWeight: 'bold',
    letterSpacing: '0.07em',
  },
  mrAuto: {
    marginRight: 'auto',
  },
}));

const UpdateInfo = () => {
  const {
    userState: [currentAuthUser],
    updateUserInfoAction,
    updateUserPasswordAction,
  } = useContext(AppContext);

  const {
    loaderState: [submitLoader],
    formState: [formError, setFormError],
  } = useContext(FormContext);

  const classes = useStyles();

  const userInfoButton = useRef(null);
  const userpasswordButton = useRef(null);

  const [user_name, setUserName] = useState('');
  const [user_email, setUserEmail] = useState('');

  const [current_password, setCurrentPassword] = useState('');
  const [new_password, setNewPassword] = useState('');

  useEffect(() => {
    setFormError('');
    setUserName(currentAuthUser.user_name);
    setUserEmail(currentAuthUser.user_email);
  }, [currentAuthUser]);

  useEffect(() => {
    if (formError) return;
    setCurrentPassword('');
    setNewPassword('');
  }, [formError]);

  const onSubmitUserInfo = (event) => {
    event.preventDefault();
    const userObj = { user_name, user_email };
    updateUserInfoAction(userObj);
  };

  const onSubmitUserPassword = (event) => {
    event.preventDefault();
    const passwordObj = { current_password, new_password };
    updateUserPasswordAction(passwordObj);
  };

  return (
    <div>
      <ServiceHeader title="Update your info" />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box display="flex" flexDirection="column" className={classes.parent}>
            <Box py={3} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <Avatar className={classes.largeAvatar} src={currentAuthUser.avatar} alt={currentAuthUser.user_name} />
              <Typography className={classes.userName} color="textPrimary">
                {currentAuthUser.user_name}
              </Typography>
              <Typography color="textSecondary">{currentAuthUser.user_email}</Typography>
            </Box>
            <Divider />
            <Box py={1} display="flex" flexDirection="column">
              <Button className={classes.buttonStyle} color="primary">
                Upload Picture
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          {formError && (
            <Alert style={{ marginBottom: '1rem' }} severity="error">
              {formError}
            </Alert>
          )}
          <Box display="flex" flexDirection="column" className={classes.parent}>
            <Typography className={classes.commonPadding} color="textSecondary" gutterBottm>
              The information can be edited.
            </Typography>
            <Divider />
            <form onSubmit={onSubmitUserInfo}>
              <Grid className={classes.formInfo} container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Your full name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    name="user_name"
                    value={user_name}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="your name"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Your email id"
                    type="email"
                    fullWidth
                    variant="outlined"
                    name="user_email"
                    value={user_email}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="your email"
                  />
                </Grid>
              </Grid>
              <Divider />
              <Box p={2} display="flex">
                <Button
                  ref={userInfoButton}
                  type="submit"
                  variant="contained"
                  className={`${classes.buttonStyle} ${classes.mrAuto}`}
                  color="primary"
                >
                  {userInfoButton.current === document.activeElement && submitLoader ? (
                    <CircularProgress color="inherit" size={25} />
                  ) : (
                    'Save Details'
                  )}
                </Button>
              </Box>
            </form>
          </Box>
          <Box my={2} display="flex" flexDirection="column" className={classes.parent}>
            <Typography className={classes.commonPadding} color="textSecondary" gutterBottm>
              Config your password.
            </Typography>
            <Divider />
            <form onSubmit={onSubmitUserPassword}>
              <Grid className={classes.formInfo} container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Your current password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    name="current_password"
                    value={current_password}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="enter your current password"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Your new password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    name="new_password"
                    value={new_password}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="enter your new password"
                  />
                </Grid>
              </Grid>
              <Divider />
              <Box p={2} display="flex">
                <Button
                  ref={userpasswordButton}
                  type="submit"
                  variant="contained"
                  className={`${classes.buttonStyle} ${classes.mrAuto}`}
                  color="primary"
                >
                  {userpasswordButton.current === document.activeElement && submitLoader ? (
                    <CircularProgress color="inherit" size={25} />
                  ) : (
                    'Update Password'
                  )}
                </Button>
              </Box>
            </form>
          </Box>
          <Box my={2} display="flex" flexDirection="column" className={classes.parent}>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <Typography className={classes.commonPadding} color="textSecondary" gutterBottm>
                Do you want to <span>Delete</span> your account ?
              </Typography>
            </Box>
            <Divider />
            <Box p={2} display="flex" justifyContent="center" alignItems="center">
              <Button size="small" variant="contained" className={classes.buttonStyle} color="secondary">
                Delete
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default UpdateInfo;
