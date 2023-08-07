import { useTheme } from "@react-navigation/native";
import { Pressable, View, Text, Button, StyleSheet } from "react-native"
import useGlobalStyles, { MyTheme } from "../../useGlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from '@expo/vector-icons';
import { Submission } from "./SubmissionsView";
interface SubmitScreenProps {
    submissionId: String;
    title: String;
    instructions: String;

}

const SubmitBoxButton = () => {

    return (
        <Pressable>

            <View style={styles.submitBoxContainer}>
                <FontAwesome name="upload" size={30} color="#585858" />
                <Text>Tap to upload</Text>
            </View>
        </Pressable>
    )
}


const Submit = (props: Submission) => {


    const globalStyles = useGlobalStyles()
    const OnPressSubmit = () => {

    }

    return (
        <SafeAreaView style={styles.screen}>

            <Text style={globalStyles.SubHeading}>
                English Language Essay 2
                {/* {props.title} */}
            </Text>
            <Text style={styles.dueText}>
                Due Date: Friday 24th March 2023 10:00 am
                {/* {props.title} */}
            </Text>

            <SubmitBoxButton />

            <Text style={globalStyles.SubHeading}>Submission Instructions</Text>
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

    submitBoxContainer: {
        borderWidth: 0.5,
        borderRadius: 10,
        height: 145,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    }

})