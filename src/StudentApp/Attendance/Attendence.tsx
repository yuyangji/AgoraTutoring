import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import { useTheme } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from '@expo/vector-icons/Entypo';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import IconWrapper from './IconWrapper';

const calendarIcon = <Ionicons name="md-calendar-sharp" size={23} color='white' />
const locationIcon = <Ionicons name="ios-location-sharp" size={23} color='white' />
const crossIcon = <Entypo name="squared-cross" size={23} color="white" />
const checkIcon = <Ionicons name="ios-checkbox" size={23} color="white" />


const Attendance = () => {
    const [selected, setSelected] = useState('');

    return (
        <View style={styles.screen}>
            <Calendar
    
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedColor:'orange'}
      }}
    />
            <View style = {styles.informationSection}>
                <View style={styles.iconAndTextContainer}>
                    <IconWrapper backgroundColor='#2077D0'>
                        {calendarIcon}
                    </IconWrapper>
                    <View>
                        <Text style = {styles.calendarDateText}>July 18th, 2023</Text>
                        <Text>14:00 - 15:30</Text>
                    </View>
                </View>
                <View style={styles.iconAndTextContainer}>
                    <IconWrapper backgroundColor='#00AB07'>
                        {locationIcon}
                    </IconWrapper>
                    <View>
                        <Text>Location</Text>
                        <Text style = {styles.locationText}>zoom.com/?call=Harley</Text>
                    </View>
                </View>

                <Text style = {styles.didYouAttendText}>Did you attend this class?</Text>
                <View style = {{flexDirection:'row', gap: 20}}>
                    <TouchableOpacity style={[{backgroundColor:'#D21010'},styles.attendanceButton]}>
                    {crossIcon}
                    <Text style = {{color:'white', fontWeight:'bold', fontSize: 17}}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {{...styles.attendanceButton, backgroundColor: '#41CB10'}}>
                    {checkIcon}
                    <Text style = {{color:'white', fontWeight:'bold', fontSize: 17}}>Yes</Text>
                </TouchableOpacity>
                </View>
 
            </View>

        </View>
    )
}

export default Attendance


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection:'column'
    },
    iconAndTextContainer: {
        gap: 15,
        flexDirection: 'row'
    },
    informationSection: {
        padding: 15,
        gap: 20,
        borderRadius: 10,
        verticalAlign: 'bottom',
        backgroundColor:'white'
        
    },
    didYouAttendText: {
        fontSize: 16
    },
    calendarDateText: {
        color: '#333333'
    },
    calendarTimeText: {

    },
    locationText: {
        color: '#0055B8'
    },
    attendanceButton: {
        flexDirection: 'row',
        gap: 12,
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 17,
        alignItems: 'center'
    }



})