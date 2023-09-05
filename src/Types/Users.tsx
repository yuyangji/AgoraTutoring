import {FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: "Tutor" | "Student" | "Parent" | "Guest";
  programs: ProgramGroup[];
  avatarUrl?: string;
}

export type ProgramGroup = {
  groupId: string;
  programId: string;
}

export interface ShallowUser {
  userId: string;
  firstName: string;
  lastName: string;
}

export interface Tutor extends ShallowUser{

}

export interface Enrolment{
  enrolmentId: string; //Doc id
  programId: string;
  studentId: string;
  firstName: string;
  lastName: string;
  joinDate: FirebaseFirestoreTypes.Timestamp
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

