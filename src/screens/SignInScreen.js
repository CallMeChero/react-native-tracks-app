import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { LinearGradient } from 'expo-linear-gradient';

const SignInScreen = ({ navigation }) => {
    const { state, signin, clearErrorMessage } = useContext(AuthContext)

    return <LinearGradient
            colors={['#56D0CB', '#288AB5' ]}
            style={styles.container}>
        <View style={{marginBottom: 200}}>
        <NavigationEvents 
            onWillFocus={() => { clearErrorMessage() }}
            // onDidFocus={() => {}}
            // onWillBlur={() => {}}
            // onDidBlur={() => {}} - kinda buggy
        />
        <AuthForm
            headerText="Moneyview+"
            errorMessage={state.errorMessage}
            submitText="Prijavi se"
            onSubmit={({email, password}) => signin({email, password})}
        />
        <NavLink 
            linkText="Zaboravljena lozinka?"
            routeName="ResetPassword"
        />
        </View>
        </LinearGradient>;
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
    }
});
export default SignInScreen;