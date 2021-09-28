import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Typography } from '@material-ui/core';
import { ServiceTitle } from '../../ServiceTitle/ServiceTitle';

const useStyles = makeStyles((theme) => ({
  adContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      '& > div': {
        alignSelf: 'center',
      },
    },
  },
  mobileImage: {
    width: 500,
    height: 450,
    objectFit: 'contain',
  },
  adDescText: {
    fontWeight: 300,
    fontSize: '15px',
    lineHeight: '25px',
    letterSpacing: '0.01em',
    width: '28rem',

    [theme.breakpoints.down('md')]: {
      width: 'auto',
    },
  },
  buttonText: { color: 'white', fontWeight: 'bold', textTransform: 'capitalize' },
  iconImage: {
    width: '30px',
    height: '30px',
    objectFit: 'cover',
  },
}));
export const BottomAd = () => {
  const classes = useStyles();
  return (
    <Box className={classes.adContainer}>
      <Box alignSelf="flex-end">
        <img
          className={classes.mobileImage}
          src={require('../../../assets/media/mobile.png').default}
          alt="mobile app"
        />
      </Box>
      <Box flexDirection="column" justifyContent="center" alignItems="center">
        <ServiceTitle margin={false} title="Download the CureFit app" />
        <Typography color="textSecondary" className={classes.adDescText}>
          Access video consultation with India’s top doctors on the CureFit app. Connect with doctors online, available
          24/7, from the comfort of your home.
        </Typography>
        <Box my={3}>
          <Button
            startIcon={
              <img
                className={classes.iconImage}
                src={require('../../../assets/media/playstore.png').default}
                alt="googleplay"
              />
            }
            style={{ marginRight: 20 }}
            variant="contained"
            color="secondary"
          >
            <Typography className={classes.buttonText}>Google Play</Typography>
          </Button>
          <Button
            startIcon={
              <img className={classes.iconImage} src={require('../../../assets/media/apple.png').default} alt="apple" />
            }
            variant="contained"
            color="secondary"
          >
            <Typography className={classes.buttonText}>App Store</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
