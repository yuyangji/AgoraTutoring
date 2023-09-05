import {
  Pressable,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { MyTheme } from "../../../Styles/useGlobalStyles";
import { StudentRootStackParamList } from "../../../Navigation/Student/StudentNavigator";
import { useAppSelector } from "../../../Redux/hooks";
import { selectAssessments } from "../../../Redux/slices/assessmentsSlice";
import { ConvertDate } from "../../../Utils";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSubmissions } from "../../../hooks/useSubmission";
import FileItem from "../../../Components/FileItem";
import { Icons, SquareIcon } from "../../../Components/Icons/Icons";
import {
  BodyText,
  H2,
  H3,
  HighlightedHeading,
  SubHeading,
} from "../../../Styles/StyledTexts";
import TextBox from "../../../Styles/TextBox";
import useSubmitAssessment from "../../../hooks/useSubmitAssessment";

type SubmissionScreenRouteProp = NativeStackScreenProps<
  StudentRootStackParamList,
  "Submit"
>;

const Submit = ({ navigation, route }: SubmissionScreenRouteProp) => {
  const { assessmentId, submissionId } = route.params;

  const assessment = useAppSelector(selectAssessments).find(
    (a) => a.assessmentId == assessmentId
  );

  const { submission } = useSubmissions(assessmentId);

  const { pickResults, onPickDocuments, loading, submit } =
    useSubmitAssessment(assessmentId);

  //convert to hook
  const OnPressSubmit = async () => {
    if (pickResults == null) {
      alert("Please upload a file");
      return;
    }
    const result = await submit();
    navigation.goBack();
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <H2 variant="light">{assessment.title}</H2>
        <SubHeading variant="light">
          Due Date: {ConvertDate(new Date(assessment.open))}
        </SubHeading>
      </View>
      <HighlightedHeading>Submission Instructions</HighlightedHeading>
      <Text style={styles.instructionsText}>{assessment.submitInstructions}</Text>

      <HighlightedHeading>Assessment Files</HighlightedHeading>
      <View style={styles.filesList}>
        {assessment.files && assessment.files.length > 0 ? (
          assessment.files.map((file) => {
            return <FileItem file={file} />;
          })
        ) : (
          <BodyText style={{ textTransform: "uppercase" }}>No files</BodyText>
        )}
      </View>
      <HighlightedHeading
        containerStyle={[
          { paddingVertical: 15 },
          submission && { backgroundColor: MyTheme.colors.success },
        ]}
        renderRight={
          submission ? (
            Icons.check_white
          ) : (
            <TouchableOpacity onPress={onPickDocuments}>
              {SquareIcon.upload(MyTheme.colors.secondary)}
            </TouchableOpacity>
          )
        }
      >
        Your submission
      </HighlightedHeading>
      {/* <SubmitBoxButton pickResults={pickResults} onPickDocuments={onPickDocuments} /> */}
      <FlatList
        data={pickResults}
        renderItem={({ item }) => {
          return <FileItem file={{ name: item.name, url: item.uri, type: item.type }} />;
        }}
        keyExtractor={(item) => item.uri}
      />

      {!submission && pickResults.length > 0 && (
        <TouchableOpacity
          onPress={OnPressSubmit}
          style={styles.submitButton}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      )}
      {submission && (
        <View>
          <HighlightedHeading>Grade</HighlightedHeading>
          <BodyText style={styles.sectionContainer}>
            {submission.grade ?? "Ungraded"}
          </BodyText>
          <HighlightedHeading>Feedback</HighlightedHeading>
          <View style={styles.sectionContainer}>
            <TextBox>
              <BodyText>{submission.feedback ?? ""}</BodyText>
            </TextBox>
            {submission.feedbackUrl && <FileItem file={submission.feedbackUrl} />}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Submit;

const styles = StyleSheet.create({
  screen: {
    padding: 15,
    gap: 20,
  },
  headerContainer: {
    backgroundColor: MyTheme.colors.backgroundDark,
    padding: 15,
    gap: 10,
  },
  filesList: {
    padding: 10,
  },
  sectionContainer: {
    padding: 15,
    gap: 10,
  },
  subHeading: {
    backgroundColor: MyTheme.colors.primary_300,
    padding: 10,
  },
  submissionHeading: {
    backgroundColor: MyTheme.colors.primary_300,
    padding: 10,
    paddingVertical: 18,
  },
  submitButton: {
    backgroundColor: MyTheme.colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: "60%",
    borderRadius: 10,
    alignSelf: "center",
    elevation: 5,
  },
  submitButtonText: {
    color: "white",
  },

  instructionsText: {
    fontWeight: "300",
    padding: 10,
  },
});
