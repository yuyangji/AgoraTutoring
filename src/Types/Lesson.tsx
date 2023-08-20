import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Group } from "./Group";
import { Tutor } from "./Users";

export class Lesson {
  constructor(
    public lessonId: string,
    public tutors: Tutor[],
    public instructions: string,
    public location: string,
    public start: string,
    public end: string,
    public attendance: string[],
    public groupId?: string //Can fill this in after. since to get lesson, you need groupid.
  ) {}

  toString(): string {
    return ""; // You can define your string representation here
  }
}

export type LessonDbModel = {
  instructions: string;
  location: string;
  start: FirebaseFirestoreTypes.Timestamp;
  end: FirebaseFirestoreTypes.Timestamp;
  tutors: Tutor[];

  attendance: string[];
};

export const LessonConverter = {
  toFirestore: (lesson: Lesson): LessonDbModel => {
    return {
      start: FirebaseFirestoreTypes.Timestamp.fromDate(new Date(lesson.start)),
      end: FirebaseFirestoreTypes.Timestamp.fromDate(new Date(lesson.end)),
      instructions: lesson.instructions,
      location: lesson.location,
      tutors: lesson.tutors,

      attendance: lesson.attendance,
    };
  },

  fromFirestore: (snapshot, groupId): Lesson => {
    const data = snapshot.data() as LessonDbModel;

    return {
      lessonId: snapshot.id,
      tutors: data.tutors,
      start: data.start.toDate().toISOString(),
      end: data.end.toDate().toISOString(),
      instructions: data.instructions,
      location: data.location,
      attendance: data.attendance,
      groupId: groupId,
    };
  },
};
