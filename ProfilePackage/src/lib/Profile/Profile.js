import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import StarIcon from '@material-ui/icons/Star';
import { GlobalStyles } from '../components/GlobalStyles/GlobalStyles';
import { ProfileLoading } from '../components/Loading/ProfileLoading';
import theme from '../utils/theme';

const useStyles = makeStyles({
  profileParent: {
    minWidth: '100%',
    flexWrap: 'wrap',
    padding: '1rem 0',
    backgroundColor: theme.palette.background.paper,
  },
});

const Profile = (props) => {
  const { profile, horizontal = true, isLoading } = props;

  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      {isLoading && <ProfileLoading />}
      {!isLoading && profile && (
        <Paper
          style={{
            display: horizontal ? 'flex' : '',
          }}
          variant="outlined"
          className={`${classes.profileParent}  ${GlobalStyles().mb1}`}
        >
          <Grid
            className={!horizontal ? `${GlobalStyles().mb2}` : ''}
            item
            md={!horizontal ? 12 : 6}
            xs={12}
          >
            <div className={GlobalStyles().alignCenter}>
              <Avatar
                variant="circle"
                className={GlobalStyles().avatar}
                src={profile.user.avatar}
              />
            </div>
          </Grid>
          <Grid
            item
            md={!horizontal ? 12 : 6}
            xs={12}
            className={GlobalStyles().mYAuto}
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems={!horizontal ? 'center' : 'start'}
            >
              <Typography
                className={`${GlobalStyles().ml1} ${GlobalStyles().mb1}`}
                color="textPrimary"
                variant="h5"
                gutterBottom
              >
                {profile.user.user_name}
              </Typography>
              <Typography
                color="textSecondary"
                className={`${GlobalStyles().subText} ${
                  GlobalStyles().textUpper
                } ${GlobalStyles().mb1}`}
                gutterBottom
              >
                {profile.specializations.join(',')}
              </Typography>
              <Typography
                color="textSecondary"
                className={`${GlobalStyles().subText} ${GlobalStyles().mb1}`}
                gutterBottom
              >
                {profile.total_experience} years experience overall.
              </Typography>
              {profile.reviews.length > 0 && (
                <Box display="flex" ml={2} alignItems="center">
                  <Chip
                    className={GlobalStyles().greenBackground}
                    label={profile.average_rating}
                    icon={<StarIcon style={{ color: '#fff' }} />}
                  />
                </Box>
              )}
            </Box>
          </Grid>
        </Paper>
      )}
      {!isLoading && !profile && (
        <Box>
          <p>No Profile Found...</p>
        </Box>
      )}
    </Grid>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  horizontal: PropTypes.bool,
};

export default Profile;
