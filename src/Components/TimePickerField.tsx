import React, { useState } from 'react';
import { TouchableOpacity, Text, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Entypo } from '@expo/vector-icons';

const ClockIcon = <Entypo name="clock" size={24} color="gray" />;

const formatTimeToHHMM = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

type TimePickerProps = {
    date: Date;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
  };
  
  const TimePickerField: React.FC<TimePickerProps> = ({ date, setDate }) => {
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedTime) => {
      const currentTime = selectedTime || date;
      setShow(Platform.OS === 'ios');
      setDate(new Date(date.setHours(currentTime.getHours(), currentTime.getMinutes())));
    };
  
    const showTimepicker = () => {
      setShow(true);
    };
  
    return (
      <TouchableOpacity style={styles.container} onPress={showTimepicker}>
        <Text>{formatTimeToHHMM(date)}</Text>
        {ClockIcon}
        {show && (
          <DateTimePicker
            testID="timePicker"
            value={date}
            mode="time"
            display="default"
            onChange={onChange}
          />
        )}
      </TouchableOpacity>
    );
  };
 
  
export default TimePickerField;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 0.5,
    gap: 5,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    borderRadius: 2,
  },
});
