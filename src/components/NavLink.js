import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import Spacer from './Spacer';
import { withNavigation } from 'react-navigation';

const NavLink = ({ navigation, linkText, routeName }) => {
    return (
        <View style={styles.navLinkContainer}>
            <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
                <Spacer>
                        <Text style={styles.link}>
                            { linkText }
                        </Text>
                </Spacer>
            </TouchableOpacity>
        </View>
    ); 
};

const styles = StyleSheet.create({
    navLinkContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    link: {
        color: 'white',
        width: '100%'
    }
});

export default withNavigation(NavLink);