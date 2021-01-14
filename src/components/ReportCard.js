import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import NumberFormat from 'react-number-format';

const ReportCard = ({ cardHeader, cardBody }) => {
    console.log(cardHeader,cardBody)
    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
                <View style={styles.textHeader}>
                    <Text style={{ color:'white', fontSize: 24}}>{cardHeader}</Text>
                    <TouchableOpacity>
                        <MaterialIcons name="arrow-forward-ios" size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.totalAmount}>
                    <Text>
                        { cardBody ? 
                            <NumberFormat 
                                value={cardBody.totalSum.toFixed(2)}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={' HRK'} 
                                renderText={value => <Text style={{ color: 'white', fontSize: 24 }}>{value}</Text>} 
                            />
                        : 
                        <Text style={{ color: 'white', fontSize: 24 }}>
                        0,00 HRK
                        </Text>
                        }
                        {/* { cardBody ? cardBody.totalSum.toFixed(2).replace('.', ',') + ' HRK' : '0,00 HRK' } */}
                    </Text>
                </View>
            </View>
            <View style={styles.cardBody}>
                <View style={styles.cardBodyRow}>
                    <Text style={ styles.cardBodyText }>Vlastita sredstva HRK</Text>
                    <Text style={ styles.cardBodyText }>{ cardBody ? cardBody.hrkSum.toFixed(2).replace('.', ',') + ' HRK' : '0,00 HRK' }</Text>
                </View>
                <View style={styles.cardBodyRow}>
                    <Text style={ styles.cardBodyText }>Vlastita sredstva EUR</Text>
                    <Text style={ styles.cardBodyText }>{ cardBody ? cardBody.eurSum.toFixed(2).replace('.', ',') + ' HRK' : '0,00 HRK' }</Text>
                </View>
                <View style={styles.cardBodyRow}>
                    <Text style={ styles.cardBodyText }>Vlastita sredstva USD</Text>
                    <Text style={ styles.cardBodyText }>{ cardBody ? cardBody.usdSum.toFixed(2).replace('.', ',') + ' HRK' : '0,00 HRK' }</Text>
                </View>
                <View style={styles.cardBodyRow}>
                    <Text style={ styles.cardBodyText }>Vlastita sredstva GBP</Text>
                    <Text style={ styles.cardBodyText }>{ cardBody ? cardBody.gbpSum.toFixed(2).replace('.', ',') + ' HRK' : '0,00 HRK' }</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        // height: 175
    },
    cardHeader: {
        backgroundColor: '#55CECA',
        color: '#55CECA',
        marginHorizontal: 15,
        padding: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        height: 95
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
        borderColor:'gray',
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