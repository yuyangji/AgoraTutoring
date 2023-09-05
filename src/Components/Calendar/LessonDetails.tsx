import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import { MyTheme, globalStyles } from "../../Styles/useGlobalStyles";
import { Lesson } from "../../Types/Lesson";
import { useAppSelector } from "../../Redux/hooks";
import { selectGroups } from "../../Redux/slices/programSlice";
import { ConvertDate, DateToTime } from "../../Utils";
import { Icons } from "../../Components/Icons/Icons";


const EmptyDate = () => {
  return (
    <View style={styles.bottomBox}>
      <Text style={[globalStyles.Heading, styles.heading]}>
        No Lessons
      </Text>
    </View>
  );
};

const AttendanceItem = ({ name, didAttend }) => {
  const [attendend, setAttended] = useState(didAttend);

  const OnPress = () => {
    setAttended(!attendend);
  };

  return (
    <TouchableOpacity style={itemStyle.container} onPress={OnPress}>
      <Text style={itemStyle.nameText}>{name}</Text>
      {attendend ? Icons.check : Icons.cross}
    </TouchableOpacity>
  );
};

const LessonDetails = ({
  loading,
  lessons,
  onSelectLesson,
}: {
  loading: boolean;
  lessons: Lesson[];
  onSelectLesson: (lesson: Lesson) => void;
}) => {
  const groups = useAppSelector(selectGroups);
  const getGroupName = (groupId: string) => {
    return groups.find((g) => g.groupId == groupId)?.name || "Undefined";
  };
  if (loading) {
    return (
      <View style={{ ...styles.bottomBox, justifyContent: "center" }}>
        <ActivityIndicator size="large" color={MyTheme.colors.secondary} />
      </View>
    );
  }

  if (lessons) {
    return (
      <View style={styles.bottomBox}>
        <Text style={[globalStyles.Heading, styles.heading]}>
          Lessons
        </Text>
        <FlatList
          data={lessons}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.lessonItem}
              onPress={() => onSelectLesson(item)}
            >
              <Text style={globalStyles.text_md}>
                {getGroupName(item.groupId)}
              </Text>
              <Text style={globalStyles.text_sm}>
                {DateToTime(new Date(item.start))}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  return <EmptyDate />;
};

export default LessonDetails;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: MyTheme.colors.backgroundDark,
  },
  list: {},
  heading: {
    marginBottom: 20,
  },
  lessonItem: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderColor: "gray",
    flexDirection: "row",
    justifyContent: "space-between",
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
