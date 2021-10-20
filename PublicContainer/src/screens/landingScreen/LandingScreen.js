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
        <MiddleService
          title="Consult top doctors in any specialists"
          subTitle="Book your appointment with doctors in all specialists"
          services={SERVICES.LANDING.CONSULT}
        />
        <MiddleService
          title="Browse medcines & health products"
          subTitle="Browse your essentials health products as for your need"
          services={SERVICES.LANDING.PHARMACY}
          type="category"
        />
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
