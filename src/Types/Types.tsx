export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: "Tutor" | "Student" | "Parent" | "Guest";
  linkedCourseIDs: string[];
  avatarUrl?: string;
}

export interface Course{
  courseID: string;
  tutorID: string;
  courseTitle: string;
  lessons?: Lesson[];
  assessments?: Assessment[];
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
  documentID: string;
  studentID: string;
  courseID: string;
}


export interface Message {
  id: string;
  text: string;
  userId: string;
  timestamp: number;
}

export interface EnrolmentRequest {
  requestID: string;
  courseID: string;
  studentID: string;
}

export interface Program {
  title: string;
  tutors: string[];
  price: number;
  rate: string;
  subtitle?: string;
  products: string[];
  start: string;
  end: string;

}