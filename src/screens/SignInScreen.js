import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignInScreen = ({ navigation }) => {
    const { state, signin } = useContext(AuthContext)

    return <View style={styles.container}>
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