import firestore from '@react-native-firebase/firestore';
import { Program, ProgramConverter } from "../../Types/Program";
import { FirestoreResult } from './Types';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';


export const UsersDb = firestore().collection("Users")
export const ProgramsDb = firestore().collection("Programs")
export const EnrolmentsDb = firestore().collection('Enrolments')
export const AssessmentsDb = firestore().collection("Assessments")
export const SubmissionsDb = (assessmentId:string) =>AssessmentsDb.doc(assessmentId).collection("Submissions")


export const GroupsByProgramId = (programId: string) => firestore().collection('Groups').where('programId', '==', programId)
export const GroupDb = (groupId: string) => firestore().collection('Groups').doc(groupId)
export const LessonsDb = (groupId: string) => firestore().collection('Groups').doc(groupId).collection('Lessons')


export const getAllPrograms = async () => {
  try {
    const querySnapshot = await ProgramsDb.get();
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


