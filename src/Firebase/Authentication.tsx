import firestore from "@react-native-firebase/firestore";
import {
  Attendance,
  Enrolment,
  EnrolmentRequest,
  Program,
  User,
} from "../Types/ModelTypes";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { FirestoreResult } from "./Types";

//Get the user's details by id stored in firestore
export const getUserById = async (
  uid: string
): Promise<FirestoreResult<User>> => {
  try {
    const userDocRef = firestore().collection("Users").doc(uid);
    const userDoc = await userDocRef.get();

    if (userDoc.exists) {
      return {
        success: true,
        data: { id: uid, ...(userDoc.data() as Omit<User, "id">) },
      };
    } else {
      return { success: false, error: new Error("User does not exist") };
    }
  } catch (error) {
    console.log("Error getting user:", error);
    return { success: false, error };
  }
};

export const createUserAuth = async (
  email: string,
  password: string
): Promise<FirestoreResult<FirebaseAuthTypes.UserCredential>> => {
  try {
    // Create the user with email and password
    const authResult = await auth().createUserWithEmailAndPassword(
      email,
      password
    );
    return { success: true, data: authResult };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error };
  }
};

export const createUserWithEmailAndPassword = async (
  email: string,
  password: string,
  user: Omit<User, "id">
) => {
  try {
    // Create the user with email and password
    const authResult = await auth().createUserWithEmailAndPassword(
      email,
      password
    );

    // Get the user ID from the authentication result
    const uid = authResult.user.uid;

    // Create the user document in Firestore

    await createUser({
      ...user,
      id: uid,
    });

    const currentUser = await getUserById(uid);

    return currentUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const createUser = async (
  user: User
): Promise<FirestoreResult<User>> => {
  try {
    await firestore().collection("Users").doc(user.id).set(user);
    console.log("User created successfully");
    return { success: true, data: user };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: error };
  }
};
