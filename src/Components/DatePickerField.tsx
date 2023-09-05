import React, { useState } from 'react';
import { View, Text, Platform,StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Entypo } from '@expo/vector-icons';
import {formatDateToDDMMYY } from '../Utils';

const CalendarIcon = <Entypo name="calendar" size={24} color="gray" />
type DatePickerProps = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};

const DatePickerField = ({ date, setDate }: DatePickerProps) => {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={showDatepicker}>
      <Text>{formatDateToDDMMYY(date)}</Text>
      {CalendarIcon}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </TouchableOpacity>
  );
};
export default DatePickerField;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 0.5,
        gap: 5,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        borderRadius: 2
    }

});