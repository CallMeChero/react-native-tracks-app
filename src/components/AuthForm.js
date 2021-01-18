import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import Spacer from '../components/Spacer';

const AuthForm = ({ headerText, errorMessage, onSubmit, submitText }) => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ textSecure, setTextSecure ] = useState(true);
    const [ passwordIcon, setPasswordIcon ] = useState('eye');

    const unsecureTextEntry = () => {
        if(textSecure) {
            setTextSecure(false);
            setPasswordIcon('eye-slash');
        } else {
            setTextSecure(true);
            setPasswordIcon('eye');
        }
    }

    return (
        <>
            <Spacer>
            <View style={ styles.headerContainer }>
                <Text h1 style={{ color: 'white' }}>Dobrodošli</Text>
                <Text h3 style={{ color: 'white' }}>{headerText}</Text>
            </View>
            </Spacer>
            <View style={ styles.inputContainer }>
                <Input 
                    inputStyle={{ color: 'white' }}
                    inputContainerStyle={{ color: 'white', borderColor: errorMessage ? 'crimson': 'white' }}
                    labelStyle={{ color: errorMessage ? 'crimson': 'white' }}
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
            </View>
            <Spacer />
            <View style={ styles.inputContainer }>
                <Input
                    inputStyle={{ color: 'white' }}
                    inputContainerStyle={{ color: 'white', borderColor: errorMessage ? 'crimson': 'white' }}
                    placeholderTextColor='white'
                    labelStyle={{ color: errorMessage ? 'crimson': 'white' }}
                    secureTextEntry={textSecure}
                    label="Lozinka" 
                    value={password} 
                    onChangeText={(newPassword) => setPassword(newPassword)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Unesite lozinku"
                    leftIcon={{ type: 'font-awesome', name: 'lock', color: 'white' }}
                    leftIconContainerStyle={{ marginRight: 10 }}
                    rightIcon={{ 
                        type: 'font-awesome', 
                        name: passwordIcon, 
                        color: 'white',
                        onPress: unsecureTextEntry
                    }}
                />
            </View>
            {errorMessage ? <Text style={styles.errorMessage}>{ errorMessage }</Text> : null}
            <Spacer>
                <Button 
                    buttonStyle={styles.buttonStyle}
                    titleStyle={styles.buttonTextStyle}
                    style={styles.buttonContainer} 
                    title={submitText} 
                    onPress={() => onSubmit({ email, password})}/>
            </Spacer>
        </>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        marginHorizontal: 15,
        marginBottom: 30
    },
    inputContainer: {
        marginHorizontal: 20
    },
    buttonStyle: {
        backgroundColor: 'white',
    },
    buttonTextStyle: {
        color: '#288AB5'
    },
    buttonContainer: {
        marginHorizontal: 15
    },
    errorMessage: {
        fontSize: 16,
        color: 'crimson',
        marginHorizontal: 30,
        marginVertical: 15
    }
});

export default AuthForm;