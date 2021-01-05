import createDataContext from './createDataContext';

const authReducer = (state,action) => {
    switch(action.type) {
        default: 
            return state;
    }
};

const signup = (dispatch) => {
    return ({ email, password }) => {
        // make Sign up Request

        // success -> modify state (JWT authenticated)

        // error -> error msg
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
    { isSignedIn: false }
)