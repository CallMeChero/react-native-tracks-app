import React, { useEffect, useState }  from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import useBankAccountDetail from '../hooks/useBankAccountDetail';
import { Entypo } from '@expo/vector-icons';
import BankAccount from '../components/BankAccount';
import ExportModal from '../components/ExportModal';
import { ModalService } from '../helpers/modalSubject';

const BankAccountDetailScreen = ({ navigation }) => {
    const bankAccountId = navigation.getParam('bankAccountId')
    const date = navigation.getParam('date');
    const summaryType = navigation.getParam('summaryType');
    const bankName = navigation.getParam('bankName');
    const companyId = navigation.getParam('companyId');
    const [ getBankAccountDetail, account ] = useBankAccountDetail();
    const openModal = () => ModalService.openModal(true)

    useEffect(() => {
        getBankAccountDetail(bankAccountId, date, summaryType);
        navigation.setParams({ openModal: openModal });
    }, []);

    return (
        <View style={ styles.cardContainer }>
            {
                account &&
                <>
                    <BankAccount account={account} bankName={bankName}/>
                    <ExportModal companyId={companyId} summaryType={summaryType} date={date}/>
                </>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 15,
        padding: 10,
        marginTop: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'lightgray'
    }
});

BankAccountDetailScreen.navigationOptions = ({ navigation}) => {
    return {
        headerStyle: {
            backgroundColor: '#56D0CB',
            borderBottomWidth: 0,
            shadowColor: 'transparent',
        },
        headerTitleStyle: {
            color: 'white'
         },
        title: navigation.getParam('bankName'),
        headerRight: () =>
        <TouchableOpacity onPress={() => navigation.state.params.openModal()}>
            <Entypo name="share" style={{ marginRight: 10 }} size={28} color="white" />
        </TouchableOpacity>
    }
}

export default BankAccountDetailScreen;