import { useEffect, useState, useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import trackApi from '../api/tracker';
import { AsyncStorage } from 'react-native'

export default () => {
    const [ companies, setCompanies ] = useState([]);
    const { errorHandle } = useContext(AuthContext);

    const getCompanies = async() => {
        try {
            const token = await AsyncStorage.getItem('token');
            if(token) {
                const response = await trackApi.get('company',{
                    headers: {
                        'Authorization': 'Bearer '+ token
                    }
                })
                setCompanies(response.data.response.data);
            }
        } catch(err) {
            errorHandle()
        }
    }

    useEffect(() => {
        getCompanies()
    }, []);

    return [getCompanies, companies]
};