import React from 'react';
import { shallow } from 'enzyme';
import AboutUs from './about-us';

describe('<AboutUs />', () => {
  it('Should render without crashing', () => {
    shallow(<AboutUs />);
  });
});