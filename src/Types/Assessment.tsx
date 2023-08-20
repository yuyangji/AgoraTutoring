import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Submission } from "./Submission";



export interface Assessment {
  assessmentId: string;
  title: string;
  programId: string;
  groups: string[];
  submitInstructions: string;
  open: string;  // Changed from Date to string
  close: string; // Changed from Date to string
}

export interface AssessmentDb {
  assessmentId: string;
  title: string;
  programId: string;
  groups: string[];
  submitInstructions: string;
  open: FirebaseFirestoreTypes.Timestamp;
  close:  FirebaseFirestoreTypes.Timestamp;
}

export const assessmentConverter = {
  toFirestore(assessment: Assessment): AssessmentDb {
    return {
      ...assessment,
      open: FirebaseFirestoreTypes.Timestamp.fromDate(new Date(assessment.open)),
      close: FirebaseFirestoreTypes.Timestamp.fromDate(new Date(assessment.close))
    };
  },

  fromFirestore(snapshot: FirebaseFirestoreTypes.DocumentSnapshot, programId:string): Assessment {
    const data = snapshot.data() as AssessmentDb;
    return {
      ...data,
      programId: programId,
      assessmentId: snapshot.id,
      open: data.open.toDate().toISOString(),
      close: data.close.toDate().toISOString()
    };
  }
};

export type AssessmentSubmission = {
  assessment: Assessment;
  submission: Submission;
}