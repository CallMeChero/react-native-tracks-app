import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackApi from '../api/tracker';
import { navigate } from '../helpers/navigationRef';

const authReducer = (state,action) => {
    switch(action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signup':
            return { token: action.payload, errorMessage: '' }
        default: 
            return state;
    }
};

const signup = dispatch => {
    return async ({ email, password }) => {
        // make Sign up Request
        // success -> modify state (JWT authenticated) and navigate
        // error -> error msg
        try {
            const response = await trackApi.post('/signup', { email, password})
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: 'signup', payload: response.data.token });
            navigate('TrackList');
        } catch(err) {
            dispatch({ type: 'add_error', payload: 'Something went wrong with sign up'});
        }
    };
}

const signin = (dispatch) => {
    return ({ email, password }) => {
        // make Sign in Request

        // success -> modify state (JWT authenticated)

        // error -> error msg
    };
}

const signout = (dispatch) => {
    return ({ email, password }) => {
        // make Sign out Request

        // success -> modify state (remove JWT)

        // error -> error msg
    };
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup},
    { token: '', errorMessage: '' }
)