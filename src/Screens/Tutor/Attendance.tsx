import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  FlatList,
} from "react-native";
import { Lesson } from "../../Types/Lesson";
import useAttendance from "../../hooks/useAttendance";
import { AttendanceData } from "../../hooks/AttendanceData";
import AttendanceStatus from "../../Components/Attendance/AttendanceStatus";
import { MyTheme } from "../../Styles/useGlobalStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TutorRootStackParamList } from "../../Navigation/Tutor/NavigatorTypes";
import { useAppSelector } from "../../Redux/hooks";
import { selectLessons } from "../../Redux/slices/lessonSlice";
import { selectGroupName } from "../../Redux/slices/programSlice";
import MyHeader from "../../Components/MyHeader";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export type AttendanceViewProp = NativeStackScreenProps<
  TutorRootStackParamList,
  "Attendance"
>;

const HeaderRight = ({
  onRefresh,
  onSave,
}: {
  onRefresh: () => void;
  onSave: () => void;
}) => {
  return (
    <View style={{ gap: 15, alignItems: "center", flexDirection: "row" }}>
      <TouchableOpacity onPress={onRefresh}>
        <Ionicons name="refresh" size={25} color={MyTheme.colors.secondary} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onSave}>
        <Text style={{ color: MyTheme.colors.secondary, fontSize: 20 }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const Attendance = ({ route }: AttendanceViewProp) => {
  const { lessonId, groupId } = route.params;

  const { attendance, saveAttendance } = useAttendance(groupId, lessonId);
  const lesson = useAppSelector(selectLessons).find((l) => l.lessonId == lessonId);
  const groupName = useAppSelector(selectGroupName(groupId));
  const navigation = useNavigation();

  const [currentAttendance, setCurrentAttendance] =
    useState<{ name: string; studentId: string; present: boolean }[]>();

  const [canSave, setCanSave] = useState(false);

  const onPressSave = async () => {
    if (!currentAttendance || !canSave) return;

    setCanSave(false);

    const newAttendance: AttendanceData = {
      lessonId: lessonId,
      students: currentAttendance,
    };
    try {
      await saveAttendance(newAttendance);
      alert("Saved attendance");
    } catch {
      alert("Failed to save attendance");
    }
    setCanSave(true);
  };

  const hasChanges = () => {
    if (!attendance || !currentAttendance) return false;

    const oldAttendance = attendance.students;
    const newAttendance = currentAttendance;

    const didChange = oldAttendance.some((oldStudent) => {
      const newStudent = newAttendance.find((s) => s.studentId == oldStudent.studentId);
      if (newStudent) {
        return newStudent.present != oldStudent.present;
      }
      return false;
    });
    setCanSave(didChange);
  };

  useEffect(() => {
    if (attendance) {
      setCurrentAttendance(attendance.students);
    }
  }, [attendance]);

  useEffect(() => {
    hasChanges();
  }, [currentAttendance, attendance]);

  const onPressRefresh = () => {
    setCurrentAttendance(attendance.students);
  };

  const handleAttendanceChange = (studentId, newAttendance) => {
    const updatedAttendance = currentAttendance.map((student) => {
      if (student.studentId === studentId) {
        return { ...student, present: newAttendance };
      }
      return student;
    });
    setCurrentAttendance(updatedAttendance);
  };

  const numPresent = () => {
    if (!currentAttendance) return 0;
    return currentAttendance.filter((s) => s.present).length;
  };
  const numAbsent = () => {
    if (!currentAttendance) return 0;
    return currentAttendance.filter((s) => !s.present).length;
  };

  return (
    <View>
      <MyHeader
        title="Attendance"
        showBack={true}
        onPressBack={() => navigation.goBack()}
        renderRight={() =>
          canSave ? <HeaderRight onRefresh={onPressRefresh} onSave={onPressSave} /> : null
        }
      />

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{groupName}</Text>
        <Text style={styles.infoText}>{lesson.start}</Text>
        <Text style={styles.infoText}>Zoom.com/meeting/Dg0MaS%LKw</Text>
      </View>
      <View style={styles.statContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{numPresent()}</Text>
          <Text style={styles.infoText}>Present</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{numAbsent()}</Text>
          <Text style={styles.infoText}>Absences</Text>
        </View>
      </View>
      {attendance && (
        <FlatList
          style={styles.list}
          data={currentAttendance}
          renderItem={({ item }) => (
            <AttendanceStatus
              name={item.name}
              didAttend={item.present}
              studentId={item.studentId}
              onAttendanceChange={handleAttendanceChange}
            />
          )}
          keyExtractor={(item) => item.studentId}
        />
      )}
    </View>
  );
};

export default Attendance;

const styles = StyleSheet.create({
  infoContainer: {
    padding: 15,
    backgroundColor: MyTheme.colors.backgroundDark,
    gap: 10,
  },
  infoText: {
    color: "white",
  },
  statNumber: {
    color: "white",
    fontWeight: "bold",
  },
  statContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-evenly",
    paddingVertical: 15,
    backgroundColor: MyTheme.colors.primary_300,
    gap: 20,
  },
  stat: {
    flexDirection: "column",
    alignItems: "center",
  },
  list: {
    paddingHorizontal: 15,
    marginVertical: 5,
  },
});
