import firestore from "@react-native-firebase/firestore";
import { Group } from "../../Types/Group";
import { AssessmentsDb, SubmissionsDb } from "./Firebase";
import { Assessment, assessmentConverter } from "../../Types/Assessment";
import { FirestoreResult } from "./Types";
import {
  Submission,
} from "../../Types/Submission";

//Allows tutors to create an assessment
export const createAssessment = async (assessment: Assessment) => {
  try {
    const assessmentRef = firestore().collection("Assessments").doc(); // Create a new document ID for the assessment

    await assessmentRef.set(assessmentConverter.toFirestore(assessment));

    return assessmentRef.id;
  } catch (error) {
    console.error("Error creating assessment:", error);
    throw error;
  }
};

//Check assessments subcollection if 'groups' field array contains a groupId.
export const fetchAssessmentsDb = async (groups: Group[]) => {
  try {
    const assessments: Assessment[] = [];
    for (const group of groups) {
      let assessmentsRef = AssessmentsDb.where("groups", "array-contains", group.groupId);
      const querySnapshot = await assessmentsRef.get();
      const data = querySnapshot.docs.map((doc) => {
        assessments.push(assessmentConverter.fromFirestore(doc, group.programId));
      });
    }
    return assessments;
  } catch (error) {
    throw error;
  }
};

export const fetchSubmissionsDb = async (
  studentId: string,
  assessmentRoutes: { programId: string; assessmentId: string }[]
) => {
  try {
    const submissions: Submission[] = [];
    for (const assessment of assessmentRoutes) {
      let assessmentsRef = SubmissionsDb(assessment.assessmentId).where(
        "studentId",
        "==",
        studentId
      );
      const querySnapshot = await assessmentsRef.get();
      const data = querySnapshot.docs.map((doc) => doc.data() as Submission);
      submissions.push(...data);
    }
    return submissions;
  } catch (error) {
    throw error;
  }
};
