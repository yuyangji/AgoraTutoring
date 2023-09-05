import { Program } from "../../Types/Program";


export type TutorRootStackParamList = {
    Main: undefined;
    ProgramNavigator: {programId: string, headerTitle: string};
  LessonCalendar: undefined;
  CreateAssessment: undefined;
  Attendance: { lessonId: string, groupId: string };
  Assessment: { assessmentId: string };
  }