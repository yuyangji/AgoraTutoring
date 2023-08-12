import firestore, { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { ErrorCode, FirestoreResponse } from "./Types";
import { Lesson, LessonConverter } from "../Types/Lesson";

import { GroupsRef, LessonsRef } from "./Firebase";
import { Group } from "../Types/Group";

export const addLessonToProgram = async (programId: string, lesson: Lesson) => {
  try {
    const lessonsRef = firestore()
      .collection("Programs")
      .doc(programId)
      .collection("Lessons");
    const lessonDb = LessonConverter.toFirestore(lesson);
    const result = await lessonsRef.add(lessonDb);

    return result.id; // Return the document ID of the newly created lesson
  } catch (error) {
    console.error("Error adding lesson for group:", error);
    return;
  }
};

export const getLessonsForGroup = async (
  group: Group
): Promise<Lesson[]> => {
  try {
    const lessonsRef = LessonsRef(group.groupId)
    const lessonsSnapshot = await lessonsRef.get();

    const lessons: Lesson[] = lessonsSnapshot.docs.map((doc) => {
      return {
        lessonId: doc.id,
        ...(doc.data() as Lesson), // Assuming the structure of Lesson matches the document
      };
    });

    return lessons;
  } catch (error) {
    console.error("Error retrieving lessons:", error);
    throw error; // or return an appropriate error response
  }
};

export const getLessonsForStudent = async (studentGroups: string[]): Promise<Lesson[][]> => {
  try {
    const allLessons: Lesson[][] = [];
    const nowDate = firestore.Timestamp.fromDate( new Date())
    for (const groupId of studentGroups) {
      const lessonsRef = LessonsRef(groupId).where('end', '>=', nowDate)
      const lessonsSnapshot = await lessonsRef.get();
      const lessons: Lesson[] = lessonsSnapshot.docs.map(
        (doc) => doc.data() as Lesson
      );
      allLessons.push(lessons);
    }

    return allLessons;
  } catch (error) {
    console.error("Error retrieving lessons:", error);
    return error // Or handle the error as needed
  }
};

export const getGroupsForStudent = async (
  studentId: string,
  programs: string[]
): Promise<FirestoreResponse<Group[]>> => {
  try {
    const groups: Group[] = [];

    for (const programId of programs) {
      const groupsRef = GroupsRef(programId);
      const groupsSnapshot = await groupsRef
        .where("students", "array-contains", studentId)
        .get();
     
      for (const doc of groupsSnapshot.docs) {
        const data = { ...doc.data(), groupId: doc.id } as Group
        groups.push(data);
      }
    }

    return { success: true, data: groups };
  } catch (error) {
    console.error("Error retrieving groups:", error);
    return {
      success: false,
      error: ErrorCode.ReadError, // Assuming the error object has a code property
    };
  }
};

export const markAttendance = async (
  {
    programId,
    groupId,
    lessonId,
  }: { programId: string; groupId: string; lessonId: string },
  students: string[]
): Promise<void | Error> => {
  try {
    // Reference to the specific lesson document
    const lessonRef = firestore()
      .collection("Programs")
      .doc(programId)
      .collection("Groups")
      .doc(groupId)
      .collection("Lessons")
      .doc(lessonId);

    // Update the attendance field with the given students array
    await lessonRef.update({
      attendance: students,
    });

    console.log("Attendance marked successfully");
  } catch (error) {
    console.error("Error marking attendance:", error);
    return error;
  }
};
