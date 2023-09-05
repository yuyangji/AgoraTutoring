import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore'

export class Program {
  
  constructor(
    public programId: string,
    public admin: string,
    public title: string,
    public description:string,
    public tutors: string[],
    public start: string,
    public end: string,
    public rate?: string,
    public subtitle?: string,

  ) { }

}

export type ProgramDb = {
   programId: string,
   admin: string,
   title: string,
   tutors: string[],
   rate?: string,
  subtitle?: string,
   description:string,
  start: FirebaseFirestoreTypes.Timestamp;
  end: FirebaseFirestoreTypes.Timestamp;
}

export const ProgramConverter = {
  toFirestore: (programDb: Program): ProgramDb => {
    return {
      ...programDb,
      start: firestore.Timestamp.fromDate(new Date(programDb.start)),
      end: firestore.Timestamp.fromDate(new Date(programDb.end)),
    };
  },
  fromFirestore: (snapshot:FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>): Program => {
    const data = snapshot.data() as ProgramDb;
    return {
      ...data,
      programId: snapshot.id,
      start: data.start.toDate().toISOString(),
      end: data.end.toDate().toISOString(),
    };
  }
}

