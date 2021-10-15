import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import { GlobalStyles } from '../GlobalStyles/GlobalStyles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  parent: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '1rem 0',
    minWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export const Loading = ({ horizontal = false }) => {
  const classes = useStyles();
  return (
    <>
      <Box
        style={{ flexDirection: !horizontal ? 'column' : 'row' }}
        className={[classes.parent, GlobalStyles().mb1]}
      >
        <Grid item md={!horizontal ? 12 : 5} xs={12}>
          <div className={GlobalStyles().alignCenter}>
            <Skeleton variant="circle" width={200} height={200} />
          </div>
        </Grid>
        <Grid item md={!horizontal ? 12 : 6} xs={12}>
          <Skeleton height="20%" variant="text" />
          <Skeleton height="20%" variant="text" />
          <Skeleton height="20%" variant="text" />
          <Skeleton height="20%" variant="text" />
        </Grid>
      </Box>
    </>
  );
};
