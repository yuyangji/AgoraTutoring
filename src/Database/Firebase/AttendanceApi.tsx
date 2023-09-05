import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { ErrorCode, FirestoreResponse } from "./Types";
import { Lesson, LessonConverter } from "../../Types/Lesson";
import { GroupsByProgramId, LessonsDb } from "./Firebase";
import { Group, GroupConverter } from "../../Types/Group";

export const addLessonForGroup = async (groupId: string, lesson: Lesson) => {
  try {
    const lessonsRef = firestore()
      .collection("Groups")
      .doc(groupId)
      .collection("Lessons");
    const lessonDb = LessonConverter.toFirestore(lesson);
    

    const result = await lessonsRef.add(lessonDb);

    return result.id; // Return the document ID of the newly created lesson
  } catch (error) {
    console.error("Error adding lesson for group:", error);
    throw error
  }
};


//Iterate through all the groups and get the lessons for each group
export const getLessonsForGroup = async (
  groupIds: string[]
): Promise<Lesson[]> => {
  try {
    const twentyDaysAgo = new Date();
    twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);
    const startDate = firestore.Timestamp.fromDate(twentyDaysAgo);
    
    const promises = groupIds.map(async (groupId) => {
      const lessonsRef = LessonsDb(groupId).where("end", ">=", startDate);
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
    console.log("found lessons " , allLessons)

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
      const groupsRef = GroupsByProgramId(programId);
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
      const groupsRef = GroupsByProgramId(programId);
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
