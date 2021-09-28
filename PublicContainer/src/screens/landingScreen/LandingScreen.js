import { Container } from '@material-ui/core';
import React from 'react';

import { SERVICES } from '../../app/entity/constant';
import { BottomAd } from '../../components/LandingPage/BottomAd/BottomAd';
import { MiddleService } from '../../components/LandingPage/MiddleService/MiddleService';
import { Testimonials } from '../../components/LandingPage/Testimonials/Testimonials';
import { TopBanner } from '../../components/LandingPage/TopBanner/TopBanner';

const LandingScreen = () => {
  return (
    <div>
      <TopBanner />
      <Container>
        <MiddleService services={SERVICES.LANDING.CONSULT} />
      </Container>
      <Testimonials />
      <Container>
        <BottomAd />
      </Container>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default LandingScreen;
