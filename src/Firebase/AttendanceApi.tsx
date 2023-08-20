import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { ErrorCode, FirestoreResponse } from "./Types";
import { Lesson, LessonConverter } from "../Types/Lesson";

import { GroupsRef, LessonsRef } from "./Firebase";
import { Group, GroupConverter } from "../Types/Group";

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

export const getLessonsForGroup = async (group: Group): Promise<Lesson[]> => {
  try {
    const lessonsRef = LessonsRef(group.groupId);
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

export const getLessonsForStudent = async (
  studentGroups: string[]
): Promise<Lesson[]> => {
  try {
    const nowDate = firestore.Timestamp.fromDate(new Date());
    const promises = studentGroups.map(async (groupId) => {
      const lessonsRef = LessonsRef(groupId).where("end", ">=", nowDate);
      const lessonsSnapshot = await lessonsRef.get();
      const result = lessonsSnapshot.docs.map((doc) =>
        LessonConverter.fromFirestore(doc, groupId)
      );
      return result;
    });

    // Execute all promises in parallel
    const lessonsArrays = await Promise.all(promises);

    // Flatten the arrays of lessons into a single array
    const allLessons = lessonsArrays.flat();

    return allLessons;
  } catch (error) {
    console.error("Error retrieving lessons:", error);
    throw error; // Throw the error so it can be handled by the calling code
  }
};

//Groups/groupId/students contains studentId
export const getGroupsForStudent = async (
  studentId: string,
  programs: string[]
): Promise<Group[]> => {
  const groups: Group[] = [];
  try {
    const fetchGroupsFromProgram = async (programId: string) => {
      const groupsRef = GroupsRef(programId);
      const groupsSnapshot = await groupsRef
        .where("students", "array-contains", studentId)
        .get();

      const programGroups = groupsSnapshot.docs.map((doc) =>
        GroupConverter.fromFirestore(doc)
      );
      return programGroups;
    };

    for (const programId of programs) {
      const programGroups = await fetchGroupsFromProgram(programId);
      groups.push(...programGroups);
    }

    return groups;
  } catch (error) {
    console.error("Error retrieving groups:", error);
    throw new Error(ErrorCode.ReadError);
  }
};

//Groups/groupId/tutors contains tutorId
export const getGroupsForTutor = async (
  tutorId: string,
  programs: string[]
): Promise<Group[]> => {
  const groups: Group[] = [];
  try {
    const fetchGroupsFromProgram = async (programId: string) => {
      const groupsRef = GroupsRef(programId);
      const groupsSnapshot = await groupsRef
        .where("tutors", "array-contains", tutorId)
        .get();

      const programGroups = groupsSnapshot.docs.map((doc) =>
        GroupConverter.fromFirestore(doc)
      );
      return programGroups;
    };

    for (const programId of programs) {
      const programGroups = await fetchGroupsFromProgram(programId);
      groups.push(...programGroups);
    }

    return groups;
  } catch (error) {
    console.error("Error retrieving groups:", error);
    throw new Error(ErrorCode.ReadError);
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
