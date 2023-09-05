import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { Group } from "./Group";
import { Tutor } from "./Users";
import firestore from '@react-native-firebase/firestore'
export class Lesson {
  constructor(

    public tutors: string[],
    public instructions: string,
    public location: string,
    public start: string,
    public end: string,
    public attendance: string[],
    public lessonId?: string,
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
  tutors: string[];

  attendance: string[];
};

export const LessonConverter = {
  toFirestore: (lesson: Lesson): LessonDbModel => {

    const startDate = new Date(lesson.start)
    const endDate = new Date(lesson.end)
    
    console.log(startDate, endDate)
    return {
      start: firestore.Timestamp.fromDate(startDate),
      end:  firestore.Timestamp.fromDate(endDate),
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
