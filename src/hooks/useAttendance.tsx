import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { useAppSelector } from "../Redux/hooks";
import { AttendanceData } from "./AttendanceData";


const useAttendance = (groupId: string, lessonId: string) => {
  const [attendance, setAttendance] = useState<AttendanceData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const group = useAppSelector((state) =>
    state.programs.groups.find((g) => g.groupId == groupId)
  );

  //Save attendance for this lesson
  const saveAttendance = async (attendance: AttendanceData) => {
    try {
      await firestore()
        .collection("Groups")
        .doc(groupId)
        .collection("Attendance")
        .doc(lessonId)
        .set(attendance);
      setAttendance(attendance);
    } catch (e) {
      throw e
    }
  };



  useEffect(() => {
    const fetchAttendance = async () => {
      if (!groupId) {
        setAttendance(null);
        return;
      } 

      setLoading(true);
      try {
        const snapshot = await firestore()
          .collection("Groups")
          .doc(groupId)
          .collection("Attendance")
          .where("lessonId", "==", lessonId)
          .get();

        // If there is no attendance record for this lesson, then noone has been set to present
        if (snapshot.empty) {
          if (group) {
            const students = group.students.map((s) => ({
              name: s.name,
              present: false,
              studentId: s.id,
            }));
            setAttendance({ lessonId, students });
          } else {
            setAttendance(null);
          }
          setLoading(false);
          return;
        }

        const fetchedAttendance = snapshot.docs.map((doc) =>
          setAttendance(doc.data() as AttendanceData)
        );

        setError(null);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [groupId, lessonId]);


  return { attendance, loading, error,saveAttendance };
};

export default useAttendance;
