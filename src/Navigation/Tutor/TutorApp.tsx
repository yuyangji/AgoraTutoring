import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import Home from "../../Screens/Tutor/Home";
import Attendance from "../../Screens/Tutor/Attendence";
import { useTheme } from "@react-navigation/native";
import { MyTheme } from "../../useGlobalStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomTabBar from "../../Components/Navigation/BottomTabBar";
import HeaderMenu from "../../Navigation/HeaderMenu";
import { useAppDispatch } from "../../Redux/hooks";
import { logout } from "../../Redux/userSlice";
import GroupChat from "../../Screens/Shared/GroupChat";
import MySubjects from "../../Screens/Tutor/MySubjects";
import { IconAssessments, IconCalendar, IconChat, IconHome, IconNotifications, IconProfile } from "../BottomTabIcons";


const BottomTab = createBottomTabNavigator();

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
