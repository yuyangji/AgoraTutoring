import firestore from '@react-native-firebase/firestore';

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
  
  