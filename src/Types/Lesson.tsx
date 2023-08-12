import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Group } from "./Group";
import { Tutor } from "./Users";

export class Lesson {
  constructor(
    public lessonId: string,
    public tutors: Tutor[],
    public instructions: string,
    public location: string,
    public start: Date,
    public end: Date,
    public attendance: string[]
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
      start: FirebaseFirestoreTypes.Timestamp.fromDate(lesson.start),
      end: FirebaseFirestoreTypes.Timestamp.fromDate(lesson.end),
      instructions: lesson.instructions,
      location: lesson.location,
      tutors: lesson.tutors,
      attendance: lesson.attendance
    };
  },

  fromFirestore: (snapshot): Lesson => {
    const data = snapshot.data() as LessonDbModel;

    return {
      lessonId: snapshot.id,
      tutors: data.tutors,
      start: data.start.toDate(),
      end: data.end.toDate(),
      instructions: data.instructions,
      location: data.location,
      attendance:data.attendance
    };
  },
};
