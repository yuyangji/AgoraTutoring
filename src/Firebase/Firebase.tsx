import firestore from '@react-native-firebase/firestore';
import { Attendance, Course, Enrolment, EnrolmentRequest, User } from '../Types/Types';
import auth from '@react-native-firebase/auth'

//Get the user's details by id stored in firestore
export const getUserById = async (uid: string) : Promise<{data?:User, error:any}>=> {
  try {
    const userDocRef = firestore().collection('Users').doc(uid);
    const userDoc = await userDocRef.get();

    if (userDoc.exists) {
      return { data:{id:uid, ...userDoc.data() as Omit<User, 'id'> }, error: null };
    } else {
      return {  error: 'No such user!' };
    }
  } catch (error) {
    console.log('Error getting user:', error);
    return {  error: error.message };
  }
};

export const createUserWithEmailAndPassword = async (
  email: string,
  password: string,
  user: Omit<User, 'id'>
) => {
  try {
    // Create the user with email and password
    const authResult = await auth().createUserWithEmailAndPassword(email, password);

    // Get the user ID from the authentication result
    const uid = authResult.user.uid;

    // Create the user document in Firestore
   
    await  createUser({
      ...user,
      id: uid,
    });

    const currentUser = await getUserById(uid)

    return currentUser
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};


export const createUser = async (user: User) => {
  try {
    await firestore().collection('Users').doc(user.id).set(user);
    console.log('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
  }
}


//Get enrolment requests for a tutor
export const getEnrolmentRequests = async () => {
  try {
    const querySnapshot = await firestore().collection('EnrolmentRequests').get();
    const requests = querySnapshot.docs.map(doc => ({ requestID: doc.id, ...doc.data() } as EnrolmentRequest));
    return { success: true, requests };
  } catch (error) {
    console.error('Error retrieving enrollment requests:', error);
    return { success: false, error };
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
    studentID: request.studentID,
    courseID: request.courseID,
  });

  // Delete from EnrolmentRequest collection
  const requestRef = db.collection('EnrolmentRequests').doc(request.requestID);
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
export const getEnrolledCourses = async (studentID: string) => {
  try {
    const querySnapshot = await firestore().collection('Enrolments').where('studentID', '==', studentID).get();
    const enrolments = querySnapshot.docs.map(doc => doc.data() as Enrolment);

    // Optionally, you could also retrieve the full course details here
    const courses = await Promise.all(enrolments.map(enrolment => 
      firestore().collection('Courses').doc(enrolment.courseID).get()
    ));
    const courseDetails = courses.map(courseDoc => courseDoc.data() as Course);

    return { success: true, courses: courseDetails };
  } catch (error) {
    console.error('Error retrieving enrolled courses:', error);
    return { success: false, error };
  }
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

