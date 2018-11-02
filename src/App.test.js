import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

Enzyme.configure({ adapter: new Adapter() });

describe.only('<App />', () => {
  it('Should render without crashing', () => {
    shallow(<App />);
  });
});