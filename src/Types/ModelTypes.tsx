export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: "Tutor" | "Student" | "Parent" | "Guest";
  programs: string[];
  avatarUrl?: string;
}

export interface Program {
  programID: string;
  admin: string;
  title: string;
  tutors: string[];
  price?: number;
  rate?: string;
  subtitle?: string;
  products: string[];
}

export interface ProgramLocal extends Program{
  start: Date;
  end: Date;
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

export interface Enrolment{
  enrolmentId: string;
  studentId: string;
  programId: string;
}


export interface Message {
  id: string;
  text: string;
  userId: string;
  timestamp: number;
}

export interface EnrolmentRequest {
  requestID: string;
  programID: string;
  studentID: string;
  studentName: string;
  studentEmail: string;
}

