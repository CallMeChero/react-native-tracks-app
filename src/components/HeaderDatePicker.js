import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from 'date-fns';

const HeaderDatePicker = ({onChangeDate}) => {
  const [selectedDate, setSelectedDate]=useState(format(new Date(), 'dd.MM.yyyy'));
  const [dateString, setDateString]=useState(new Date);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    onChangeDate(date);
    setDateString(date);
    setSelectedDate(format(date, 'dd.MM.yyyy'));
    hideDatePicker();
  };

  return (
    <>
    <TouchableOpacity style={styles.dateContainer} onPress={showDatePicker}>
      <Text>Datum: </Text>
      <Text>{selectedDate}</Text>
    </TouchableOpacity>
    <DateTimePickerModal
      isVisible={isDatePickerVisible}
      mode="date"
      date={dateString}
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
    />
  </>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
      padding: 15,
      margin: 15,
      display:'flex',
      flexDirection:'row',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderRadius: 5,
      borderColor: 'lightgray'
  }
})

export default HeaderDatePicker;