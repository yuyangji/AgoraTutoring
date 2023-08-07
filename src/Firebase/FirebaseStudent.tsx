import firestore from '@react-native-firebase/firestore';
import { Attendance, Course, Enrolment, EnrolmentRequest } from '../Types/Types';

//Students can send a request to enrol in the unit.
export const sendEnrolmentRequest = async (courseID: string, studentID: string) => {
    try {
      await firestore().collection('EnrolmentRequests').add({
        courseID,
        studentID,
      });
      return { success: true };
    } catch (error) {
      console.error('Error sending enrollment request:', error);
      return { success: false, error };
    }
};
  
  
//Mark attendance for a student for a lesson.
export const markAttendance = async (lessonID: string, studentID: string) => {
    try {
      await firestore().collection('Attendance').add({
        lessonID,
        studentID,
      });
      return { success: true };
    } catch (error) {
      console.error('Error marking attendance:', error);
      return { success: false, error };
    }
  };
  