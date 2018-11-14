import React from 'react';
import { shallow } from 'enzyme';
import Input from './input';
import { reducer as formReducer } from 'redux-form';
import { Field, reduxForm, focus } from 'redux-form';


describe('<Input />', () => {
  it('Should render without crashing', () => {
    shallow(<Input meta={{touched: false}} input={'test'}/>);
  });
});