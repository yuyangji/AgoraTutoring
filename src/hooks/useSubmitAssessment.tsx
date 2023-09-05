import { useState } from "react";
import { DocumentPickerResponse } from "react-native-document-picker";
import { Submission, SubmissionConverter } from "../Types/Submission";
import { SubmissionsDb } from "../Database/Firebase/Firebase";
import useDocumentUploader from "./useDocumentUploader";
import firestore from "@react-native-firebase/firestore";
import { useAppSelector } from "../Redux/hooks";
import { selectUserId } from "../Redux/slices/userSlice";

export const addSubmission = async (submission: Submission) => {
  try {
    const SubmissionDocRef = firestore()
      .collection("Assessments")
      .doc(submission.assessmentId)
      .collection("Submissions")
      .doc(); // Create a new document ID for the submission

    const submissionDbModel = SubmissionConverter.toFirestore(submission);

    await SubmissionDocRef.set(submissionDbModel);

    return SubmissionDocRef.id;
  } catch (error) {
    console.error("Error creating assessment:", error);
    throw error;
  }
};
const useSubmitAssessment = (assessmentId: string) => {
  const { pickResults, onPickDocuments, handleUpload } = useDocumentUploader();

  const [loading, setLoading] = useState(false);
  const userId = useAppSelector(selectUserId);

  const submit = async () => {
    if (pickResults == null) return;
    setLoading(true);
    try {
      //Create submission
      const submission: Submission = new Submission();
      submission.assessmentId = assessmentId;
      submission.studentId = userId;
      submission.files = [];

      const submissionId = await addSubmission(submission);

      //Upload documents to storage
      const getStoragePath = (result: DocumentPickerResponse) => {
        return `${assessmentId}/${userId}/${result.name}`;
      };

      const refs = await handleUpload(getStoragePath);

      await SubmissionsDb(assessmentId).doc(submissionId).update({
        files: refs,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });

      alert("Files uploaded successfully!");
      return true;
    } catch (err) {
      console.error("File upload error: ", err);
      alert("Upload failed");
      setLoading(false);
      throw err;
    }
  };

  return {
    pickResults,
    onPickDocuments,
    loading,
    submit,
  };
};

export default useSubmitAssessment;
