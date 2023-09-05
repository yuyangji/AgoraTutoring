import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,

  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { MyTheme, globalStyles } from "../../Styles/useGlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { useAppSelector } from "../../Redux/hooks";
import { selectLessons } from "../../Redux/slices/lessonSlice";
import { selectUser } from "../../Redux/slices/userSlice";
import { Lesson } from "../../Types/Lesson";
import {
  selectGroupIds,
  selectGroups,

} from "../../Redux/slices/programSlice";
import AddLesson from "./AddLesson";
import useAttendance from "../../hooks/useAttendance";
import LessonDetails from "../../Components/Calendar/LessonDetails";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { TutorRootStackParamList } from "../../Navigation/Tutor/NavigatorTypes";
import useLessons from "../../hooks/useLesson";


export const TutorCalendar = () => {

  const user = useAppSelector(selectUser);
  const groups = useAppSelector(selectGroups);
  const loading = false
  const [selected, setSelected] = useState("");

  const [filteredLessons, setFilteredLessons] = useState<Lesson[]>([]);

  const [markedDay, setMarkedDay] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string>("");

  const navigation = useNavigation<NativeStackNavigationProp<TutorRootStackParamList>>();

  const [dateRange, setDateRange] = useState<{ startDate: Date; endDate: Date }>({ startDate: new Date(), endDate: new Date() });

  const groupIds = useAppSelector(selectGroupIds)
  const { lessons } = useLessons({groupIds: groupIds, startDate: dateRange.startDate, endDate: dateRange.endDate })


  const onSelectLesson = (lesson: Lesson) => { 
    if (lesson)
    navigation.push('Attendance', {lessonId: lesson.lessonId, groupId: lesson.groupId})
  }

  useEffect(() => {
    const startDate = new Date();
    const endDate = new Date();
    //set start date to first day of month
    startDate.setDate(1);
    //set end date to last day of month
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0);

    setDateRange({ startDate, endDate })
  }, [])

  useEffect(() => {
    //select initial date
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    onSelectDate(todayStr);
  }, []);

  const onSelectDate = (dateString: string) => {
    setSelected(dateString);
    const selectedDate = new Date(dateString);
    const lessonsOnDate = lessons.filter(
      (l) => new Date(l.start).toDateString() === selectedDate.toDateString()
    );
  
    setFilteredLessons(lessonsOnDate || null);

  };

  useEffect(() => {
    const lessonsByDate = lessons.reduce((acc, lesson) => {
      const dateStr = new Date(lesson.start).toISOString().split("T")[0];
      acc[dateStr] = acc[dateStr] || [];
      acc[dateStr].push(lesson);
      return acc;
    }, {});

    // Generate markedDay object based on lessons and attendance
    const newMarkedDay = Object.keys(lessonsByDate).reduce((acc, dateStr) => {
      acc[dateStr] = {
        marked: true,
        dotColor: lessonsByDate[dateStr].some((l) =>
          l.attendance?.includes(user.id)
        )
          ? "green"
          : "orange",
      };
      return acc;
    }, {});

    setMarkedDay(newMarkedDay);
  }, [lessons, user]);

  return groups === null ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>You are not enrolled</Text>
    </View>
  ) : (
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
      <LessonDetails 
                loading={loading} 
                lessons={filteredLessons} 
                onSelectLesson={onSelectLesson } 
            />
      <AddLesson
        lessonDate={new Date(selected)}
        isVisible={showModal}
        setIsVisible={setShowModal}
        groupId={selectedGroup}
      />

        
      <TouchableOpacity
        style={{ position: "absolute", bottom: 15, right: 15, elevation: 5 }}
        onPress={() => setShowModal(true)}
      >
        <AntDesign
          name="pluscircle"
          size={50}
          color={MyTheme.colors.secondary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TutorCalendar;

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
