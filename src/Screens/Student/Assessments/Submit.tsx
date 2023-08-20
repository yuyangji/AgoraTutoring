import { RouteProp, useNavigation, useTheme } from "@react-navigation/native";
import { Pressable, View, Text, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Submission } from "./SubmissionsView";
import SubmitBoxButton from "../../../Components/SubmitBoxButton";
import { MyTheme, globalStaticStyles } from "../../../useGlobalStyles";
import { Assessment, AssessmentSubmission } from "../../../Types/Assessment";
import { StudentRootStackParamList } from "../../../Navigation/Student/StudentNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../Redux/hooks";
import {
  selectAssessments,
  assessmentDict,
} from "../../../Redux/slices/assessmentsSlice";
import { selectSubmissionDict } from "../../../Redux/slices/submissionsSlice";
import { ConvertDate } from "../../../Utils";
import { selectUser } from "../../../Redux/slices/userSlice";
import DocumentPicker, {
  DocumentPickerResponse,
} from "react-native-document-picker";
import { SubmissionsRef } from "../../../Firebase/Firebase";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
type SubmissionScreenRouteProp = RouteProp<StudentRootStackParamList, "Submit">;

type Props = {
  route: SubmissionScreenRouteProp;
};

const Submit = ({ route }: Props) => {
  const { assessmentId, submissionId } = route.params;
  const assessmentSelectorDict = useAppSelector(assessmentDict);
  const submissionSelectorDict = useAppSelector(selectSubmissionDict);
  const assessment = assessmentSelectorDict[assessmentId];
  const user = useAppSelector(selectUser);
  console.log(assessment);
  const submission =
    submissionId == "" || !(submissionId in submissionSelectorDict)
      ? null
      : submissionSelectorDict[submissionId];

  const dateOpen = new Date(assessment.open);
  const [pickResults, setPickResults] = useState<
    DocumentPickerResponse[] | null
  >();
  useEffect(() => {}, []);

  const OnPressSubmit = () => {
    if (pickResults == null) {
      alert("Please upload a file");
      return;
    }
    handleUpload();
  };

  const onPickDocuments = async () => {
    try {
      // Picking multiple documents
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
        allowMultiSelection: true,
      });

      setPickResults(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      }
    }
  };
  const handleUpload = async () => {
    try {
      if (!pickResults) return;
      // Create a storage reference
      const storageRef = storage().ref();

      // Upload each file to Firebase Cloud Storage
      const uploadPromises = pickResults.map(async (result) => {
        const fileRef = storageRef.child(
          `${assessmentId}/${user.id}/${result.name}`
        );
        await fileRef.putFile(result.uri);

        // Get the download URL
        return fileRef.getDownloadURL();
      });

      const fileUrls = await Promise.all(uploadPromises);

      // Save the URLs to Firestore
      const submissionRef = SubmissionsRef(assessment.programId, assessmentId);
      await submissionRef.add({
        fileUrls: fileUrls,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });

      alert("Files uploaded successfully!");
    } catch (err) {
      alert("Upload failed");
      console.error("File upload error: ", err);
    }
  };
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={globalStaticStyles.SubHeading}>{assessment.title}</Text>
      <Text style={styles.dueText}>Due Date: {ConvertDate(dateOpen)}</Text>

      <SubmitBoxButton
        pickResults={pickResults}
        onPickDocuments={onPickDocuments}
      />

      <Text style={globalStaticStyles.SubHeading}>Submission Instructions</Text>
      <Text style={styles.instructionsText}>
        {assessment.submitInstructions}
      </Text>

      <Pressable onPress={OnPressSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Submit;

const styles = StyleSheet.create({
  screen: {
    padding: 15,
    gap: 20,
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
  dueText: {
    color: "#585858",
    fontSize: 13,
  },
  instructionsText: {
    fontWeight: "300",
  },
});
