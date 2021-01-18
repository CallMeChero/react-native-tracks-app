import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

const SearchBar = ({term, onTermChange, onTermSubmit}) => {
    return (
        <View style={ styles.backgroundStyle }>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputStyle}
                placeholder="Search"
                value={term}
                onChangeText={newText => onTermChange(newText)}
                onEndEditing={() => onTermSubmit()}
            />
        </View>
    ); 
};

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginBottom: 10
    },
    inputStyle: {
        flex: 1,
        fontSize: 18
    }
});

export default SearchBar;