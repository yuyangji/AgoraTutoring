import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../Screens/Tutor/Home";
import { useTheme } from "@react-navigation/native";
import { MyTheme } from "../../Styles/useGlobalStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomTabBar from "../../Components/Navigation/BottomTabBar";
import HeaderMenu from "../../Navigation/HeaderMenu";
import { useAppDispatch } from "../../Redux/hooks";
import GroupChat from "../../Screens/Shared/GroupChat";
import { IconAssessments, IconCalendar, IconChat, IconHome, IconMenu} from "../BottomTabIcons";
import { logout } from "../../Redux/slices/userSlice";
import AssessmentsList from "../../Screens/Tutor/Assessment/AssessmentList";
import MenuScreen from "../../Screens/Student/MenuScreen";
import TutorCalendar from "../../Screens/Tutor/TutorCalendar";


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
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Calendar"
        component={TutorCalendar}
        options={{
          tabBarIcon: IconCalendar,
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
        name="Assess"
        component={AssessmentsList}
        options={{
          tabBarIcon: IconAssessments,
        }}
      />


<BottomTab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarIcon: IconMenu,
        }}
      />
    </BottomTab.Navigator>
  );
};
