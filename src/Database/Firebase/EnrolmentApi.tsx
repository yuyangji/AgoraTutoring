import { Enrolment, EnrolmentRequest, User } from "../../Types/Users";
import functions from "@react-native-firebase/functions";
import firestore from "@react-native-firebase/firestore";
import { FirestoreResult } from "./Types";
import { EnrolmentsDb, ProgramsDb } from "./Firebase";
import { Program, ProgramConverter } from "../../Types/Program";

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
    const result = await callable(data);
    console.log("accepted enrolment", result.data);
    const responseData = result.data as AcceptEnrollmentResponse;

    return responseData;
  } catch (e) {
    console.log(e);
  }
}

export const getProgramData = async (programIds: string[]) => {
  try {
    // Retrieve the full course details
    const docs = await Promise.all(
      programIds.map((id) => ProgramsDb.doc(id).get())
    );
    return docs.map((doc) => ProgramConverter.fromFirestore(doc));
  } catch (error) {
    console.error("Error retrieving enrolled courses:", error);
    throw error;
  }
};

//Get courses the student is enrolled in
export const getEnrolledPrograms = async (studentID: string) => {
  try {
    const querySnapshot = await EnrolmentsDb.where(
      "studentID",
      "==",
      studentID
    ).get();
    const enrolments = querySnapshot.docs.map((doc) => doc.data() as Enrolment);

    // Retrieve the full course details
    const courses = await Promise.all(
      enrolments.map((enrolment) =>
        firestore().collection("Courses").doc(enrolment.programId).get()
      )
    );
    const courseDetails = courses.map((courseDoc) => {
      const data = courseDoc.data() as Program;
      return {
        ...data,
        documentID: courseDoc.id, // Include the document ID
      };
    });

    return { success: true, courses: courseDetails };
  } catch (error) {
    console.error("Error retrieving enrolled courses:", error);
    return { success: false, error };
  }
};

//Get courses the student is enrolled in
export const getStudentsFromProgram = async (
  programId: string
): Promise<{ enrolments?: Enrolment[]; error?: Error }> => {
  try {
    const querySnapshot = await firestore()
      .collection("Enrolments")
      .where("programId", "==", programId)
      .get();
    const students = querySnapshot.docs.map((doc) => doc.data() as Enrolment);

    return { enrolments: students };
  } catch (error) {
    console.error("Error retrieving enrolled courses:", error);
    return { error };
  }
};

//Get enrolment requests for a tutor
export const getEnrolmentRequests = async (programID: string) => {
  try {
    const querySnapshot = await firestore()
      .collection("EnrolmentRequests")
      .where("programID", "==", programID)
      .get();
    const requests = querySnapshot.docs.map(
      (doc) => ({ requestId: doc.id, ...doc.data() } as EnrolmentRequest)
    );
    return { requests };
  } catch (error) {
    console.error("Error retrieving enrollment requests:", error);
    return { error };
  }
};

//Get enrolment requests for a tutor
export const getStudentEnrolmentRequests = async (
  studentID: string
) => {
  try {
    const querySnapshot = await firestore()
      .collection("EnrolmentRequests")
      .where("studentID", "==", studentID)
      .get();
    const requests = querySnapshot.docs.map(
      (doc) => ({ requestId: doc.id, ...doc.data() } as EnrolmentRequest)
    );
    return requests
  } catch (error) {
    console.error("Error retrieving enrollment requests:", error);
    throw error
  }
};

//Rejects the enrolment request. Simply deletes it for now.
export const rejectEnrolmentRequest = async (requestID: string) => {
  try {
    await firestore().collection("EnrolmentRequests").doc(requestID).delete();
    return { success: true };
  } catch (error) {
    console.error("Error rejecting enrollment request:", error);
    return { success: false, error };
  }
};

//Students can send a request to enrol in the unit.
export const sendEnrolmentRequest = async (
  programID: string,
  user: User
): Promise<string> => {
  try {
    const enrolmentRequestData: Omit<EnrolmentRequest, "requestId"> = {
      programId: programID,
      studentId: `${user.id}`,
      studentName: `${user.firstName} ${user.lastName}`,
      studentEmail: `${user.email}`,
    };

    const result = await firestore()
      .collection("EnrolmentRequests")
      .add(enrolmentRequestData);

    return result.id
  } catch (error) {
    console.log(error)
   throw new Error("Error sending enrollment request")
  }
};

