import { useState, useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import trackApi from '../api/tracker';
import { AsyncStorage } from 'react-native';

export default () => {
    const [ reports, setReports ] = useState([]);
    const { errorHandle } = useContext(AuthContext);

    const getReports = async(firmId, date) => {
        console.log(date)
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
                console.log(response)
                setReports(response.data);
            }
        } catch(err) {
            if(err.message.indexOf('404' > -1)) {
                setReports([]);
            } else {
                errorHandle()
            }
        }
    }
    
    return [ getReports, reports ]
};