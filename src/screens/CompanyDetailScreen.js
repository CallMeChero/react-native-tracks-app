import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import useReports from '../hooks/useReports';
import HeaderDatePicker from '../components/HeaderDatePicker';
import ReportCard from '../components/ReportCard';

const CompanyDetailScreen = ({navigation}) => {
    const companyId = navigation.getParam('id');
    const [ getReports, reports] = useReports();

    useEffect(() => {
        getReports(companyId, new Date());
        const listener = navigation.addListener('didFocus', () => {
            getReports(companyId, new Date());
        });
        console.log('reports',reports)
        return () => {
            listener.remove();
        }
    }, []);

    return (
        <View style={{flex: 10}}>
            <HeaderDatePicker onChangeDate={dateString => {console.log('opalio req');getReports(companyId, dateString)}}/>
            <ReportCard 
                cardHeader="Ulazna sredstva"
                cardBody={reports.payInSummary}
            />
            <ReportCard 
                cardHeader="Izlazna sredstva"
                cardBody={reports.payoutSummary}
            />
        </View>
    );
};

CompanyDetailScreen.navigationOptions = ({ navigation}) => {
    return {
        headerStyle: { 
            backgroundColor: '#56D0CB', 
            borderBottomWidth: 0, 
            shadowColor: 'transparent'
        },
        headerTitleStyle: { 
            color: 'white',
            fontWeight: 'bold'
         },
        title: 'Radna ploča',
        headerRight: () =>
            <Text style={{ marginRight: 10, color: 'white' }}>
                {navigation.getParam('name')}
            </Text> 
    }
}

export default CompanyDetailScreen;