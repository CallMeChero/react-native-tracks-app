import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackApi from '../api/tracker';
import { navigate } from '../helpers/navigationRef';
import qs from 'qs';

const authReducer = (state,action) => {
    switch(action.type) {
        case 'global_error':
            return { token: null, errorMessage: '', global_error: 'Trebate se ponovno prijaviti' };
        case 'add_error':
            return { ...state, errorMessage: action.payload, global_error: '' };
        case 'signin':
            return { token: action.payload, errorMessage: '', global_error: '' }
        case 'clear_error_message':
            return { ...state, errorMessage: '', global_error: '' }
        case 'signout': 
            return { token: null, errorMessage: '', global_error: '' }
        default: 
            return state;
    }
};

const tryLocalSignin = dispatch => {
    return async () => {
        const token = await AsyncStorage.getItem('token');
        if(token) {
            dispatch({ type: 'signin', payload: token});
            navigate('groupFlow');
        } else {
            navigate('loginFlow');
        }
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message'});
}

const errorHandle = (dispatch) => {
    return async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'global_error' });
        navigate('loginFlow')
    };
}

const signin = (dispatch) => {
    return async ({ email, password }) => {
        try {
            const response = await trackApi.post(
                'login', 
                qs.stringify({
                    userNameOrEmail: email, 
                    password: password 
                }),   
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );
            await AsyncStorage.setItem('token', response.data.access_token);
            dispatch({ type: 'sigin', payload: response.data.access_token });
            navigate('groupFlow');
        } catch(err) {
            console.log(err)
            dispatch({ type: 'add_error', payload: 'Podaci nisu ispravni'});
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
    { signin, signout, clearErrorMessage, tryLocalSignin, errorHandle },
    { token: '', errorMessage: '' }
)