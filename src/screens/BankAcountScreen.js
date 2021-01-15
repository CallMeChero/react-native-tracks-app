import React, { useEffect } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import useBankAccounts from '../hooks/useBankAccounts';
import { MaterialIcons } from '@expo/vector-icons';
import NumberFormat from 'react-number-format';

const BankAccountScreen = ({navigation}) => {
    const companyId = navigation.getParam('firmId');
    const creditDebitIndicator = navigation.getParam('creditDebitIndicator');
    const date = navigation.getParam('date');
    const [ getBankAccounts, accounts ] = useBankAccounts();

    useEffect(() => {
        getBankAccounts(companyId, new Date(), creditDebitIndicator);
    }, []);

    return (
        <FlatList
            data={accounts.banks}
            keyExtractor={(result) => result.id.toString()}
            renderItem={({item: instance}) => {
                return (
                    instance.bankAccounts.length ? 
                    <FlatList 
                        data={instance.bankAccounts}
                        keyExtractor={(res) => res.id.toString()}
                        renderItem={({item}) => {
                            console.log('item',item)
                            return (
                                <View style={ styles.cardContainer }>
                                    <View style={ styles.cardHeader }>
                                        <View style={ styles.textHeader }>
                                            <Text style={{ color:'black', fontSize: 16}}>{instance.bank}</Text>
                                            <TouchableOpacity>
                                                <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.ibanContainer}>
                                            <Text style={{ color: 'gray', fontSize: 16 }}>
                                                {item.iban}
                                            </Text>
                                        </View>
                                        <View style={styles.totalAmount}>
                                            <NumberFormat
                                                value={item.hrk}
                                                displayType={'text'}
                                                thousandSeparator={'.'}
                                                decimalSeparator={','}
                                                decimalScale={2}
                                                suffix={' HRK'}
                                                renderText={value => <Text style={{ fontSize: 20 }}>{value}</Text>}
                                            />
                                        </View>
                                    </View>
                                </View>
                            );
                        }}
                    />
                    : null
                );
            }}
        />
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
        headerTitle: titleName
    }
};

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 15,
        padding: 10,
        marginTop: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'lightgray'
    },
    cardHeader: {
        height: 85
    },
    totalAmount: {
        padding: 10,
        paddingHorizontal: 15,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    ibanContainer: {
        paddingHorizontal: 10,
        marginTop: 5
    },
    textHeader: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

export default BankAccountScreen;