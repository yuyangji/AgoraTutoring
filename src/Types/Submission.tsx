import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { FileDb } from "./File";

//Change to class
export class Submission {
  public submissionId: string;
  public files: FileDb[];
  public studentId: string;
  public assessmentId: string;
  public timestamp?: string;
  public grade?: number;
  public feedback?: string;
  public feedbackUrl? :FileDb;
}

export type SubmissionDbModel = {
  files: FileDb[];
  studentId: string;
  assessmentId: string;
  timestamp: FirebaseFirestoreTypes.Timestamp | FirebaseFirestoreTypes.FieldValue;
  grade?: number;
  feedback?: string;
};

export const SubmissionConverter = {
  toFirestore: (submission: Submission): SubmissionDbModel => {
    return {
      files: submission.files,
      studentId: submission.studentId,
      assessmentId: submission.assessmentId,
      timestamp: firestore.FieldValue.serverTimestamp(),
    };
  },
  fromFirestore: (snapshot: any, assessmentId: string): Submission => {
    const data = snapshot.data() as SubmissionDbModel;
    console.log("this id is ", assessmentId);

    let timestampString: string | undefined;
    if (data.timestamp instanceof firestore.Timestamp) {
      timestampString = data.timestamp.toDate().toISOString();
    }

    return {
      assessmentId: assessmentId,
      submissionId: snapshot.id,
      files: data.files,
      studentId: data.studentId,
      grade: data.grade,
      feedback: data.feedback,
      timestamp: timestampString,
    };
  },
};
