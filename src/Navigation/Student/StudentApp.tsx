import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../Screens/Tutor/Home";
import Attendance from "../../Screens/Tutor/Attendence";
import Assessments from "../../Screens/Student/Assessments/Assessments";
import BottomTabNavigator from "../BottomNavigator";
import ProgramSearch from "../../Screens/Student/BrowsePrograms/ProgramSearch";
import GroupChat from "../../Screens/Shared/GroupChat";
import { IconEnrol, IconAssessments, IconCalendar, IconChat, IconHome } from "../BottomTabIcons";


const BottomTab = createBottomTabNavigator();

export const StudentAppNavigator = () => {

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
        component={ProgramSearch}
        options={{
          tabBarIcon: IconEnrol
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