
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import useGlobalStyles, { MyTheme } from '../../useGlobalStyles';

import { differenceInDays, differenceInHours } from 'date-fns';
import { useNavigation, } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation/StudentNavigator';


function getTimeLeft(submissionDate) {
  const now = new Date();
  const deadline = new Date(submissionDate);

  const totalHoursLeft = differenceInHours(deadline, now);
  const daysLeft = differenceInDays(deadline, now);
  const hoursLeft = totalHoursLeft % 24;

  return `${daysLeft} days ${hoursLeft} hours left`;
}

export interface Submission {
    submissionId: String,
    submissionTitle: String,
    submissionDueDate: String,
    submissionInstructions:String,
    isSubmitted: boolean
}

const submissions: Submission[] = [
    {
        submissionId: '1',
        submissionTitle: 'English Language Essay 1',
        submissionDueDate: '2023-03-24T10:00:00Z',
        submissionInstructions: "",
        isSubmitted: false,
    },
    {
        submissionId: '2',
        submissionTitle: 'Math Assignment 1',
        submissionDueDate: '2023-03-25T10:00:00Z',
        submissionInstructions: "",
        isSubmitted: true,
    },
    {
        submissionId: '3',
        submissionTitle: 'History Report 1',
        submissionDueDate: '2023-03-26T10:00:00Z',
        submissionInstructions: "",
        isSubmitted: false,
    },
    // Add more submissions as needed
];

const SubmissionButton = ({ submission, onPress}: { submission: Submission , onPress: () => void }) => {

    return (
        <TouchableOpacity onPress={onPress} style = { styles.SubmissionButtonContainer}>
       
                <Text style = {[styles.buttonText, styles.buttonTextTitle]}>
                    {submission.submissionTitle}
                </Text>

                <Text style = {styles.buttonText}>
                    {submission.submissionDueDate}
                </Text>

                <Text style = {[styles.buttonText,styles.buttonTextRemainingTime]}>
                {getTimeLeft(submission.submissionDueDate)}

                </Text>
                <Ionicons style = {styles.arrowIcon} name="chevron-forward" size={24} color="white" />
      

        </TouchableOpacity>

    )
}


const SubmissionsSubView = () => {

    const [waitingSubmissions, setWaitingSubmissions] = useState()
    const [previousSubmissions, setPreviousSubmissions] = useState()

    const globalStyles = useGlobalStyles()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()


    const onPressSubmission = () => {
        navigation.push('Submit', {...submissions[0]})
    }

    return (
        <View style={styles.SubViewContainer}>
            <Text style={[globalStyles.SubHeading, styles.SubHeading]}>
                Waiting on 3 submissions
            </Text>
            <View style = {styles.SubmissionsList}>
            {submissions.map((item, index) =>
                <SubmissionButton key={index} submission={item} onPress={onPressSubmission} />)

            }
            </View>

        </View>
    )
}
export default SubmissionsSubView

const styles = StyleSheet.create({

    SubViewContainer: {
        padding: 10,
        marginTop: 10
    },
    SubmissionsList: {
        gap: 10,
        
    },
    arrowIcon: {
        position: 'absolute',
        top:'50%',
        right: 10,
        transform: [{ translateY: -2 }],
    },
    SubHeading: {
        marginBottom: 10
    },

    SubmissionButtonContainer: {
        borderRadius: 7,
        backgroundColor: MyTheme.colors.primary,
        padding: 10
    },
    buttonText: {
        color: 'white',
    },
    buttonTextTitle: {
        fontWeight:'bold'
    },
    buttonTextRemainingTime: {
        fontWeight: 'bold'
    }

})