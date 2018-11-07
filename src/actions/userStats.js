import { SubmissionError } from 'redux-form';

import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const CREATE_USERSTATS_REQUEST = 'CREATE_USERSTATS_REQUEST';
export const createUserStatsRequest = () => ({
    type: CREATE_USERSTATS_REQUEST
});

export const CREATE_USERSTATS_ERROR = 'CREATE_USERSTATS_ERROR';
export const createUserStatsError = error => ({
    type: CREATE_USERSTATS_ERROR,
    error
});

export const createUserStats = username => dispatch => {
    username = {username: username };
    dispatch(createUserStatsRequest());
    return fetch(`${API_BASE_URL}/users/stats`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(username)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .catch(err => {
            const {reason, message, location} = err;
            dispatch(createUserStatsError(err));
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