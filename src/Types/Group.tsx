import { Student, Tutor } from "./Users"


export class Group {
    constructor(
        public groupId:string,
        public programId: string,
        public title: string,
        public students: Student[],
        public tutors:  Tutor[]
    ) { }

    
}