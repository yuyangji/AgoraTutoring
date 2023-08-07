
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    Keyboard,
    Image,
    ImageSourcePropType,
    ScrollView,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import React from "react";
import { useTheme } from "@react-navigation/native";
import AnnouncementCard from "../../Components/AnnouncementCard";
import useGlobalStyles, { MyTheme } from "../../useGlobalStyles";
import { useAppSelector } from "../../Redux/hooks";
import { selectUser } from "../../Redux/userSlice";


const ClassCard = ({title, content, destination, time }) => {

    return (
        <Pressable>
            <View style = {{...styles.ClassCardContainer, backgroundColor: '#FCA055'}}>
                <Text style = {{color: 'white', fontWeight:'bold'}}>{title}</Text>
                <Text style = {{color: 'white'}}>{content}</Text>
                <Text style = {{color: 'white'}}><Ionicons name="location-sharp" size={16} color="white" />  {destination}</Text>
                <Text style = {{color: 'white'}}><Ionicons name="md-time-sharp" size={16} color="white" />  {time}</Text>


            </View>
        </Pressable>
    )

}



const Home = () => {
    const globalStyles = useGlobalStyles()
    const user = useAppSelector((state) => state.user.user)

    return (
        <View>
            <View style = {{...styles.headerContainer, backgroundColor:MyTheme.colors.primary}}>
                <Text style = {styles.welcomeText}>
                    Hello, {user.firstName} {user.lastName}
                </Text>
                <Text style={styles.enrolmentStatus}>
                    {user.userType == 'Tutor' ? 'Tutor' :
                    user.linkedCourseIDs ? "Enrolled" : "Unenrolled"
                    }
                </Text>

            </View>

            <View style = {styles.section}>
                <Text style = {globalStyles.SubHeading}>
                    Upcoming Classes
                </Text>
                <Text>
                    You have 2 classes today
                </Text>

                <ScrollView horizontal = {true} style = {styles.ClassCardsList}>
                    <ClassCard title = "Math Methods" content={"You have quiz today!"} destination={"Zoom"} time={"10:00am"} />
                    <ClassCard title = "Math Methods" content={"You have quiz today!"} destination={"Zoom"} time={"10:00am"} />

                </ScrollView>

            </View>
            <View style = {styles.section}>
                <Text style = {globalStyles.SubHeading}>Announcements</Text>
                <AnnouncementCard name="Harley Zhong" date = "15:00 20-08" message="Classes will be cancelled today. See you next week!"/>
            </View>

        </View>

    )
}

export default Home

const styles = StyleSheet.create({
    headerContainer: {
        padding: 20
    },
    welcomeText: {
        fontWeight: '500',
        fontSize: 19,
        marginBottom: 5,
        color: 'white'
    },
    enrolmentStatus: {
        fontSize: 14,
        color: 'white'

    },
    section: {
        padding: 20,
        rowGap: 10
    },

    ClassCardsList: {
        gap: 4
    },
    ClassCardContainer: {
        borderRadius: 10,
        width: 160,
        height: 120,
        rowGap: 3,
        padding: 10,
        color: 'white',
        marginRight: 10,
        shadowColor: '#000000',
        shadowOffset: { width: -4, height: 3 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 5, // This property is necessary for Android
     
    },



})