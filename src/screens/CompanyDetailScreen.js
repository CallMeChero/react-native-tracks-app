import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import useReports from '../hooks/useReports';
import HeaderDatePicker from '../components/HeaderDatePicker';
import ReportCard from '../components/ReportCard';

const CompanyDetailScreen = ({navigation}) => {
    const companyId = navigation.getParam('id');
    const [ getReports, reports] = useReports();
    const [ date, setDate ] = useState(new Date());

    useEffect(() => {
        getReports(companyId, date);
        // const listener = navigation.addListener('didFocus', () => {
        //     getReports(companyId, date);
        // });
        // return () => {
        //     listener.remove();
        // }
    }, []);

    const handleDateChange = (dateString) => {
        setDate(dateString);
        getReports(companyId, dateString);
    }

    return (
        <View style={{flex: 1}}>
            <ScrollView>
                <View style={{flex: 10}}>
                    <HeaderDatePicker onChangeDate={ dateString => handleDateChange(dateString)}/>
                    <ReportCard
                        navProp={navigation}
                        cardHeader="Ulazna sredstva"
                        cardBody={reports.payInSummary}
                        date={date}
                    />
                    <ReportCard
                        navProp={navigation}
                        cardHeader="Izlazna sredstva"
                        cardBody={reports.payoutSummary}
                        date={date}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

CompanyDetailScreen.navigationOptions = ({ navigation}) => {
    return {
        headerStyle: { 
            backgroundColor: '#56D0CB', 
            borderBottomWidth: 0, 
            shadowColor: 'transparent',
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