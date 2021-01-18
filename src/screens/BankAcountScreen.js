import React, { useEffect } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import useBankAccounts from '../hooks/useBankAccounts';
import { MaterialIcons } from '@expo/vector-icons';
import NumberFormat from 'react-number-format';
import BankAccountList from '../components/BankAccountList';

const BankAccountScreen = ({navigation}) => {
    const companyId = navigation.getParam('firmId');
    const creditDebitIndicator = navigation.getParam('creditDebitIndicator');
    const date = navigation.getParam('date');
    const [ getBankAccounts, accounts ] = useBankAccounts();

    useEffect(() => {
        getBankAccounts(companyId, date, creditDebitIndicator);
    }, []);

    return (
        <View style={{flex: 1}}>
            <FlatList
                data={accounts.banks}
                keyExtractor={(result) => result.id.toString()}
                renderItem={({item: instance}) => {
                    return (
                        instance.bankAccounts.length ? 
                            <BankAccountList navigation={navigation} instance={instance}/>
                        : null
                    );
                }}
            />
            <View style={styles.footer}>
                <Text style={{ fontSize: 20, color: 'white' }}>
                    UKUPNO:
                </Text>
                <NumberFormat
                    value={accounts.hrk}
                    displayType={'text'}
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    decimalScale={2}
                    suffix={' HRK'}
                    renderText={value => <Text style={{ fontSize: 20, color: 'white' }}>{value}</Text>}
                /> 
            </View>
        </View>
    );
};

BankAccountScreen.navigationOptions = ({navigation}) => {
    const titleName = navigation.getParam('creditDebitIndicator') === 'PayIn' ? 'Ulazna sredstva' : 'Izlazna sredstva'
    return {
        headerStyle: { 
            backgroundColor: '#56D0CB', 
            borderBottomWidth: 0, 
            shadowColor: 'transparent'
        },
        headerTitleStyle: { color: 'white' },
        headerTitle: titleName,
        headerRight: () =>
            <TouchableOpacity>
                <Text style={{ marginRight: 10 }}>
                    <MaterialIcons name="search" size={28} color="white" />
                </Text> 
            </TouchableOpacity>
            
    }
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#55CECA'
    }
})

export default BankAccountScreen;