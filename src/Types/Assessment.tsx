
import { FileDb } from "./File";
import { Submission } from "./Submission";
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'


export interface Assessment {
  assessmentId: string;
  title: string;
  programId: string;
  groups: string[];
  files: FileDb[];
  submitInstructions: string;
  open: string;  // Changed from Date to string
  close: string; // Changed from Date to string
}

export interface AssessmentDb {

  title: string;
  programId: string;
  groups: string[];
  files: FileDb[];
  submitInstructions: string;
  open: FirebaseFirestoreTypes.Timestamp;
  close:  FirebaseFirestoreTypes.Timestamp;
}

export const assessmentConverter = {
  toFirestore(assessment: Omit<Assessment, 'assessmentId'>): AssessmentDb {
    return {
      ...assessment,
      open: firestore.Timestamp.fromDate(new Date(assessment.open)),
      close: firestore.Timestamp.fromDate(new Date(assessment.close))
    };
  },

  fromFirestore(snapshot: FirebaseFirestoreTypes.DocumentSnapshot, programId:string): Assessment {
    const data = snapshot.data() as AssessmentDb;
    if (data.files == undefined)
      data.files = [];

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