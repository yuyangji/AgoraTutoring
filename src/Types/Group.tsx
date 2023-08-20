import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import { Student, Tutor } from "./Users"


export class Group {
    constructor(
        public groupId:string,
        public programId: string,
        public name: string,
        public students: Student[],
        public tutors:  Tutor[]
    ) { }
}

export type GroupDb = {
     programId: string,
     name: string,
     students: Student[],
     tutors:  Tutor[]
}


export const GroupConverter = {
    toFirestore: (group: Group): GroupDb => {
        const {groupId, ...remaining} = group
    return {
            ...remaining
        }
    }   ,
    fromFirestore: (snapshot: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>): Group => {
        const data = snapshot.data() as GroupDb
        return {
            ...data,
            groupId: snapshot.id,
        }
    }
}