import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import useCompanies from '../hooks/useCompanies';
import { Ionicons } from '@expo/vector-icons'; 

const CompanyScreen = ({ navigation }) => {
    const [ getCompanies, companies ] = useCompanies();
    const [ selectedCompany, setSelectedCompany ] = useState(null);

    handleCompanySelection = (item) => {
        if(selectedCompany && selectedCompany.name === item.name) {
            setSelectedCompany(null);
        } else {
            setSelectedCompany(item);
        }
    }

    useEffect(() => {
        const listener = navigation.addListener('didFocus', () => {
            getCompanies();
        });
        navigation.setParams({ selectedCompany });
        return () => {
            listener.remove();
        }
    }, [selectedCompany])

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
                            {  selectedCompany ? selectedCompany.name === item.name ? <Ionicons name="checkmark-circle" size={20} color="#56D0CB" /> : null : null }
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
    },
    acceptText: {
        fontWeight: 'bold',
        fontSize: 14,
        marginRight: 10,
        color:'white'
    }
});

CompanyScreen.navigationOptions = ({ navigation }) => {
    return {
        headerStyle: { 
            backgroundColor: '#56D0CB', 
            borderBottomWidth: 0, 
            shadowColor: 'transparent'
        },
        headerTitleStyle: { 
            color: 'white'
         },
        title: 'Izabir firme',
        headerRight: () =>
            <TouchableOpacity
              onPress={() => navigateToDetail(navigation, navigation.state.params.selectedCompany) }>
                { navigation.state.params ? navigation.state.params.selectedCompany ? <Text style={styles.acceptText}>
                    Potvrdi
                </Text> : null : null }
            </TouchableOpacity>
    }
}

const navigateToDetail = (navigation, params) => {
    if(params) {
        navigation.navigate('CompanyDetail', { id: params.id, name: params.name })
    }
}

export default CompanyScreen;