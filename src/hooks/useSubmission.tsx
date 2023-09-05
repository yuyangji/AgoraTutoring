import { useEffect, useState } from "react";
import { Submission } from "../Types/Submission";
import firestore from "@react-native-firebase/firestore";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import {
  selectSubmissionUsingAssessmentId,
  addSubmissions,
} from "../Redux/slices/submissionsSlice";

const fetchSubmissionFromDb = async (assessmentId: string, studentId: string) => {
  try {
    const submissionRef = firestore()
      .collection("Assessments")
      .doc(assessmentId)
      .collection("Submissions")
      .where("studentId", "==", studentId);

    const querySnapshot = await submissionRef.get();
    const data = querySnapshot.docs.map((doc) => doc.data() as Submission);
    if (data.length > 0) return data[0];
    else return null;
  } catch (error) {
    console.log("Error finding submissions in useSubmissions");
    throw error;
  }
};

const useSubmissions = (assessmentIds: string | string[]) => {
  const [submissions, setSubmissions] = useState<Submission[]>();
  const studentId = useAppSelector((state) => state.user.entity.id);
  const allSubmissions = useAppSelector(selectSubmissionUsingAssessmentId);
  const dispatcher = useAppDispatch();

  const fetchSubmissions = async () => {
    try {
      const ids = Array.isArray(assessmentIds) ? assessmentIds : [assessmentIds];
      const promises = ids.map(async (id) => {
        if (allSubmissions[id] != undefined) return allSubmissions[id];
        return fetchSubmissionFromDb(id, studentId);
      });

      const fetchedSubmissions = await Promise.all(promises);
      const validSubmissions = fetchedSubmissions.filter((s) => s != null);
      setSubmissions(validSubmissions);
      dispatcher(addSubmissions(validSubmissions));
    } catch (error) {
      console.log("Error finding submissions in useSubmissions");
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [assessmentIds]);

  if (Array.isArray(assessmentIds)) {
    return { submissions };
  } else {
    return { submission: submissions ? submissions[0] : null };
  }
};

export default useSubmissions;

export { useSubmissions };
