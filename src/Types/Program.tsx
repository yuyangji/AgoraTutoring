import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface Program {
  programId: string;
  admin: string;
  title: string;
  tutors: string[];
  price?: number;
  rate?: string;
  subtitle?: string;
  products: string[];
}

export interface ProgramFirestore extends Program {
  start: FirebaseFirestoreTypes.Timestamp;
  end: FirebaseFirestoreTypes.Timestamp;
}

export interface ProgramLocal extends Program {
  start: Date;
  end: Date;
}
function convertToProgramLocal(programFirestore: ProgramFirestore): ProgramLocal {
  return {
    ...programFirestore,
    start: programFirestore.start.toDate(),
    end: programFirestore.end.toDate(),
  };
}
function convertToProgramFirestore(programLocal: ProgramLocal): ProgramFirestore {
  return {
    ...programLocal,
    start: FirebaseFirestoreTypes.Timestamp.fromDate(programLocal.start),
    end: FirebaseFirestoreTypes.Timestamp.fromDate(programLocal.end),
  };
}
