import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore"
import {  ShallowUser, Tutor } from "./Users"


export class Group {
    constructor(
        public groupId:string,
        public programId: string,
        public name: string,
        public students: {id:string, name:string}[],
        public tutors: string[],
    ) { }
}

export type GroupDb = {
     programId: string,
     name: string,
     students: {id:string, name:string}[],
    tutors: string[],

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