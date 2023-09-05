import { useState, useEffect } from "react";
import { Submission } from "../../Types/Submission";
import firestore from "@react-native-firebase/firestore";
import { selectAssessments } from "../../Redux/slices/assessmentsSlice";
import { useAppSelector } from "../../Redux/hooks";

const useFetchAllSubmissions = (assignmentId: string) => {
  const [submissions, setSubmission] = useState<Submission[]>([]);
  const assessments = useAppSelector(selectAssessments);

  const fetchSubmissions = async (programId: string, assessmentId: string) => {
    try {
      const submissionsRef = firestore()
        .collection("Programs")
        .doc(programId)
        .collection("Assessments")
        .doc(assessmentId)
        .collection("Submissions");

      const querySnapshot = await submissionsRef.get();
      const data = querySnapshot.docs.map((doc) => doc.data() as Submission);
      setSubmission(data);
    } catch (error) {
      console.log("Error finding submissions in useSubmissions");
    }
  };

  useEffect(() => {
    if (assessments) {
      const assessment = assessments.find((a) => a.assessmentId == assignmentId);
      if (assessment) {
        fetchSubmissions(assessment.programId, assessment.assessmentId);
      }
    }
  }, [assessments]);

  return { submissions };
};

export default useFetchAllSubmissions;
