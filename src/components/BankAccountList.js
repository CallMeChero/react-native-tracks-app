import React from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import NumberFormat from 'react-number-format';

const BankAccountList = ({ navigation, instance }) => {
    return (
        <FlatList 
            data={instance.bankAccounts}
            keyExtractor={(res) => res.id.toString()}
            renderItem={({item}) => {
                return (
                    <TouchableOpacity onPress={() => item.hrk !== 0 ? navigation.navigate('BankAccountDetail', { bankName: instance.bank, bankAccountId: item.id, date: navigation.getParam('date'), summaryType: navigation.getParam('creditDebitIndicator') }) : null}>
                        <View style={ styles.cardContainer }>
                            <View style={ styles.cardHeader }>
                                <View style={ styles.textHeader }>
                                    <Text style={{ color:'black', fontSize: 16, fontWeight:'bold' }}>{instance.bank}</Text>
                                    <MaterialIcons name="arrow-forward-ios" size={20} color={item.hrk !== 0 ? 'black' : 'white'} />
                                </View>
                                <View style={styles.ibanContainer}>
                                    <Text style={{ color: 'gray', fontSize: 16 }}>
                                        {item.iban}
                                    </Text>
                                </View>
                                <View style={styles.totalAmount}>
                                    {
                                        <NumberFormat
                                            value={item.hrk}
                                            displayType={'text'}
                                            thousandSeparator={'.'}
                                            decimalSeparator={','}
                                            decimalScale={2}
                                            suffix={' HRK'}
                                            renderText={value => <Text style={{ fontSize: 20, fontWeight:'bold' }}>{value !== 0 ? value : '0,00 HRK'}</Text>}
                                        /> 
                                    }
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            }}
        />
    );
}

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
        height: 80
    },
    totalAmount: {
        padding: 5,
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
});

export default BankAccountList;