import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../Screens/Tutor/Home";
import Attendance from "../../Screens/Student/Attendence";
import Assessments from "../../Screens/Student/Assessments/Assessments";
import BottomTabContainer, { BottomTab } from "../BottomNavigator";
import ProgramSearch from "../../Screens/Student/BrowsePrograms/ProgramSearch";
import GroupChat from "../../Screens/Shared/GroupChat";
import { IconEnrol, IconAssessments, IconCalendar, IconChat, IconHome, IconMenu } from "../BottomTabIcons";
import MenuScreen from "../../Screens/Student/MenuScreen";


export const StudentAppNavigator = () => {

  return (
    <BottomTabContainer>

      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: IconHome,
          headerShown: false
        }}

      />
      <BottomTab.Screen
        name="Attendance"
        component={Attendance}
        options={{
          tabBarIcon: IconCalendar
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
        name="Assessments"
        component={Assessments}
        options={{
          tabBarIcon: IconAssessments
        }}
      />


      
<BottomTab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarIcon: IconMenu
        }}

      />

    </BottomTabContainer>
  );
};