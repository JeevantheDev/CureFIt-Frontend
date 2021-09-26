import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  bannerContainer: {
    backgroundColor: theme.palette.primary.main,
  },
  bannerInnerContainer: {
    padding: '5px 5px 0px 5px',
    height: '23rem',
  },
  bannerText: {
    color: '#fff',
    fontWeight: 500,
    fontSize: '45px',
    letterSpacing: '0.08em',
    lineHeight: '67px',
    textTransform: 'capitalize',
    flex: 0.4,
    alignSelf: 'center',

    [theme.breakpoints.down('md')]: {
      flex: 1,
    },
  },
  bannerImage: {
    width: 520,
    height: 320,
    flex: 0.5,
    objectFit: 'contain',

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

export const TopBanner = () => {
  const classes = useStyles();
  return (
    <Box className={classes.bannerContainer}>
      <Container>
        <Box
          className={classes.bannerInnerContainer}
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Typography className={classes.bannerText}>“We are not living in fear. We are living in faith.”</Typography>
          <img className={classes.bannerImage} src={require('../../../assets/media/banner.png').default} alt="banner" />
        </Box>
      </Container>
    </Box>
  );
};
