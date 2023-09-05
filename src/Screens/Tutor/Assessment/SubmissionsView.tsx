import { useAppSelector } from "../../../Redux/hooks";
import { selectGroups } from "../../../Redux/slices/programSlice";
import { Submission } from "../../../Types/Submission";
import {
  ScrollView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MyTheme } from "../../../Styles/useGlobalStyles";
import { Entypo } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import useFetchAllSubmissions from "../../../hooks/Tutor/useFetchAllSubmissions";
import { Group } from "../../../Types/Group";

interface StudentListItemProps {
  studentName: string;
  fileCount: number;
}

const StudentItem = ({ data }: { data: StudentListItemProps }) => {
  return (
    <TouchableOpacity
      style={{
        padding: 13,
        borderRadius: 8,
        borderColor: MyTheme.colors.primary,
        borderWidth: 0.7,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 18,
        elevation: 5,
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      <Text style={{ color: MyTheme.colors.primary, fontWeight: "500" }}>
        {data.studentName}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ color: MyTheme.colors.primary, fontWeight: "400" }}>
          {data.fileCount} files
        </Text>
        <Entypo name="triangle-down" size={20} color={MyTheme.colors.primary} />
      </View>
    </TouchableOpacity>
  );
};

const Submissions = ({ route }) => {
  const groups = useAppSelector(selectGroups);
  const { assessmentId } = route;

  const { submissions } = useFetchAllSubmissions(assessmentId);

  const [groupedSubmissions, setGroupedSubmissions] = useState<
    Record<string, Submission[]>
  >({});

  const numStudents = (groupId) => {
    const group = groups.find((g) => g.groupId == groupId);
    return group && group.students ? group.students.length : 0;
  };

  const organizeSubmissionsByGroup = (submissions: Submission[]) => {
    const submissionsByGroup: Record<string, Submission[]> = {};

    submissions.forEach((submission) => {
      // Find the group to which the student belongs
      const group = groups.find((group) =>
        group.students.some((student) => student.id === submission.studentId)
      );

      if (group) {
        if (!submissionsByGroup[group.groupId]) {
          submissionsByGroup[group.groupId] = [];
        }
        submissionsByGroup[group.groupId].push(submission);
      }
    });
    console.log(submissionsByGroup);
    setGroupedSubmissions(submissionsByGroup);
  };

  useEffect(() => {
    organizeSubmissionsByGroup(submissions);
  }, [submissions]);

  return (
    <ScrollView>
      {Object.entries(groupedSubmissions).map(([groupId, groupSubmissions]) => {
        const group = groups.find((g) => g.groupId == groupId);

        return (
          <View key={groupId}>
            <View style={styles.groupHeader}>
              <Text style={styles.lightHeaderText}>{group?.name}</Text>
              <Text style={styles.lightHeaderText}>
                {groupSubmissions.length}/{numStudents(groupId)}
              </Text>
            </View>
            <FlatList
              style={styles.list}
              data={groupSubmissions}
              renderItem={({ item }) => {
                const studentName = group?.students.find(
                  (student) => student.id == item.studentId
                )?.name;

                return (
                  <StudentItem
                    data={{
                      studentName: studentName || "Unknown",
                      fileCount: item.files ? item.files.length : 0,
                    }}
                  />
                );
              }}
              keyExtractor={(item) => item.submissionId}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Submissions;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: MyTheme.colors.backgroundDark,
    padding: 15,
    paddingTop: 10,
    gap: 18,
    paddingBottom: 20,
    elevation: 10,
  },

  headerFooter: {
    flexDirection: "row",
    gap: 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  groupName: {
    fontWeight: "300",
    color: "white",
    fontSize: 15,
  },
  groupHeader: {
    flexDirection: "row",
    backgroundColor: MyTheme.colors.backgroundDark,
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    gap: 15,
  },
  dateTime: {
    fontSize: 12,
    color: MyTheme.colors.secondary,
    fontWeight: "300",
  },
  downloadBtn: {
    flexDirection: "row",
    gap: 4,
    backgroundColor: MyTheme.colors.secondary,
    alignItems: "center",
    borderRadius: 7,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  downloadText: {
    fontSize: 12,
    color: "white",
  },

  list: {
    paddingHorizontal: 15,
  },

  lightHeaderText: {
    fontSize: 15,
      color: "white",
   
  },
  editBtn: {
    position: "absolute",
    top: 20,
    right: 0,
  },
  instructionsContainer: {
    backgroundColor: MyTheme.colors.primary_300,
    gap: 8,
    padding: 15,
    elevation: 5,
  },
  instructionsText: {
    color: "white",
  },
});
