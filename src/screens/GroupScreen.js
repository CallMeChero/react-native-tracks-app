import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import useCompanies from '../hooks/useCompanies';
import { Ionicons } from '@expo/vector-icons'; 

const GroupScreen = ({ navigation }) => {
    const [getCompanies, companies] = useCompanies();
    const [ selectedCompanies, selectCompany ] = useState([]);

    handleCompanySelection = (item) => {
        if(selectedCompanies.some(company => company.name === item.name)) {
            selectCompany(selectedCompanies.filter(x => x.id !== item.id));
        } else {
            selectCompany(oldArray => [...oldArray, item]);
        }
    }

    useEffect(() => {
        const listener = navigation.addListener('didFocus', () => {
            getCompanies();
        });

        navigation.setParams({ selectedCompanies });

        return () => {
            listener.remove();
        }
    }, [selectedCompanies])

    return (
        <View>
            <FlatList 
                style={{ marginTop: 5}}
                data={companies}
                keyExtractor={(result) => result.id.toString()}
                renderItem={({item}) => {
                    return (
                    <TouchableOpacity onPress={() => {
                        handleCompanySelection(item)
                    }}>
                        <View style={styles.companyContainerStyle}>
                            <Text style={styles.textStyle}>{item.name}</Text>
                            {  selectedCompanies.some(company => company.name === item.name) &&  <Ionicons name="checkmark-circle" size={24} color="#56D0CB" /> }
                        </View>
                    </TouchableOpacity>
                    );
                }}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    companyContainerStyle: {
        marginHorizontal: 20,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        flex: 1,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15
    },
    textStyle: {
        fontSize: 18,
    }
});

GroupScreen.navigationOptions = ({ navigation }) => {
    return {
        headerStyle: { 
            backgroundColor: '#56D0CB', 
            borderBottomWidth: 0, 
            shadowColor: 'transparent'
        },
        headerTitleStyle: { color: 'white' },
        title: 'Izabir firme',
        headerRight: () =>
            <TouchableOpacity
              onPress={() => console.log(navigation.state.params.selectedCompanies)}>
                { navigation.state.params ? navigation.state.params.selectedCompanies.length ? <Text style={{marginRight: 10, color:'white'}}>
                    Potvrdi
                </Text> : null : null }
            </TouchableOpacity>
    }
}

export default GroupScreen;