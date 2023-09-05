import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icons } from "../Icons/Icons";
import { MyTheme, globalStyles } from "../../Styles/useGlobalStyles";

const AttendanceStatus = ({ name, studentId, didAttend, onAttendanceChange  }) => {

  const OnPress = () => {
    const newAttendance = !didAttend;
    onAttendanceChange(studentId, newAttendance);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={OnPress}>
      <Text style={globalStyles.text_md}>{name}</Text>
      {didAttend ? Icons.check_lg(MyTheme.colors.success): Icons.cross_lg(MyTheme.colors.emergency) }
    </TouchableOpacity>
  );
};

export default AttendanceStatus

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },
  nameText: {
    color: MyTheme.colors.primary,
    fontSize: 16
  },
});
