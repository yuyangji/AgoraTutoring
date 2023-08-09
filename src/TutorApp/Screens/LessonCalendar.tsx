import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { Calendar } from "react-native-calendars";
import { useState } from "react";
import { MyTheme, globalStaticStyles } from "../../useGlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const crossIcon = <Entypo name="squared-cross" size={23} color="#ED4E4E" />;
const checkIcon = <Ionicons name="ios-checkbox" size={23} color="#03B70A" />;

interface Attendance {
  studentName: string;
  didAttend: boolean;
}

const attendanceHistory: { [Key: string]: Attendance[] } = {
  "2023-08-17": [
    { studentName: "Ruth Williams", didAttend: false },
    { studentName: "John Doe", didAttend: true },
    { studentName: "Jane Smith", didAttend: false },
    { studentName: "Bob Johnson", didAttend: true },
  ],
  "2023-08-18": [
    { studentName: "Ruth Williams", didAttend: true },
    { studentName: "John Doe", didAttend: false },
    { studentName: "Jane Smith", didAttend: true },
    { studentName: "Bob Johnson", didAttend: false },
  ],
  "2023-08-19": [
    { studentName: "Ruth Williams", didAttend: true },
    { studentName: "John Doe", didAttend: true },
    { studentName: "Jane Smith", didAttend: false },
    { studentName: "Bob Johnson", didAttend: true },
  ],
  "2023-08-20": [
    { studentName: "Ruth Williams", didAttend: false },
    { studentName: "John Doe", didAttend: true },
    { studentName: "Jane Smith", didAttend: true },
    { studentName: "Bob Johnson", didAttend: false },
  ],
};

const AttendanceItem = ({ name, didAttend }) => {
  return (
    <View style={itemStyle.container}>
      <Text style={itemStyle.nameText}>{name}</Text>
      {didAttend ? checkIcon : crossIcon}
    </View>
  );
};
const itemStyle = StyleSheet.create({
  container: {
    padding: 5,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },
  nameText: {
    color: MyTheme.colors.primary,
  },
});

const CreateLesson = () => {
  return (
    <View style={styles.bottomBox}>
      <Text style={[globalStaticStyles.Heading, styles.heading]}>
        Create Lesson
      </Text>
    </View>
  );
};

export const LessonCalendar = () => {
  const [selected, setSelected] = useState("");
  const [attendanceData, setAttendanceData] = useState<Attendance[] | null>(
    null
  );

  let markedDay = {};
  Object.keys(attendanceHistory).map((item) => {
    markedDay[item] = {
      marked: true,
      dotColor: "orange",
    };
  });

  const OnPressDay = (dateString: string) => {
    console.log(dateString);
    setSelected(dateString);
    if (dateString in attendanceHistory)
      setAttendanceData(attendanceHistory[dateString]);
    else setAttendanceData(null);
  };

  return (
    <View style={styles.screen}>
      <Calendar
        onDayPress={(day) => {
          OnPressDay(day.dateString);
        }}
        markedDates={{
          ...markedDay,
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: MyTheme.colors.secondary,
          },
        }}
        style={{}}
        headerStyle={{}}
        theme={{
          backgroundColor: MyTheme.colors.backgroundDark,
          calendarBackground: MyTheme.colors.backgroundDark,
          textSectionTitleColor: "white",
          todayTextColor: "#00adf5",
          dayTextColor: "white",
          monthTextColor: "white",
          dotColor: "orange",
          selectedDotColor: "orange",
          arrowColor: "white",
          textDayFontSize: 14,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 14,
        }}
      />
      {attendanceData == null ? (
        <CreateLesson />
      ) : (
        <View style={styles.bottomBox}>
          <Text style={[globalStaticStyles.Heading, styles.heading]}>
            Attendance
          </Text>
          {attendanceData && (
            <FlatList
              data={attendanceData}
              renderItem={({ item }) => (
                <AttendanceItem
                  name={item.studentName}
                  didAttend={item.didAttend}
                />
              )}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default LessonCalendar;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: MyTheme.colors.backgroundDark,
  },
  list: {},
  heading: {
    alignSelf: "center",
    marginBottom: 20,
  },
  bottomBox: {
    marginTop: 15,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    padding: 20,
  },
});
