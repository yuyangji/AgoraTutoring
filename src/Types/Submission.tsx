import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

//Change to class
export class Submission {
  constructor(
    public submissionId: string,
    public files: string[],
    public studentId: string,
    public assessmentId: string,
    public submitTime?: string,

    public grade?: number,
    public feedback?: string
  ) {}
}

export type SubmissionDbModel = {
  files: string[];
  studentId: string;
  submitTime: FirebaseFirestoreTypes.Timestamp;
  grade?: number;
  feedback?: string;
};

export const SubmissionConverter = {
  toFirestore: (submission: Submission): SubmissionDbModel => {
    return {
      files: submission.files,
      studentId: submission.studentId,
      submitTime: FirebaseFirestoreTypes.Timestamp.fromDate(
        new Date(submission.submitTime)
      ),
    };
  },
  fromFirestore: (snapshot: any, assessmentId: string): Submission => {
    const data = snapshot.data() as SubmissionDbModel;
    console.log("this id is ", assessmentId);
    return {
      assessmentId: assessmentId,
      submissionId: snapshot.id,
      files: data.files,
      studentId: data.studentId,
      grade: data.grade,
      feedback: data.feedback,
      submitTime:
        data.submitTime != undefined
          ? data.submitTime.toDate().toISOString()
          : undefined,
    };
  },
};
