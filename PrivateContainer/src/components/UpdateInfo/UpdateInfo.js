import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Avatar, Button, Divider, Grid, TextField, Typography } from '@material-ui/core';
import { ServiceHeader } from '../shared/ServiceHeader/ServiceHeader';
import { AppContext } from '../../app/context/app.context';

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
    loaderState: [submitLoader],
    userState: [currentAuthUser],
    formState: [formError],
  } = useContext(AppContext);
  const classes = useStyles();

  const [user_name, setUserName] = useState('');
  const [user_email, setUserEmail] = useState('');

  useEffect(() => {
    setUserName(currentAuthUser.user_name);
    setUserEmail(currentAuthUser.user_email);
  }, [currentAuthUser]);

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
          <Box display="flex" flexDirection="column" className={classes.parent}>
            <Typography className={classes.commonPadding} color="textSecondary" gutterBottm>
              The information can be edited.
            </Typography>
            <Divider />
            <form>
              <Grid className={classes.formInfo} container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
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
                <Button variant="contained" className={`${classes.buttonStyle} ${classes.mrAuto}`} color="primary">
                  Save Details
                </Button>
              </Box>
            </form>
          </Box>
          <Box my={2} display="flex" flexDirection="column" className={classes.parent}>
            <Typography className={classes.commonPadding} color="textSecondary" gutterBottm>
              Config your password.
            </Typography>
            <Divider />
            <form>
              <Grid className={classes.formInfo} container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    type="password"
                    fullWidth
                    variant="outlined"
                    name="password"
                    value={''}
                    placeholder="your new password"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    type="password"
                    fullWidth
                    variant="outlined"
                    name="user_email"
                    value={''}
                    placeholder="confirm your password"
                  />
                </Grid>
              </Grid>
              <Divider />
              <Box p={2} display="flex">
                <Button variant="contained" className={`${classes.buttonStyle} ${classes.mrAuto}`} color="primary">
                  Save Details
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
