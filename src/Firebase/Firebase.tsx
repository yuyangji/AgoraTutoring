import firestore from '@react-native-firebase/firestore';
import { Program, ProgramConverter } from "../Types/Program";
import { FirestoreResult } from './Types';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';


export const UsersRef = firestore().collection("Users")
export const ProgramsCol = firestore().collection("Programs")
export const EnrolmentsCol = firestore().collection('Enrolments')
export const AssessmentsRef = (programId: string) => ProgramsCol.doc(programId).collection("Assessments")
export const SubmissionsRef = (programId:string, assessmentId:string) =>AssessmentsRef(programId).doc(assessmentId).collection("Submissions")


export const GroupsRef = (programId: string) =>  firestore().collection('Groups').where('programId', '==', programId)
export const LessonsRef = (groupId: string) => firestore().collection('Groups').doc(groupId).collection('Lessons')


export const getAllPrograms = async () => {
  try {
    const querySnapshot = await ProgramsCol.get();
    const programs: Program[] = querySnapshot.docs.map(doc => {
      const data = ProgramConverter.fromFirestore(doc)
      return data;
    });

    return  programs;
  } catch (error) {
    console.error('Error retrieving all programs:', error);
    throw error
  }
};


