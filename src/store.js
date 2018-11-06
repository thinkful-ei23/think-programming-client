import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';

import { setAuthToken, refreshAuthToken } from './actions/auth';
import { loadAuthToken } from './local-storage';

// Import Reducers
import registrationReducer from './reducers/registration';
import authReducer from './reducers/auth';
import gameRoomReducer from './reducers/game-room';
import questionsReducer from './reducers/questions';
import answersReducer from './reducers/answers';

import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
    combineReducers({
        form: formReducer,
        registration: registrationReducer,
        auth: authReducer,
        gameRoom: gameRoomReducer,
        questions: questionsReducer,
        answers: answersReducer
    }), composeWithDevTools(
    applyMiddleware(thunk))
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;
