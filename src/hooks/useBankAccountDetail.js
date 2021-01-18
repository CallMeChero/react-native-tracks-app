import { useState, useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import trackApi from '../api/tracker';
import { AsyncStorage } from 'react-native';

export default () => {
    const [ account, setBankAccount ] = useState(null);
    const { errorHandle } = useContext(AuthContext);

    const getBankAccountDetail = async(bankAccountId, date, summaryType) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if(token) {
                const response = await trackApi.get('getAccountDetails',{
                    params: {
                      bankAccountId,
                      date,
                      summaryType
                    },
                    headers: {
                        'Authorization': 'Bearer '+ token
                    }
                });
                setBankAccount(response.data);
            }
        } catch(err) {
            errorHandle()
        }
    }
    
    return [ getBankAccountDetail, account ]
};