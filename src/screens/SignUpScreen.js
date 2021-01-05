import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const SignUpScreen = ({navigation}) => {

    const { state, signup } = useContext(AuthContext)
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    return <View style={styles.container}>
        <Spacer>
            <Text h3>
                Sign Up for Tracker
            </Text>
        </Spacer>
        <Input 
            label="Email" 
            value={email} 
            onChangeText={(newEmail) => setEmail(newEmail)}
            autoCapitalize="none"
            autoCorrect={false}
        />
        <Spacer />
        <Input
            secureTextEntry={true}
            label="Password" 
            value={password} 
            onChangeText={(newPassword) => setPassword(newPassword)}
            autoCapitalize="none"
            autoCorrect={false}
        />
        <Spacer>
            <Button title="Sign up" onPress={() => signup({ email, password})}/>
        </Spacer>
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