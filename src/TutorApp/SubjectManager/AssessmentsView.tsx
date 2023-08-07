import { useState } from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import SearchField from "../../Components/SearchBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MyTheme } from "../../useGlobalStyles";
import AssessmentView from "./AssessmentView";

interface AssessmentItemProps {
  title: string;
  open: string;
  close: string;
  currentSubmissions: number;
  requiredSubmissions: number;
}

const assessments: AssessmentItemProps[] = [
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
  submission,
  onPress,
}: {
  submission: AssessmentItemProps;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.AssessmentContainer}>
      <Text style={[styles.buttonText, styles.buttonTextTitle]}>
        {submission.title}
      </Text>

      <View style={styles.dates}>
        <Text style={styles.timeText}>Open {submission.open}</Text>
        <Text style={styles.timeText}>Close {submission.close}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Ionicons name="ellipse" size={8} color="#33BD02" />
        <Text style={styles.submissionText}>
          {submission.currentSubmissions}/{submission.requiredSubmissions}{" "}
          submissions
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



const AssessmentsView = () => {
  const [isShowing, setIsShowing] = useState(false);

  const OnPressItem = () => {
    setIsShowing(true);
  };

  return isShowing ? (
    <AssessmentView setIsShowing={setIsShowing} />
  ) : (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <SearchField additionalStyles={{ flex: 1, borderRadius: 8 }} />
        <Pressable style={{ ...styles.addBtn }}>
          <Text style={{ color: "white" }}>+ Add</Text>
        </Pressable>
      </View>
      <FlatList
        style={styles.listContainer}
        data={assessments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <AssessmentItem onPress={OnPressItem} submission={item} />
        )}
      />
    </View>
  );
};

export default AssessmentsView;

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
