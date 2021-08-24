import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
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
  const globalClasses = GlobalStyles();

  return (
    <>
      {isLoading && <ProfileLoading />}
      {!isLoading && profile && profile.slug && (
        <Paper
          style={{
            display: horizontal ? 'flex' : '',
          }}
          variant="outlined"
          className={`${classes.profileParent} ${globalClasses.mb1}`}
        >
          <Grid container spacing={3}>
            {/* Profile avatar part */}
            <Grid
              className={!horizontal ? `${globalClasses.mb2}` : ''}
              item
              md={!horizontal ? 12 : 6}
              xs={12}
            >
              <div className={globalClasses.alignCenter}>
                <Avatar
                  variant="circle"
                  className={globalClasses.avatar}
                  src={profile.user.avatar}
                />
              </div>
            </Grid>
            {/* Profile info part */}
            <Grid
              item
              md={!horizontal ? 12 : 6}
              xs={12}
              className={`${globalClasses.mYAuto} ${globalClasses.flexColumnCenter}`}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems={!horizontal ? 'center' : 'start'}
              >
                <Typography
                  className={`${globalClasses.ml1} ${globalClasses.mb1}`}
                  color="textPrimary"
                  variant="h5"
                  gutterBottom
                >
                  {profile.user.user_name}
                </Typography>
                <Typography
                  color="textSecondary"
                  className={`${globalClasses.subText} ${globalClasses.textUpper} ${globalClasses.mb1}`}
                  gutterBottom
                >
                  {profile.specializations.join(',')}
                </Typography>
                <Typography
                  color="textSecondary"
                  className={`${globalClasses.subText} ${globalClasses.mb1}`}
                  gutterBottom
                >
                  {profile.total_experience || 0} years experience overall.
                </Typography>
                {profile.reviews.length > 0 && (
                  <Box display="flex" ml={2} alignItems="center">
                    <Chip
                      className={globalClasses.greenBackground}
                      label={profile.average_rating || 0.0}
                      icon={<StarIcon style={{ color: '#fff' }} />}
                    />
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
};

Profile.propTypes = {
  profile: PropTypes.any.isRequired,
  isLoading: PropTypes.bool.isRequired,
  horizontal: PropTypes.bool,
};

export default Profile;
