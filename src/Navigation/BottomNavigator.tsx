import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MyTheme } from "../useGlobalStyles";
import BottomTabBar from "../Components/Navigation/BottomTabBar";
import { useAppDispatch } from "../Redux/hooks";
import HeaderMenu from "./HeaderMenu";
import { IconNotifications } from "./BottomTabIcons";
import { logout } from "../Redux/slices/userSlice";

export const BottomTab = createBottomTabNavigator();

const BottomTabContainer = ({ children }) => {
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
        tabBarBackgroundColor: 'white',
        
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
        headerLeft: () => (
          <Ionicons name="reorder-three-sharp" size={35} color="white" />
        ),
      })}
    >
      {children}
    </BottomTab.Navigator>
  );
};

export default BottomTabContainer;
