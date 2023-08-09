import firestore from '@react-native-firebase/firestore';
import { Attendance,  Enrolment, EnrolmentRequest, Program, ProgramLocal, User } from '../Types/ModelTypes';
import { FirestoreResult } from './Types';

//Get enrolment requests for a tutor
export const getEnrolmentRequests = async (programID:string) => {
  try {
    const querySnapshot = await firestore().collection('EnrolmentRequests').where('programID', '==', programID).get();
    const requests = querySnapshot.docs.map(doc => ({ requestId: doc.id, ...doc.data() } as EnrolmentRequest));
    return { requests };
  } catch (error) {
    console.error('Error retrieving enrollment requests:', error);
    return { error };
  }
};

//Approve the enrolment request. This include adding student to enrolment,
//then deleting the request in a batch query.
export const approveEnrolmentRequest = async (request: EnrolmentRequest) => {
  const db = firestore();
  const batch = db.batch();

  // Add to Enrolment collection
  const enrolmentRef = db.collection('Enrolments').doc();
  batch.set(enrolmentRef, {
    studentID: request.studentId,
    courseID: request.programId,
  });

  // Delete from EnrolmentRequest collection
  const requestRef = db.collection('EnrolmentRequests').doc(request.requestId);
  batch.delete(requestRef);

  try {
    await batch.commit();
    return { success: true };
  } catch (error) {
    console.error('Error approving enrollment request:', error);
    return { success: false, error };
  }
};

//Rejects the enrolment request. Simply deletes it for now.
export const rejectEnrolmentRequest = async (requestID: string) => {
  try {
    await firestore().collection('EnrolmentRequests').doc(requestID).delete();
    return { success: true };
  } catch (error) {
    console.error('Error rejecting enrollment request:', error);
    return { success: false, error };
  }
};

//Get enrolment requests for a tutor
export const getStudentEnrolmentRequests = async (studentID:string) : Promise<FirestoreResult<EnrolmentRequest[]>> => {
  try {
    const querySnapshot = await firestore().collection('EnrolmentRequests').where('studentID', '==', studentID).get();
    const requests = querySnapshot.docs.map(doc => ({ requestId: doc.id, ...doc.data() } as EnrolmentRequest));
    return { success: true, data:requests };
  } catch (error) {
    console.error('Error retrieving enrollment requests:', error);
    return { success: false, error };
  }
};
//Retrieve previous attendances for a lesson
export const getAttendanceHistory = async (studentID: string, courseID?: string) => {
  try {
    let query = firestore().collection('Attendance').where('studentID', '==', studentID);

    if (courseID) {
      query = query.where('courseID', '==', courseID);
    }

    const querySnapshot = await query.get();
    const attendanceRecords = querySnapshot.docs.map(doc => ({ documentID: doc.id, ...doc.data() } as Attendance));

    return { success: true, attendanceRecords };
  } catch (error) {
    console.error('Error retrieving attendance history:', error);
    return { success: false, error };
  }
};

//Get courses the student is enrolled in
export const getEnrolledPrograms = async (studentID: string) => {
  try {
    const querySnapshot = await firestore().collection('Enrolments').where('studentID', '==', studentID).get();
    const enrolments = querySnapshot.docs.map(doc => doc.data() as Enrolment);

    // Retrieve the full course details
    const courses = await Promise.all(enrolments.map(enrolment => 
      firestore().collection('Courses').doc(enrolment.programId).get()
    ));
    const courseDetails = courses.map(courseDoc => {
      const data = courseDoc.data() as Program;
      return {
        ...data,
        documentID: courseDoc.id // Include the document ID
      };
    });

    return { success: true, courses: courseDetails };
  } catch (error) {
    console.error('Error retrieving enrolled courses:', error);
    return { success: false, error };
  }
};

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

export const getAllPrograms = async (): Promise<FirestoreResult<ProgramLocal[]>> => {
  try {
    const querySnapshot = await firestore().collection('Programs').get();
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

export const getProgramsWithTutorNames = async (programs: Program[]): Promise<Program[]> => {
  const updatedPrograms = await Promise.all(programs.map(async program => {
    const response = await getUsersNames(program.tutors);
    if (response.success) {
      return { ...program, tutors: response.data };
    } else {
      return program; // Keep the original tutor IDs if fetching names fails
    }
  }));

  return updatedPrograms;
};




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

