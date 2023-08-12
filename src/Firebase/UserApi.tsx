
import firestore from '@react-native-firebase/firestore';
import { Attendance,  Enrolment, EnrolmentRequest, User } from '../Types/Users';
import { Program, ProgramLocal } from "../Types/Program";
import { FirestoreResult } from './Types';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';



export const getUsersNames = async (tutorIds: string[]): Promise<FirestoreResult<string[]>> => {
    try {
      // Retrieve the user documents for the given tutor IDs
      const userDocs = await Promise.all(tutorIds.map(id => firestore().collection('Users').doc(id).get()));
  
      // Extract the first and last names from the user documents
      const tutorNames = userDocs.map(doc => {
        const user = doc.data() as User;
        return `${user.firstName} ${user.lastName}`;
      });
  
      return { success: true, data: tutorNames };
    } catch (error) {
      console.error('Error retrieving tutor names:', error);
      return { success: false, error };
    }
  };
  