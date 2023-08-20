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

export interface Tutor extends Student{

}

export interface Enrolment{
  enrolmentId: string; //Doc id
  programId: string;
  studentId: string;
  firstName: string;
  lastName: string;
  joinDate: FirebaseFirestoreTypes.Timestamp
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

