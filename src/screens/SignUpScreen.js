import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignUpScreen = ({navigation}) => {

    const { state, signup, clearErrorMessage } = useContext(AuthContext);

    return <View style={styles.container}>
        <NavigationEvents 
            onWillFocus={() => { clearErrorMessage() }}
            // onDidFocus={() => {}}
            // onWillBlur={() => {}}
            // onDidBlur={() => {}} - kinda buggy
        />
        <AuthForm 
            headerText="Sign Up for Tracker"
            errorMessage={state.errorMessage}
            submitText="Sign Up"
            onSubmit={({email, password}) => signup({email, password})}
        />
        <NavLink 
            linkText="Already have an account? Go to Sign In"
            routeName="SignIn"
        />
    </View>;
}

SignUpScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}
//alternative
// SignUpScreen.navigationOptions = {
//     headerShown: false
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        marginBottom: 250
    }
});

export default SignUpScreen;