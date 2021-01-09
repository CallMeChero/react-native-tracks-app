import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, Button, Input } from 'react-native-elements';

const ResetPasswordScreen = () => {
    const [ email, setEmail ] = useState('');

    return (
        <LinearGradient
            colors={['#56D0CB', '#288AB5']}
            style={styles.container}>
        <View style={ styles.inputContainer }>
                <Input 
                    inputStyle={{ color: 'white' }}
                    inputContainerStyle={{ color: 'white', borderColor: 'white' }}
                    labelStyle={{ color: 'white'}}
                    placeholderTextColor='white'
                    label="Korisničko ime" 
                    value={email} 
                    onChangeText={(newEmail) => setEmail(newEmail)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Korisničko ime"
                    leftIconContainerStyle={{ marginRight: 7 }}
                    leftIcon={{ type: 'font-awesome', name: 'user', color: 'white' }}
                />
                <Button 
                    buttonStyle={styles.buttonStyle}
                    titleStyle={styles.buttonTextStyle}
                    style={styles.buttonContainer} 
                    title="Resetiraj lozinku"
                    onPress={() => onSubmit({ email, password})}/>
        </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    inputContainer: {
        marginHorizontal: 20,
        marginBottom: 300
    },
    buttonStyle: {
        backgroundColor: 'white',
    },
    buttonTextStyle: {
        color: '#288AB5'
    },
    buttonContainer: {
        marginHorizontal: 10
    }
});

ResetPasswordScreen.navigationOptions = () => {
    return {
        headerStyle: { 
            backgroundColor: '#56D0CB', 
            borderBottomWidth: 0, 
            shadowColor: 'transparent'
        },
        headerTitleStyle: { color: 'white' },
        title: 'Zaboravljena lozinka'
    }
}


export default ResetPasswordScreen;