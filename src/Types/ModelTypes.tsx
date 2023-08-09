import {FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: "Tutor" | "Student" | "Parent" | "Guest";
  programs: string[];
  avatarUrl?: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Enrolment{
  enrolmentId: string; //Doc id
  programId: string;
  studentId: string;
  firstName: string;
  lastName: string;
  joinDate: FirebaseFirestoreTypes.Timestamp
}
export interface Program {
  programId: string;
  admin: string;
  title: string;
  tutors: string[];
  price?: number;
  rate?: string;
  subtitle?: string;
  products: string[];
}

export interface ProgramFirestore extends Program{
  start: FirebaseFirestoreTypes.Timestamp
  end: FirebaseFirestoreTypes.Timestamp
}

export interface ProgramLocal extends Program{
  start: Date;
  end: Date;
}

function convertToProgramLocal(programFirestore: ProgramFirestore): ProgramLocal {
  return {
    ...programFirestore,
    start: programFirestore.start.toDate(),
    end: programFirestore.end.toDate(),
  };
}

function convertToProgramFirestore(programLocal: ProgramLocal): ProgramFirestore {
  return {
    ...programLocal,
    start: FirebaseFirestoreTypes.Timestamp.fromDate(programLocal.start),
    end: FirebaseFirestoreTypes.Timestamp.fromDate(programLocal.end),
  };
}


export interface Lesson{
  documentID: string;
  lessonDate: string;
  lessonTimeStart: string;
  lessonTimeEnd: string;
  lessonInstructions: string;
  lessonLocation: string;
}

export interface Assessment{
  assessmentID: string;
  submissionInstructions: string;
  deadline: string;
}

export interface Attendance{
  documentID: string;
  lessonID: string;
  studentID: string;
}




export interface Message {
  id: string;
  text: string;
  userId: string;
  timestamp: number;
}

export interface EnrolmentRequest {
  requestId: string;
  programId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
}

