import { useState, useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import trackApi from '../api/tracker';
import { AsyncStorage } from 'react-native';

export default () => {
    const [ accounts, setBankAccounts ] = useState([]);
    const { errorHandle } = useContext(AuthContext);

    const getBankAccounts = async(firmId, date, creditDebitIndicator, bankSearchName) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if(token) {
                const response = await trackApi.get('getBanksAccountsDetails',{
                    params: {
                      firmId,
                      date,
                      creditDebitIndicator,
                      bankSearchName
                    },
                    headers: {
                        'Authorization': 'Bearer '+ token
                    }
                })
                setBankAccounts(response.data);
            }
        } catch(err) {
            console.log('err', err)
            // errorHandle()
        }
    }
    
    return [ getBankAccounts, accounts ]
};