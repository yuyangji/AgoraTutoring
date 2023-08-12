import firestore from '@react-native-firebase/firestore';
import { Program, ProgramLocal } from "../Types/Program";
import { FirestoreResult } from './Types';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';


export const UsersCol = firestore().collection("Users")
export const ProgramsCol = firestore().collection("Programs")
export const EnrolmentsCol = firestore().collection('Enrolments')

export const GroupsRef = (programId: string) =>  firestore().collection('Groups').where('programId', '==', programId)
export const LessonsRef = (groupId: string) => firestore().collection('Groups').doc(groupId).collection('Lessons')
export const getAllPrograms = async (): Promise<FirestoreResult<ProgramLocal[]>> => {
  try {
    const querySnapshot = await ProgramsCol.get();
    const programs: ProgramLocal[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const {start,end, ...remaining} = data
      return {
        programId: doc.id, // Include the document ID
        admin: data.admin,
        title: data.title,
        tutors: data.tutors,
        price: data.price,
        rate: data.rate,
        subtitle: data.subtitle,
        products: data.products,
        start: data.start?.toDate(), // Convert to JavaScript Date object
        end: data.end?.toDate() // Convert to JavaScript Date object
      };
    });

    return { success: true, data: programs };
  } catch (error) {
    console.error('Error retrieving all programs:', error);
    return { success: false, error };
  }
};


