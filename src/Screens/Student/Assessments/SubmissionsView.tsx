import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MyTheme, globalStaticStyles } from "../../../useGlobalStyles";
import { StudentRootStackParamList } from "../../../Navigation/Student/StudentNavigator";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import {
  fetchSubmissions,
  selectSubmissionByAssessmentDict,
  selectSubmissions,
} from "../../../Redux/slices/submissionsSlice";
import { selectAssessments } from "../../../Redux/slices/assessmentsSlice";
import { Assessment } from "../../../Types/Assessment";
import { ConvertDate, getTimeLeft } from "../../../Utils";

export interface Submission {
  submissionId: String;
  submissionTitle: String;
  submissionDueDate: String;
  submissionInstructions: String;
  isSubmitted: boolean;
}

// const submissions: Submission[] = [
//     {
//         submissionId: '1',
//         submissionTitle: 'English Language Essay 1',
//         submissionDueDate: '2023-03-24T10:00:00Z',
//         submissionInstructions: "",
//         isSubmitted: false,
//     },
//     {
//         submissionId: '2',
//         submissionTitle: 'Math Assignment 1',
//         submissionDueDate: '2023-03-25T10:00:00Z',
//         submissionInstructions: "",
//         isSubmitted: true,
//     },
//     {
//         submissionId: '3',
//         submissionTitle: 'History Report 1',
//         submissionDueDate: '2023-03-26T10:00:00Z',
//         submissionInstructions: "",
//         isSubmitted: false,
//     },
//     // Add more submissions as needed
// ];

const SubmissionButton = ({
  assessment,
  onPress,
}: {
  assessment: Assessment;
  onPress: () => void;
}) => {
  const dateOpen = new Date(assessment.open);
  const dateClose = new Date(assessment.close);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.SubmissionButtonContainer}
    >
      <Text style={[styles.buttonText, styles.buttonTextTitle]}>
        {assessment.title}
      </Text>

      <Text style={styles.buttonText}>Due on {ConvertDate(dateClose)}</Text>

      <Text style={[styles.buttonText, styles.buttonTextRemainingTime]}>
        {getTimeLeft(dateClose)}
      </Text>
      <Ionicons
        style={styles.arrowIcon}
        name="chevron-forward"
        size={24}
        color="white"
      />
    </TouchableOpacity>
  );
};

const SubmissionsSubView = () => {
  const [pendingAssessments, setPendingAssessments] = useState<Assessment[]>(
    []
  );
  const [previousSubmissions, setPreviousSubmissions] = useState([]);

  const submissions = useAppSelector(selectSubmissions);
  const assessments = useAppSelector(selectAssessments);
  const submissionByAssessmentID = useAppSelector(
    selectSubmissionByAssessmentDict
  );

  const navigation =
    useNavigation<NativeStackNavigationProp<StudentRootStackParamList>>();

  useEffect(() => {
    if (assessments) {
      const pendingResults = assessments.filter(
        (assessment) => !submissionByAssessmentID[assessment.assessmentId]
      );
      setPendingAssessments(pendingResults);
    }
  }, [submissions]);

  //On press the submission button
  const onPressButton = (assessmentId: string) => {
    if (assessmentId in submissionByAssessmentID) {
      const submissionId = submissionByAssessmentID[assessmentId].submissionId;
      console.log("Pushing data", {
        assessmentId: assessmentId,
        submissionId: submissionId,
      });
      navigation.push("Submit", {
        assessmentId: assessmentId,
        submissionId: submissionId,
      });
    } else {
      console.log("Pushing data", {
        assessmentId: assessmentId,
        submissionId: "",
      });
      navigation.push("Submit", {
        assessmentId: assessmentId,
        submissionId: "",
      });
    }
  };

  return (
    <View style={styles.SubViewContainer}>
      <Text style={[globalStaticStyles.SubHeading, styles.SubHeading]}>
        Waiting on {pendingAssessments.length} submissions
      </Text>
      <View style={styles.SubmissionsList}>
        {pendingAssessments.map((item, index) => (
          <SubmissionButton
            key={index}
            assessment={item}
            onPress={() => onPressButton(item.assessmentId)}
          />
        ))}
      </View>
    </View>
  );
};
export default SubmissionsSubView;

const styles = StyleSheet.create({
  SubViewContainer: {
    padding: 10,
    marginTop: 10,
  },
  SubmissionsList: {
    gap: 10,
  },
  arrowIcon: {
    position: "absolute",
    top: "50%",
    right: 10,
    transform: [{ translateY: -2 }],
  },
  SubHeading: {
    marginBottom: 10,
  },

  SubmissionButtonContainer: {
    borderRadius: 7,
    backgroundColor: MyTheme.colors.primary,
    padding: 10,
  },
  buttonText: {
    color: "white",
  },
  buttonTextTitle: {
    fontWeight: "bold",
  },
  buttonTextRemainingTime: {
    fontWeight: "bold",
  },
});
