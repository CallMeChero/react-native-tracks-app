import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NumberFormat from 'react-number-format';

const BankAccount = ({ bankName, account }) => {
    return (
        <>
        <View style={ styles.textHeader }>
            <Text style={{ color:'black', fontSize: 16}}>
                {bankName}
            </Text>
        </View>
        <View style={styles.ibanContainer}>
            <Text style={{ color: 'gray' }}>
                {account.account.iban}
            </Text>
        </View>
        <View style={styles.totalAmount}>
                { account.payInSummary ? 
                    <NumberFormat
                        value={account.payInSummary.totalSum}
                        displayType={'text'}
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        decimalScale={2}
                        suffix={' HRK'}
                        renderText={value => <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{value !== 0 ? value : '0,00 HRK'}</Text>}
                    /> 
                : 
                    <NumberFormat
                        value={account.payOutSummary.totalSum}
                        displayType={'text'}
                        thousandSeparator={'.'}
                        decimalSeparator={','}
                        decimalScale={2}
                        suffix={' HRK'}
                        renderText={value => <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{value !== 0 ? value : '0,00 HRK'}</Text>}
                    /> 
                }
        </View>
        <View style={styles.cardBody}>
            <View style={styles.cardBodyRow}>
                <Text style={ styles.cardBodyText }>Vlastita sredstva HRK</Text>
                <Text style={ styles.cardBodyText }>
                    { account.payInSummary  ? 
                        <NumberFormat
                            value={account.payInSummary.hrkSum}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            decimalScale={2}
                            suffix={' HRK'}
                            renderText={value => <Text style={{ fontWeight: 'bold' }}>{value !== 0 ? value : '0,00 HRK'}</Text>}
                        />
                        :
                        <NumberFormat
                            value={account.payOutSummary.hrkSum}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            decimalScale={2}
                            suffix={' HRK'}
                            renderText={value => <Text style={{ fontWeight: 'bold' }}>{value !== 0 ? value : '0,00 HRK'}</Text>}
                        />
                    }
                </Text>
            </View>
            <View style={styles.cardBodyRow}>
                <Text style={ styles.cardBodyText }>Vlastita sredstva EUR</Text>
                <Text style={ styles.cardBodyText }>
                    { account.payInSummary ? 
                        <NumberFormat
                            value={account.payInSummary.eurSum}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            decimalScale={2}
                            suffix={' HRK'}
                            renderText={value => <Text style={{ fontWeight: 'bold' }}>{value !== 0 ? value : '0,00 HRK'}</Text>}
                        />
                        :
                        <NumberFormat
                            value={account.payOutSummary.hrkSum}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            decimalScale={2}
                            suffix={' HRK'}
                            renderText={value => <Text style={{ fontWeight: 'bold' }}>{value !== 0 ? value : '0,00 HRK'}</Text>}
                        />
                    }
                </Text>
            </View>
            <View style={styles.cardBodyRow}>
                <Text style={ styles.cardBodyText }>Vlastita sredstva USD</Text>
                <Text style={ styles.cardBodyText }>
                    { account.payInSummary  ? 
                        <NumberFormat
                            value={account.payInSummary.usdSum}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            decimalScale={2}
                            suffix={' HRK'}
                            renderText={value => <Text style={{ fontWeight: 'bold' }}>{value !== 0 ? value : '0,00 HRK'}</Text>}
                        />
                        :
                        <NumberFormat
                            value={account.payOutSummary.hrkSum}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            decimalScale={2}
                            suffix={' HRK'}
                            renderText={value => <Text style={{ fontWeight: 'bold' }}>{value !== 0 ? value : '0,00 HRK'}</Text>}
                        />
                    }
                </Text>
            </View>
            <View style={styles.cardBodyRow}>
                <Text style={ styles.cardBodyText }>Vlastita sredstva GBP</Text>
                <Text style={ styles.cardBodyText }>
                    { account.payInSummary ? 
                        <NumberFormat
                            value={account.payInSummary.gbpSum}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            decimalScale={2}
                            suffix={' HRK'}
                            renderText={value => <Text style={{ fontWeight: 'bold' }}>{value !== 0 ? value : '0,00 HRK'}</Text>}
                        />
                        :
                        <NumberFormat
                            value={account.payOutSummary.hrkSum}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            decimalScale={2}
                            suffix={' HRK'}
                            renderText={value => <Text style={{ fontWeight: 'bold' }}>{value !== 0 ? value : '0,00 HRK'}</Text>}
                        />
                        }
                </Text>
            </View>
        </View>
        </>
    );
};

const styles = StyleSheet.create({
    totalAmount: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    ibanContainer: {
        paddingHorizontal: 10,
        marginTop: 5
    },
    textHeader: {
        paddingHorizontal: 10,
    },
    cardBody: {
        padding: 10
    },
    cardBodyRow: {
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardBodyText: {
        fontSize: 16
    }
});

export default BankAccount;