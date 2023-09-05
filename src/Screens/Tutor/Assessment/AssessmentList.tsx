import { useState, useEffect } from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
} from "react-native";
import SearchField from "../../../Components/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MyTheme } from "../../../Styles/useGlobalStyles";
import AssessmentView from "./AssessmentView";
import { useAppSelector } from "../../../Redux/hooks";
import { selectAssessments } from "../../../Redux/slices/assessmentsSlice";
import { Assessment } from "../../../Types/Assessment";
import { ConvertDate } from "../../../Utils";
import { selectGroups } from "../../../Redux/slices/programSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TutorRootStackParamList } from "../../../Navigation/Tutor/NavigatorTypes";

interface AssessmentItemProps {
  title: string;
  open: string;
  close: string;
  currentSubmissions: number;
  requiredSubmissions: number;
}

const exampleAssessments: AssessmentItemProps[] = [
  {
    title: "Math Quiz 1",
    open: "23-08-2023 10:00am",
    close: "24-08-2023 10:00am",
    currentSubmissions: 15,
    requiredSubmissions: 30,
  },
  {
    title: "History Essay",
    open: "01-09-2023 09:00am",
    close: "07-09-2023 05:00pm",
    currentSubmissions: 20,
    requiredSubmissions: 20,
  },
  {
    title: "Science Project",
    open: "15-09-2023 08:00am",
    close: "30-09-2023 11:59pm",
    currentSubmissions: 10,
    requiredSubmissions: 25,
  },
  {
    title: "Literature Review",
    open: "05-10-2023 12:00pm",
    close: "12-10-2023 03:00pm",
    currentSubmissions: 5,
    requiredSubmissions: 15,
  },
];
const AssessmentItem = ({
  assessment,
  onPress,
}: {
  assessment: Assessment;
  onPress: () => void;
}) => {
  const openDate = new Date(assessment.open);
  const closeDate = new Date(assessment.close);
  const groups = useAppSelector(selectGroups);

  const getRequiredSubmissions = () => {
    const requiredGroups = groups.filter((group) =>
      assessment.groups.includes(group.groupId)
    );
    if (requiredGroups)
      return requiredGroups.reduce((acc, group) => acc + group.students.length, 0);
    return 0;
  };
  const getNumSubmissions = () => {
    return 0;
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.AssessmentContainer}>
      <Text style={[styles.buttonText, styles.buttonTextTitle]}>{assessment.title}</Text>

      <View style={styles.dates}>
        <Text style={styles.timeText}>Open {ConvertDate(openDate)}</Text>
        <Text style={styles.timeText}>Close {ConvertDate(closeDate)}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Ionicons name="ellipse" size={8} color="#33BD02" />
        <Text style={styles.submissionText}>
          {getNumSubmissions()}/{getRequiredSubmissions()} submissions
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

const AssessmentsList = () => {
  const navigation = useNavigation<NativeStackNavigationProp<TutorRootStackParamList>>();

  const onPressAssessment = (assessmentId: string) => {
    navigation.navigate("Assessment", { assessmentId });
  };

  const onPressAddProgram = () => {
    navigation.navigate("CreateAssessment");
  };

  const assessments = useAppSelector(selectAssessments);

  useEffect(() => {
    console.log(assessments);
  }, [assessments]);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <SearchField additionalStyles={{ flex: 1, borderRadius: 8 }} />
        <TouchableOpacity style={{ ...styles.addBtn }} onPress={onPressAddProgram}>
          <Text style={{ color: "white" }}>+ Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.listContainer}
        data={assessments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <AssessmentItem onPress={() => onPressAssessment(item.assessmentId)} assessment={item} />
        )}
      />
    </View>
  );
};

export default AssessmentsList;

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
    fontSize: 10,
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
