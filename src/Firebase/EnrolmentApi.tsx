import { Enrolment, EnrolmentRequest } from "../Types/ModelTypes";
import functions from "@react-native-firebase/functions";
import firestore from '@react-native-firebase/firestore';

type AcceptEnrollmentParams = {
  studentId: string;
  programId: string;
  requestId: string;
};

type AcceptEnrollmentResponse = {
  success: boolean;
  message?: string;
};

export async function AcceptEnrolmentRequest(request: AcceptEnrollmentParams) {
  const data = {
    requestId: request.requestId,
    programId: request.programId,
    studentId: request.studentId,
  };
  try {
    const callable = functions().httpsCallable("acceptEnrollment");
    const result = await callable(data)
    console.log(result.data);
    const responseData = result.data as AcceptEnrollmentResponse;

    return responseData;
  } catch (e) {
    console.log(e);
  }
}


//Get courses the student is enrolled in
export const getStudentsFromProgram = async (programId: string): Promise<{ enrolments?: Enrolment[]; error?: Error; }> => {
    try {
      const querySnapshot = await firestore().collection('Enrolments').where('programId', '==', programId).get();
      const students = querySnapshot.docs.map(doc => doc.data() as Enrolment);
  
      return {  enrolments: students };
    } catch (error) {
      console.error('Error retrieving enrolled courses:', error);
      return {  error } ;
    }
  };