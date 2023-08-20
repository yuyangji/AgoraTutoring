import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HeaderMenu from "./HeaderMenu";
import { MyTheme } from "../useGlobalStyles";
import { IconNotifications } from "./BottomTabIcons";

const CustomHeader = ({ title, onLogout }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.headerRight}>
        {/* Assuming IconNotifications is a component */}
        <IconNotifications />
        <HeaderMenu onLogout={onLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: MyTheme.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
      textAlign: "left",
    fontWeight:'400',
    flex: 1,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CustomHeader;
