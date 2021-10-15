import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { ServiceTitle } from './ServiceTitle';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

const renderServiceTitle = (props) => {
  return render(<ServiceTitle {...props} />);
};

test('if the profiles list length is 1 and there is no filterQuery', async () => {
  const profilesLength = 1;
  const filterQuery = { location: '' };
  const title = `Book from ${profilesLength || 0} doctors  ${
    filterQuery.location ? `in ${filterQuery.location}.` : '.'
  }`;
  const subTitle = 'With predicted wait-time & verified details.';

  const { findByTestId } = renderServiceTitle({ title, subTitle });

  const primaryTitle = await findByTestId('primary-title');
  const primarySubTitle = await findByTestId('primary-subtitle');

  expect(primaryTitle).toHaveTextContent(title);
  expect(primarySubTitle).toHaveTextContent(subTitle);
});
