import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { EnrolmentRequest, User } from '../Types/ModelTypes';
import useAuth from '../hooks/useAuth';
import { useAppSelector } from '../Redux/hooks';
import { selectUser } from '../Redux/userSlice';
import { FirestoreResult } from './Types';
//Students can send a request to enrol in the unit.
export const sendEnrolmentRequest = async (programID: string, user:User) :Promise<FirestoreResult<string>> => {

  try {
    const enrolmentRequestData : Omit<EnrolmentRequest,'requestID'>= {
      programID: programID,
      studentID: `${user.id}`,
      studentName: `${user.firstName} ${user.lastName}`,
      studentEmail: `${user.email}`
    }  

      const result = await firestore().collection('EnrolmentRequests').add(enrolmentRequestData);
      return { success: true, data: programID };
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
  