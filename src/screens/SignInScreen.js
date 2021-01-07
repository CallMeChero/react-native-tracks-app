import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignInScreen = ({ navigation }) => {
    const { state, signin, clearErrorMessage } = useContext(AuthContext)

    return <View style={styles.container}>
        <NavigationEvents 
            onWillFocus={() => { clearErrorMessage() }}
            // onDidFocus={() => {}}
            // onWillBlur={() => {}}
            // onDidBlur={() => {}} - kinda buggy
        />
        <AuthForm 
            headerText="Sign In for Tracker"
            errorMessage={state.errorMessage}
            submitText="Sign In"
            onSubmit={({email, password}) => signin({email, password})}
        />
        <NavLink 
            linkText="Don't have an account? Go to Sign Up"
            routeName="SignUp"
        />
    </View>;
}

SignInScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        marginBottom: 250
    }
});
export default SignInScreen;