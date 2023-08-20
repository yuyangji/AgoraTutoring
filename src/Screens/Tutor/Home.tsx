import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useTheme } from "@react-navigation/native";
import AnnouncementCard from "../../Components/AnnouncementCard";
import useGlobalStyles, {
  MyTheme,
  globalStaticStyles,
} from "../../useGlobalStyles";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { useEffect } from "react";
import { AcceptEnrolmentRequest } from "../../Firebase/EnrolmentApi";
import { getLessonsForStudent } from "../../Firebase/AttendanceApi";
import { selectGroups } from "../../Redux/slices/programSlice";
import { Lesson } from "../../Types/Lesson";
import { logout, selectUser } from "../../Redux/slices/userSlice";
import { selectLessons } from "../../Redux/slices/lessonSlice";
import { ConvertDate } from "../../Utils";
import CustomHeader from "../../Navigation/Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const HandWave = () => (
  <MaterialCommunityIcons name="hand-wave-outline" size={24} color="#DCAD05" />
);
const ClassCard = ({ title, content, location, time }) => {
  return (
    <Pressable>
      <View style={{ ...styles.ClassCardContainer }}>
        <Text style={{ ...styles.cardText, fontWeight: "bold" }}>{title}</Text>
        {content && <Text style={styles.cardText}>{content}</Text>}
        <Text style={styles.cardText}>
          <Ionicons name="location-sharp" size={16} color="white" /> {location}
        </Text>
        <Text style={styles.cardText}>
          <Ionicons name="md-time-sharp" size={16} color="white" /> {time}
        </Text>
      </View>
    </Pressable>
  );
};

const Home = () => {
  const user = useAppSelector(selectUser);
  const groups = useAppSelector(selectGroups);
  const lessons = useAppSelector(selectLessons);
  const dispatch = useAppDispatch();
  const getGroupName = (groupId) => {
    const index = groups.findIndex((g) => g.groupId == groupId);
    if (index != -1) return groups[index].name;
    return "Undefined";
  };
  const onPressLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <CustomHeader title={"Agora"} onLogout={onPressLogout} />
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: MyTheme.colors.primary,
        }}
      >
        <Text style={styles.welcomeText}>
          Hello, {user.firstName} {user.lastName} <HandWave />
        </Text>
        <Text style={styles.enrolmentStatus}>
          {user.userType == "Tutor"
            ? "Tutor"
            : user.programs
            ? "Enrolled"
            : "Unenrolled"}
        </Text>
      </View>
      <View style={styles.main}>
        <View style={styles.section}>
          <Text style={globalStaticStyles.SubHeading}>Upcoming Classes</Text>
          <Text>You have {lessons.length} upcoming classes</Text>

          <ScrollView horizontal={true} style={styles.ClassCardsList}>
            {lessons.map((lesson, index) => {
              const start = ConvertDate(new Date(lesson.start));
              return (
                <ClassCard
                  key={index}
                  title={getGroupName(lesson.groupId)}
                  content={lesson.instructions}
                  location={lesson.location}
                  time={start}
                />
              );
            })}
          </ScrollView>
        </View>
        {/* <View style={styles.section}>
          <Text style={globalStaticStyles.SubHeading}>Announcements</Text>
          <AnnouncementCard
            name="Harley Zhong"
            date="15:00 20-08"
            message="Classes will be cancelled today. See you next week!"
          />
        </View> */}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  main: {
    marginTop: -20,
    zIndex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    flex: 1,
  },
  welcomeText: {
    fontWeight: "400",
    fontSize: 22,
    marginBottom: 5,
    color: "white",
  },
  enrolmentStatus: {
    fontSize: 14,
    color: "white",
  },
  section: {
    padding: 20,
    rowGap: 10,
  },

  ClassCardsList: {
    gap: 4,
  },
  ClassCardContainer: {
    borderRadius: 10,
    width: 160,
    rowGap: 3,
    padding: 10,
    color: "white",
    marginRight: 10,
    borderColor: MyTheme.colors.secondary,
    //  borderWidth: 1
    backgroundColor: "#FCA055",
    // shadowColor: '#000000',
    // shadowOffset: { width: -4, height: 3 },
    // shadowOpacity: 0.6,
    // shadowRadius: 2,
    // elevation: 5, // This property is necessary for Android
  },
  cardText: {
    color: "white",
  },
});
