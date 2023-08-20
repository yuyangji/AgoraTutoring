import firestore from '@react-native-firebase/firestore';
import { Group } from '../Types/Group';
import { AssessmentsRef, SubmissionsRef } from './Firebase';
import { Assessment, assessmentConverter } from "../Types/Assessment";
import { FirestoreResult } from './Types';
import { Submission } from '../Types/Submission';

//Allows tutors to create an assessment
export const createAssessment = async (
    tutorID: string,
    courseID: string,
    submissionInstructions: string,
    deadline: string
  ): Promise<void> => {
    try {
      const assessmentRef = firestore()
        .collection('Courses')
        .doc(courseID)
        .collection('Assessments')
        .doc(); // Create a new document ID for the assessment
  
      await assessmentRef.set({
        tutorID,
        submissionInstructions,
        deadline,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
  
      console.log('Assessment created successfully');
    } catch (error) {
      console.error('Error creating assessment:', error);
    }
  };

//Check assessments subcollection if 'groups' field array contains a groupId.
export const fetchAssessmentsDb = async (groups:Group[]) => {

  try {
    const assessments : Assessment[] = []
    for (const group of groups) {
      let assessmentsRef = AssessmentsRef(group.programId).where('groups', 'array-contains', group.groupId)
      const querySnapshot = await assessmentsRef.get()
      const data = querySnapshot.docs.map(doc => {
        assessments.push(assessmentConverter.fromFirestore(doc, group.programId))
      })
   }
    return assessments
  } catch (error ) {
    throw error
  }
}

export const fetchSubmissionsDb = async (studentId:string, assessmentRoutes : {programId:string, assessmentId:string}[]) => {
  try {
    const submissions : Submission[] = []
    for (const assessment of assessmentRoutes) {
      let assessmentsRef = SubmissionsRef(assessment.programId,assessment.assessmentId ).where('studentId', '==', studentId)
      const querySnapshot = await assessmentsRef.get()
      const data = querySnapshot.docs.map(doc => doc.data() as Submission)
      submissions.push(...data)
    }
    return submissions
  } catch (error) {
    throw error
  }
}