import { useState, useEffect, useMemo } from "react";
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
import { MyTheme, globalStyles } from "../../../Styles/useGlobalStyles";
import { StudentRootStackParamList } from "../../../Navigation/Student/StudentNavigator";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";

import { selectAssessmentIds, selectAssessments } from "../../../Redux/slices/assessmentsSlice";
import { Assessment } from "../../../Types/Assessment";
import { ConvertDate, getTimeLeft } from "../../../Utils";
import { selectUser } from "../../../Redux/slices/userSlice";
import { useSubmissions } from "../../../hooks/useSubmission";


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
    <TouchableOpacity onPress={onPress} style={styles.SubmissionButtonContainer}>
      <Text style={[styles.buttonText, styles.buttonTextTitle]}>{assessment.title}</Text>

      <Text style={styles.buttonText}>Due on {ConvertDate(dateClose)}</Text>

      <Text style={[styles.buttonText, styles.buttonTextRemainingTime]}>
        {getTimeLeft(dateClose)}
      </Text>
      <Ionicons style={styles.arrowIcon} name="chevron-forward" size={24} color="white" />
    </TouchableOpacity>
  );
};

const SubmissionsSubView = () => {
  const [pendingAssessments, setPendingAssessments] = useState<Assessment[]>([]);

  const assessments = useAppSelector(selectAssessments);
  const assessmentIds = useAppSelector(selectAssessmentIds)

  const { submissions } = useSubmissions(assessmentIds);

  const navigation =
    useNavigation<NativeStackNavigationProp<StudentRootStackParamList>>();

  useEffect(() => {
    if (assessments && submissions) {
      const pendingResults = assessments.filter(
        (assessment) =>
          !submissions.some((s) => s.assessmentId == assessment.assessmentId)
      );
      setPendingAssessments(pendingResults);
    }
  }, [submissions]);

  //On press the submission button
  const onPressButton = (assessmentId: string) => {
    const submissionId = submissions.find(
      (s) => s.assessmentId == assessmentId
    )?.submissionId;

    navigation.push("Submit", {
      assessmentId: assessmentId,
      submissionId: submissionId ?? "",
    });
  };

  return (
    <View style={styles.SubViewContainer}>
      <Text style={[globalStyles.SubHeading, styles.SubHeading]}>
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
