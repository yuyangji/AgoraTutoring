import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Home from "../../StudentApp/Home/Home";
import Attendance from "../../StudentApp/Attendance/Attendence";
import { useTheme } from "@react-navigation/native";
import Assessments from "../../StudentApp/Assessments/Assessments";
import Submit from "../../StudentApp/Assessments/Submit";
import { FontAwesome5 } from "@expo/vector-icons";
import GroupChat from "../../Common/GroupChat/GroupChat";
import YourStudents from "../YourStudents/YourStudents";
import BrowseCourses from "../../StudentApp/BrowseCourses/CourseList";
import { MyTheme } from "../../useGlobalStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomTabBar from "../../Navigation/BottomTabBar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import HeaderMenu from "../../Navigation/HeaderMenu";
import { useAppDispatch } from "../../Redux/hooks";
import { logout } from "../../Redux/userSlice";
import MySubjects from "../MySubjects/MySubjects";

const BottomTab = createBottomTabNavigator();

const IconHome = (props: { color: string; size: number }) => (
  <Ionicons name="home" size={props.size} color={props.color} />
);
const IconCalendar = (props: { color: string; size: number }) => (
  <Ionicons name="md-calendar-sharp" size={props.size} color={props.color} />
); //For attendance screen
const IconNotifications = (
  <Ionicons name="ios-notifications" size={27} color="white" />
);
const IconProfile = (
  <Ionicons name="person-circle-sharp" size={30} color="white" />
); //For profile screen
const IconSettings = null; //for settings screen
const IconChat = (props: { color: string; size: number }) => (
  <Ionicons name="chatbubble-ellipses" size={props.size} color={props.color} />
);
const IconAssessments = (props: { color: string; size: number }) => (
  <Ionicons name="md-newspaper" size={props.size} color={props.color} />
);

export const TutorApp = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const onPressLogout = () => {
    dispatch(logout());
  };

  return (
    <BottomTab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: MyTheme.colors.secondary,
        tabBarInactiveTintColor: "white",
        headerTintColor: "white",
        headerRightContainerStyle: {
          paddingRight: 5,
        },
        headerLeftContainerStyle: {
          paddingLeft: 5,
        },

        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleAlign: "center",
        headerRight: () => (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            {IconNotifications}
            {IconProfile}
            <HeaderMenu onLogout={onPressLogout} />
          </View>
        ),
        headerLeft: () => (
          <Ionicons name="reorder-three-sharp" size={35} color="white" />
        ),
      })}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: IconHome,
        }}
      />

      <BottomTab.Screen
        name="Chat"
        component={GroupChat}
        options={{
          tabBarIcon: IconChat,
        }}
      />

      <BottomTab.Screen
        name="Subjects"
        component={MySubjects}
        options={{
          tabBarIcon: IconAssessments,
        }}
      />
      <BottomTab.Screen
        name="Attendance"
        component={Attendance}
        options={{
          tabBarIcon: IconCalendar,
        }}
      />
    </BottomTab.Navigator>
  );
};
