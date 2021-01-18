import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import NumberFormat from 'react-number-format';

const ReportCard = ({ navProp, date, cardHeader, cardBody }) => {

    const navigateToBankAccount = () => {
        navProp.navigate('BankAccount', {
            firmId: navProp.state.params.id,
            creditDebitIndicator: cardHeader === 'Ulazna sredstva' ? 'PayIn' : 'PayOut',
            date
        })
    }

    return (
        <View>
            {
                cardBody &&
                <>
                <TouchableOpacity onPress={() => { cardBody ? navigateToBankAccount() : null }}>
                <View style={styles.cardHeader}>
                    <View style={styles.textHeader}>
                        <Text style={{ color:'white', fontSize: 24}}>{cardHeader}</Text>
                        <Text>
                            <MaterialIcons name="arrow-forward-ios" size={20} color="white" />
                        </Text>
                    </View>
                    <View style={styles.totalAmount}>
                        <NumberFormat
                            value={cardBody.totalSum}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            decimalScale={2}
                            suffix={' HRK'}
                            renderText={value => <Text style={{ color: 'white', fontSize: 24 }}>{value !== 0 ? value : '0,00 HRK'}</Text>}
                        />
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.cardBody}>
                <View style={styles.cardBodyRow}>
                    <Text style={ styles.cardBodyText }>Vlastita sredstva HRK</Text>
                    <Text style={ styles.cardBodyText }>
                        <NumberFormat
                            value={cardBody.hrkSum}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            decimalScale={2}
                            suffix={' HRK'}
                            renderText={value => <Text style={{ fontWeight: 'bold' }}>{value !== 0 ? value : '0,00 HRK'}</Text>}
                        />
                    </Text>
                </View>
                <View style={styles.cardBodyRow}>
                    <Text style={ styles.cardBodyText }>Vlastita sredstva EUR</Text>
                    <Text style={ styles.cardBodyText }>
                        <NumberFormat
                            value={cardBody.eurSum}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            decimalScale={2}
                            suffix={' HRK'}
                            renderText={value => <Text style={{ fontWeight: 'bold' }}>{value !== 0 ? value : '0,00 HRK'}</Text>}
                        />
                    </Text>
                </View>
                <View style={styles.cardBodyRow}>
                    <Text style={ styles.cardBodyText }>Vlastita sredstva USD</Text>
                    <Text style={ styles.cardBodyText }>
                        <NumberFormat
                            value={cardBody.usdSum}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            decimalScale={2}
                            suffix={' HRK'}
                            renderText={value => <Text style={{ fontWeight: 'bold' }}>{value !== 0 ? value : '0,00 HRK'}</Text>}
                        />
                    </Text>
                </View>
                <View style={styles.cardBodyRow}>
                    <Text style={ styles.cardBodyText }>Vlastita sredstva GBP</Text>
                    <Text style={ styles.cardBodyText }>
                        <NumberFormat
                            value={cardBody.gbpSum}
                            displayType={'text'}
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            decimalScale={2}
                            suffix={' HRK'}
                            renderText={value => <Text style={{ fontWeight: 'bold' }}>{value !== 0 ? value : '0,00 HRK'}</Text>}
                        /> 
                    </Text>
                </View>
            </View>
            </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    cardHeader: {
        backgroundColor: '#55CECA',
        color: '#55CECA',
        marginHorizontal: 15,
        padding: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        height: 100
    },
    totalAmount: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    textHeader: {
        paddingHorizontal: 10,
        fontSize: 24,
        color: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cardBody: {
        borderWidth: 0.5,
        borderColor:'lightgray',
        borderTopColor: 'white',
        display: 'flex',
        marginHorizontal: 15,
        justifyContent: 'space-between',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        marginBottom: 20
    },
    cardBodyRow: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardBodyText: {
        fontSize: 16
    }
})

export default ReportCard;