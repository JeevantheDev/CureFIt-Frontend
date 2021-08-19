import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import { GlobalStyles } from '../GlobalStyles/GlobalStyles';

const useStyles = makeStyles({
  parent: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '1rem 0',
    minWidth: '100%',
  },
});

export const ProfileLoading = () => {
  const classes = useStyles();
  return (
    <>
      {[1, 2, 3].map((n) => (
        <Paper
          variant="outlined"
          className={[classes.parent, GlobalStyles().mb1]}
          key={n}
        >
          <Grid item md={5} xs={12}>
            <div className={GlobalStyles().alignCenter}>
              <Skeleton variant="circle" width={250} height={250} />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <Skeleton height="20%" variant="text" />
            <Skeleton height="20%" variant="text" />
            <Skeleton height="20%" variant="text" />
            <Skeleton height="20%" variant="text" />
            <Skeleton height="20%" variant="text" />
          </Grid>
        </Paper>
      ))}
    </>
  );
};
