import { SubmissionError } from 'redux-form';

import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const registerUserRequest = () => ({
    type: REGISTER_USER_REQUEST
});

export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';
export const registerUserError = error => ({
    type: REGISTER_USER_ERROR,
    error
});

export const registerUser = user => dispatch => {
    dispatch(registerUserRequest());
    return fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .catch(err => {
            const {reason, message, location} = err;
            dispatch(registerUserError(err));
            console.log('error Jacob', reason, message, location)
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
};