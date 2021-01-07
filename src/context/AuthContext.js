import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackApi from '../api/tracker';
import { navigate } from '../helpers/navigationRef';

const authReducer = (state,action) => {
    switch(action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signin':
            return { token: action.payload, errorMessage: '' }
        case 'clear_error_message':
            return { ...state, errorMessage: '' }
        case 'signout': 
            return { token: null, errorMessage: '' }
        default: 
            return state;
    }
};

const tryLocalSignin = dispatch => {
    return async () => {
        const token = await AsyncStorage.getItem('token');
        if(token) {
            dispatch({ type: 'signin', payload: token});
            navigate('TrackList');
        } else {
            navigate('loginFlow');
        }
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message'});
}

const signup = dispatch => {
    return async ({ email, password }) => {
        // make Sign up Request
        // success -> modify state (JWT authenticated) and navigate
        // error -> error msg
        try {
            const response = await trackApi.post('/signup', { email, password})
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: 'signin', payload: response.data.token });
            navigate('TrackList');
        } catch(err) {
            dispatch({ type: 'add_error', payload: 'Something went wrong with sign up'});
        }
    };
}

const signin = (dispatch) => {
    return async ({ email, password }) => {
        // make Sign in Request
        // success -> modify state (JWT authenticated) and navigate
        // error -> error msg
        try {
            const response = await trackApi.post('/signin', { email, password})
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: 'sigin', payload: response.data.token });
            navigate('TrackList');
        } catch(err) {
            dispatch({ type: 'add_error', payload: 'Something went wrong with sign in'});
        }
    };
}

const signout = (dispatch) => {
    return async () => {
        // make Sign out Request
        // success -> modify state (remove JWT) - navigate to auth flow
        // error -> error msg
        await AsyncStorage.removeItem('token', (err) => { console.log(err)});
        dispatch({ type: 'signout' });
        navigate('loginFlow')
    };
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup, clearErrorMessage, tryLocalSignin },
    { token: '', errorMessage: '' }
)