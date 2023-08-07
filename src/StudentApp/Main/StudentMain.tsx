import React from "react";
import { View, StyleSheet, Text } from "react-native"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Home from "../Home/Home";
import Attendance from "../Attendance/Attendence";
import { useTheme } from "@react-navigation/native";
import Assessments from "../Assessments/Assessments";
import Submit from "../Assessments/Submit";
import { FontAwesome5 } from '@expo/vector-icons';
import GroupChat from "../../Common/GroupChat/GroupChat";
import YourStudents from "../../TutorApp/YourStudents/YourStudents";
import BrowseCourses from "../BrowseCourses/CourseList";
import { MyTheme } from "../../useGlobalStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomTabBar from "../../Navigation/BottomTabBar";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BottomTabNavigator from "../../Navigation/BottomNavigator";


const BottomTab = createBottomTabNavigator();

const IconHome = (props: { color: string; size: number }) => (
  <Ionicons name="home" size={props.size} color={props.color} />)
const IconCalendar = (props: { color: string; size: number }) => <Ionicons name="md-calendar-sharp" size={props.size} color={props.color} />//For attendance screen
const IconNotifications = <Ionicons name="ios-notifications" size={27} color="white" />
const IconProfile = <Ionicons name="person-circle-sharp" size={30} color="white" /> //For profile screen
const IconSettings = null //for settings screen
const IconChat = (props: { color: string; size: number }) => <Ionicons name="chatbubble-ellipses" size={props.size} color={props.color} />
const IconAssessments = (props: { color: string; size: number }) => <Ionicons name="md-newspaper" size={props.size} color={props.color} />
const EnrolmentIcon = (props: { color: string; size: number }) => <FontAwesome name="graduation-cap" size={props.size} color={props.color} />


export const StudentMainWithBottomTab = () => {

  return (
    <BottomTabNavigator>

      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: IconHome
        }}

      />

      <BottomTab.Screen
        name="Products"
        component={BrowseCourses}
        options={{
          tabBarIcon: EnrolmentIcon
        }}

      />

      <BottomTab.Screen
        name="Chat"
        component={GroupChat}
        options={{
          tabBarIcon: IconChat
        }}
      />


      <BottomTab.Screen
        name="Subjects"
        component={Assessments}
        options={{
          tabBarIcon: IconAssessments
        }}
      />
      <BottomTab.Screen
        name="Attendance"
        component={Attendance}
        options={{
          tabBarIcon: IconCalendar
        }}
      />

    </BottomTabNavigator>
  );
};