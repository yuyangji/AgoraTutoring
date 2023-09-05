
export type AttendanceData = {
  lessonId: string;
  students: { name: string; present: boolean; studentId: string; }[];
};


