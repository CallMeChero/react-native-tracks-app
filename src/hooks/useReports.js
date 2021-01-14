import { useState, useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import trackApi from '../api/tracker';
import { AsyncStorage } from 'react-native';

export default () => {
    const [ reports, setReports ] = useState([]);
    const { errorHandle } = useContext(AuthContext);

    const getReports = async(firmId, date) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if(token) {
                const response = await trackApi.get('getDashboard',{
                    params: {
                      firmId,
                      date: date
                    },
                    headers: {
                        'Authorization': 'Bearer '+ token
                    }
                })
                setReports(response.data);
            }
        } catch(err) {
            errorHandle()
        }
    }
    
    return [ getReports, reports ]
};