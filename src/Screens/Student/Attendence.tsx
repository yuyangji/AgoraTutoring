import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { useTheme } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { Calendar, LocaleConfig } from "react-native-calendars";
import CircularBackground from "../../Components/IconWrapper";
import { useAppSelector } from "../../Redux/hooks";
import { selectLessons } from "../../Redux/slices/lessonSlice";
import { selectUser } from "../../Redux/slices/userSlice";
import { Lesson, LessonDbModel } from "../../Types/Lesson";
import { MyTheme } from "../../Styles/useGlobalStyles";

const calendarIcon = (
  <Ionicons name="md-calendar-sharp" size={23} color="white" />
);
const locationIcon = (
  <Ionicons name="ios-location-sharp" size={23} color="white" />
);
const crossIcon = <Entypo name="squared-cross" size={23} color="white" />;
const checkIcon = <Ionicons name="ios-checkbox" size={23} color="white" />;

const CrossButton = () => {
  return (
    <TouchableOpacity
      style={[{ backgroundColor: "#D21010" }, styles.attendanceButton]}
    >
      {crossIcon}
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 17 }}>
        No
      </Text>
    </TouchableOpacity>
  );
};

const CheckButton = () => {
  return (
    <TouchableOpacity
      style={{ ...styles.attendanceButton, backgroundColor: "#41CB10" }}
    >
      {checkIcon}
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 17 }}>
        Yes
      </Text>
    </TouchableOpacity>
  );
};

const Attendance = () => {
  const [selected, setSelected] = useState("");
  const [markedDay, setMarkedDay] = useState({});
  const [lesson, setLesson] = useState<Lesson>();

  const lessons = useAppSelector(selectLessons);
  const user = useAppSelector(selectUser);

  const onSelectDate = (dateString: string) => {
    setSelected(dateString);
    const selectedDate = new Date(dateString);

    const index = lessons.findIndex((l) => {
      const date = new Date(l.start);
      return (
        date.getDay() == selectedDate.getDay() &&
        date.getMonth() == selectedDate.getMonth()
      );
    });

    if (index !== -1) {
      setLesson(lessons[index]);
    } else {
      setLesson(null)
    }
  };

  const didAttend = () => {
    if (!lesson) {
      return false;
    }
    if (!lesson.attendance) {
      return false;
    }
    return lesson.attendance.includes(user.id);
  }

  useEffect(() => {
    let newMarkedDay = {};

    // Convert lessons array into an object where keys are dates and values are lessons on that date
    const lessonsByDate = lessons.reduce((acc, lesson) => {
      const lessonStartDate = new Date(lesson.start);
      const dateStr = lessonStartDate.toISOString().split("T")[0]; // Convert Date object to 'YYYY-MM-DD' string
      if (!acc[dateStr]) {
        acc[dateStr] = [];
      }
      acc[dateStr].push(lesson);
      return acc;
    }, {});

    // Generate markedDay object based on lessons and attendance
    Object.keys(lessonsByDate).forEach((dateStr) => {
      const lessonsOnDate: Lesson[] = lessonsByDate[dateStr];
      const attended = lessonsOnDate.some((lesson) => {
        if (!lesson.attendance) {
          return false;
        }
        return lesson.attendance.includes(user.id);
      });
      newMarkedDay[dateStr] = {
        marked: true,
        dotColor: attended ? "green" : "orange",
      };
    });

    setMarkedDay(newMarkedDay);
  }, [lessons, user]);

  return (
    <View style={styles.screen}>
      <Calendar
        onDayPress={(day) => {
          onSelectDate(day.dateString);
        }}
        markedDates={{
          ...markedDay,
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: MyTheme.colors.secondary,
          },
        }}
      />
      {lesson ? (
        <View style={styles.informationSection}>
          <View style={styles.iconAndTextContainer}>
            <CircularBackground backgroundColor="#2077D0">{calendarIcon}</CircularBackground>
            <View>
              <Text style={styles.calendarDateText}>{selected}</Text>
              <Text>14:00 - 15:30</Text>
            </View>
          </View>
          <View style={styles.iconAndTextContainer}>
            <CircularBackground backgroundColor="#00AB07">{locationIcon}</CircularBackground>
            <View>
              <Text>Location</Text>
              <Text style={styles.locationText}>{}</Text>
            </View>
          </View>

          <Text style={styles.didYouAttendText}>
            Did you attend this class?
          </Text>
          <View style={{ flexDirection: "row", gap: 20 }}>
            {didAttend() ? <CheckButton /> : <CrossButton />}
          </View>
        </View>
      ) : <View style={styles.emptycontainer}>
           <Text style={styles.grayText}>
              No lesson
          </Text>
      </View>}
    </View>
  );
};

export default Attendance;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  emptycontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  grayText: {
    color: 'gray',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  iconAndTextContainer: {
    gap: 15,
    flexDirection: "row",
    fontWeight: 'bold'
  },
  informationSection: {
    padding: 20,
    paddingTop: 25,
    gap: 20,
    borderRadius: 10,
    verticalAlign: "bottom",
    flex: 1,
    backgroundColor: "white",
  },
  didYouAttendText: {
    fontSize: 16,
  },
  calendarDateText: {
    color: "#333333",
  },
  calendarTimeText: {},
  locationText: {
    color: "#0055B8",
  },
  attendanceButton: {
    flexDirection: "row",
    gap: 12,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 17,
    alignItems: "center",
  },
});
