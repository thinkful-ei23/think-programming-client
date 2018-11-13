import React from 'react';
import { shallow } from 'enzyme';
import { LandingPage } from './landing-page';

describe('<LandingPage />', () => {
  it('Should render without crashing', () => {
    shallow(<LandingPage />);
  });
});