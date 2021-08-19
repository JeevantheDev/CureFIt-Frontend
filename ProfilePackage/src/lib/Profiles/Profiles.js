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

  return (
    <Grid container spacing={3}>
      {isLoading && <ProfileLoading />}
      {!isLoading &&
        profileList.length > 0 &&
        profileList.map((profile, idx) => (
          <Paper
            variant="outlined"
            className={`${GlobalStyles().parent} ${GlobalStyles().mb1}`}
            key={idx}
          >
            <Grid item md={3} xs={12}>
              <div className={GlobalStyles().alignCenter}>
                <Avatar
                  variant="circle"
                  className={GlobalStyles().avatar}
                  src={profile.user.avatar}
                />
              </div>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography
                className={GlobalStyles().ml1}
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
                }`}
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
              {profile.clinics.length > 0 && (
                <>
                  <Typography
                    color="textSecondary"
                    className={`${GlobalStyles().subText}
                      ${GlobalStyles().mb1}
                      ${GlobalStyles().fontBold}`}
                    gutterBottom
                  >
                    {profile.clinics[0].clinic_address}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    className={`${GlobalStyles().subText} ${
                      GlobalStyles().mb1
                    }`}
                    gutterBottom
                  >
                    {profile.clinics[0].clinic_name}
                    {profile.clinics.length > 1 &&
                      ` +${profile.clinics.length - 1} More`}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    className={`${GlobalStyles().subText} ${
                      GlobalStyles().mb1
                    }`}
                    gutterBottom
                  >
                    {`${profile.clinics[0].fees} Consultation fee at clinic.`}
                  </Typography>
                </>
              )}
              {profile.reviews.length > 0 && (
                <Box display="flex" ml={2} alignItems="center">
                  <Chip
                    className={GlobalStyles().greenBackground}
                    label={profile.average_rating}
                    icon={<StarIcon style={{ color: '#fff' }} />}
                  />
                  <Typography
                    color="textPrimary"
                    className={`${GlobalStyles().subText}
                      ${GlobalStyles().fontBold}
                      ${GlobalStyles().textUnderline}`}
                  >
                    {profile.reviews.length} Patient Comments.
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item md={3} xs={12}>
              <Box
                height={'100%'}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                ml={1}
                mr={1}
              >
                <Button
                  startIcon={<TodayIcon className={GlobalStyles().greenText} />}
                  className={`${GlobalStyles().greenText}
                    ${GlobalStyles().fontBold}
                    ${GlobalStyles().mb1}`}
                >
                  Available Today
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleButtonClick(profile._id);
                  }}
                  className={`${GlobalStyles().mb1} ${GlobalStyles().fontBold}`}
                  variant="contained"
                  color="primary"
                >
                  Book Appointment
                </Button>
                <Button
                  className={`${GlobalStyles().fontBold} 
                    ${GlobalStyles().hoverUnderline}`}
                  variant="outlined"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleButtonClick(profile._id);
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
