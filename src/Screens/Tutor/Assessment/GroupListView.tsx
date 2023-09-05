import { useState } from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import SearchField from "../../../Components/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MyTheme } from "../../../Styles/useGlobalStyles";
import AssessmentView from "./AssessmentView";
import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";


interface AssessmentItemProps {
  title: string;
  nextLessonTime: string;
}

const assessments: AssessmentItemProps[] = [
  {
    title: "Group AQ",
    nextLessonTime: "23-08-2023 10:00am",

  },
  {
    title: "Group B",
    nextLessonTime: "01-09-2023 09:00am",

  },
  {
    title: "Group W",
    nextLessonTime: "15-09-2023 08:00am",

  },
  {
    title: "Group AQ",
    nextLessonTime: "05-10-2023 12:00pm",

  },
];
const GroupListItem = ({
    group,
  onPress,
}: {
    group: AssessmentItemProps;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.AssessmentContainer}>
      <Text style={[styles.buttonText, styles.buttonTextTitle]}>
        {group.title}
      </Text>

      <View style={styles.dates}>
        <Text style={styles.timeText}>Next Lesson @ {group.nextLessonTime}</Text>
      </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Ionicons name="person" size={15} color= {MyTheme.colors.primary} />

        <Text style={styles.submissionText}>
          10 students
        </Text>
      </View>

      <Ionicons
        style={styles.arrowIcon}
        name="chevron-forward"
        size={24}
        color={MyTheme.colors.primary}
      />
    </TouchableOpacity>
  );
};

const GroupListView = () => {
  const [isShowing, setIsShowing] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const OnPressItem = () => {
    navigation.push("Lesson")
  };

  // return isShowing ? (
  //   <AssessmentView setIsShowing={setIsShowing} />
  // ) : (
  //   <View style={styles.container}>
  //     <View style={styles.topContainer}>
  //       <SearchField additionalStyles={{ flex: 1, borderRadius: 8 }} />
  //       <Pressable style={{ ...styles.addBtn }}>
  //         <Text style={{ color: "white" }}>+ Add</Text>
  //       </Pressable>
  //     </View>
  //     <FlatList
  //       style={styles.listContainer}
  //       data={assessments}
  //       keyExtractor={(item, index) => index.toString()}
  //       renderItem={({ item }) => (
  //         <GroupListItem onPress={OnPressItem} group={item} />
  //       )}
  //     />
  //   </View>
  // );
};

export default GroupListView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  submissionText: {
    color: MyTheme.colors.primary,
    fontSize: 12,
    verticalAlign: "middle",
    textAlignVertical: "center",
  },
  listContainer: {
    padding: 10,
  },
  buttonText: {
    color: MyTheme.colors.textPrimary,
  },
  dates: {
    flexDirection: "row",
    gap: 10,
  },
  topContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: MyTheme.colors.backgroundDark,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  AssessmentContainer: {
    borderRadius: 7,
    borderWidth: 1,
    gap: 6,
    borderColor: MyTheme.colors.primary,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
  },
  buttonTextTitle: {
    fontWeight: "500",
    fontSize: 16,
  },
  timeText: {
    fontWeight: "400",
    fontSize: 12,
    color: MyTheme.colors.secondary,
  },
  arrowIcon: {
    position: "absolute",
    top: "50%",
    right: 10,
    transform: [{ translateY: -2 }],
  },
  addBtn: {
    backgroundColor: MyTheme.colors.secondary,
    borderRadius: 7,
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
});
