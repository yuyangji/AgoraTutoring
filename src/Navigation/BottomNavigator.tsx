import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MyTheme } from "../useGlobalStyles";
import BottomTabBar from "./BottomTabBar";
import { useAppDispatch } from "../Redux/hooks";
import { logout } from "../Redux/userSlice";
import HeaderMenu from "./HeaderMenu";

const IconNotifications = (
  <Ionicons name="ios-notifications" size={27} color="white" />
);
const IconProfile = (
  <Ionicons name="person-circle-sharp" size={30} color="white" />
); //For profile screen

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = ({ children }) => {
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
      {children}
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
