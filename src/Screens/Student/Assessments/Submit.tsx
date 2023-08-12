import { useTheme } from "@react-navigation/native";
import { Pressable, View, Text, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from '@expo/vector-icons';
import { Submission } from "./SubmissionsView";
import SubmitBoxButton from "../../../Components/SubmitBoxButton";
import { MyTheme, globalStaticStyles } from "../../../useGlobalStyles";

interface SubmitScreenProps {
    submissionId: String;
    title: String;
    instructions: String;

}

const Submit = (props: Submission) => {

    const OnPressSubmit = () => {

    }

    return (
        <SafeAreaView style={styles.screen}>

            <Text style={globalStaticStyles.SubHeading}>
                English Language Essay 2
                {/* {props.title} */}
            </Text>
            <Text style={styles.dueText}>
                Due Date: Friday 24th March 2023 10:00 am
                {/* {props.title} */}
            </Text>

            <SubmitBoxButton />

            <Text style={globalStaticStyles.SubHeading}>Submission Instructions</Text>
            <Text style={styles.instructionsText}>
                Please upload a PNG or pdf of your answers
                {/* {props.instructions} */}
            </Text>

            <Pressable onPress={OnPressSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
            </Pressable>

        </SafeAreaView>

    )

}

export default Submit

const styles = StyleSheet.create({
    screen: {
        padding: 15,
        gap: 20
    },
    submitButton: {
        backgroundColor: MyTheme.colors.secondary,
        alignItems: 'center',
        justifyContent:'center',
        height: 45,
        width: '60%',
        borderRadius: 10,
        alignSelf: 'center',
        elevation: 5
    },
    submitButtonText: {
        color: 'white'
    },
    dueText: {
        color: '#585858',
        fontSize: 13
    },
    instructionsText: {
        fontWeight: '300'
    },

})