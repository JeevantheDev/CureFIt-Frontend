import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TodayIcon from '@material-ui/icons/Today';
import StarIcon from '@material-ui/icons/Star';
import { GlobalStyles } from '../components/GlobalStyles/GlobalStyles';
import { ProfileLoading } from '../components/Loading/ProfileLoading';

const Profiles = (props) => {
  const { profileList, handleButtonClick, isLoading } = props;
  const globalClasses = GlobalStyles();

  return (
    <Grid container spacing={3}>
      {isLoading && [1, 2, 3].map((n) => <ProfileLoading key={n} />)}
      {!isLoading &&
        profileList.length > 0 &&
        profileList.map((profile, idx) => (
          <Paper
            variant="outlined"
            className={`${globalClasses.parent} ${globalClasses.mb1}`}
            key={idx}
          >
            {/* Profile avatar part */}
            <Grid item md={3} xs={12}>
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
              className={globalClasses.flexColumnCenter}
              item
              md={6}
              xs={12}
            >
              <Typography
                className={globalClasses.ml1}
                color="textPrimary"
                variant="h4"
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
              {profile.clinics.length > 0 && (
                <>
                  <Typography
                    color="textSecondary"
                    className={`${globalClasses.subText}
                      ${globalClasses.mb1}
                      ${globalClasses.fontBold}`}
                    gutterBottom
                  >
                    {profile.clinics[0].clinic_address}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    className={`${globalClasses.subText} ${globalClasses.mb1}`}
                    gutterBottom
                  >
                    {profile.clinics[0].clinic_name}
                    {profile.clinics.length > 1 &&
                      ` +${profile.clinics.length - 1} More`}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    className={`${globalClasses.subText} ${globalClasses.mb1}`}
                    gutterBottom
                  >
                    {`${profile.clinics[0].fees} Consultation fee at clinic.`}
                  </Typography>
                </>
              )}
              {profile.reviews.length > 0 && (
                <Box display="flex" ml={2} alignItems="center">
                  <Chip
                    className={globalClasses.greenBackground}
                    label={profile.average_rating || '0.0'}
                    icon={<StarIcon style={{ color: '#fff' }} />}
                  />
                  <Typography
                    color="textPrimary"
                    className={`${globalClasses.subText}
                      ${globalClasses.fontBold}
                      ${globalClasses.textUnderline}`}
                  >
                    {profile.reviews.length} Patient Comments.
                  </Typography>
                </Box>
              )}
            </Grid>
            {/* Profile button part */}
            <Grid item md={3} xs={12}>
              <Box
                height={'100%'}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                mx={3}
              >
                <Button
                  startIcon={<TodayIcon className={globalClasses.greenText} />}
                  className={`${globalClasses.greenText}
                    ${globalClasses.fontBold}
                    ${globalClasses.mb1}`}
                >
                  Available Today
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleButtonClick('Appointment', profile._id);
                  }}
                  className={`${globalClasses.mb1} ${globalClasses.fontBold}`}
                  variant="contained"
                  color="primary"
                >
                  Book Appointment
                </Button>
                <Button
                  className={`${globalClasses.fontBold} 
                    ${globalClasses.hoverUnderline}`}
                  variant="outlined"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleButtonClick('View Profile', profile._id);
                  }}
                >
                  View Profile
                </Button>
              </Box>
            </Grid>
          </Paper>
        ))}
      {!isLoading && profileList.length === 0 && (
        <Box>
          <p>No Profiles Found...</p>
        </Box>
      )}
    </Grid>
  );
};

Profiles.propTypes = {
  profileList: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
};

export default Profiles;
