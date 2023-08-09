




//Student enrol into program

import { AcceptEnrolmentRequest } from "../src/Firebase/EnrolmentApi";

//Tutor accepts enrolment into program

test("Fail request", () => {
    const input = {
        requestId:"",
        programId: "",
        studentId: ""
    }
    return AcceptEnrolmentRequest(input).then(data => {
        expect(data.success).toBe(false)
    })
})