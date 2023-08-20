import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  FlatList,
} from "react-native";
import { useState } from "react";
import { MyTheme, globalStaticStyles } from "../../../useGlobalStyles";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useAppSelector } from "../../../Redux/hooks";
import { selectAssessments } from "../../../Redux/slices/assessmentsSlice";

interface StudentListItemProps {
  studentName: string;
  fileCount: number;
}

const students: StudentListItemProps[] = [
  { studentName: "Ruth Williams", fileCount: 3 },
  { studentName: "John Doe", fileCount: 4 },
  // Add more students here...
];

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

const AssessmentView = ({ setIsShowing }) => {
  const [showMore, setShowMore] = useState(false);

  const assessments = useAppSelector(selectAssessments)

  return (
    <View>
      <View
        style={{
          backgroundColor: MyTheme.colors.backgroundDark,
          gap: 8,
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => setIsShowing(false)}
          style={{ flexDirection: "row", gap: 4 }}
        >
          <AntDesign name="arrowleft" size={24} color="white" />

          <Text style={{ color: "white", fontSize: 15 }}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.headerContainer}>
        <TouchableOpacity style={{ position: "absolute", top: 10, right: 20 }}>
          <Feather name="edit" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.title}>Assessment 1</Text>
        <View style={{ gap: 5 }}>
          <Text style={styles.groupName}>Specialist Class A</Text>
          <View style={styles.row}>
            <Text style={styles.dateTime}>Open 21-05-2023 10:00am</Text>
            <Text style={styles.dateTime}>Close 29-05-2023 10:00am</Text>
          </View>
        </View>

        <View style={styles.headerFooter}>
          <TouchableOpacity style={styles.downloadBtn}>
            <MaterialCommunityIcons
              name="download-box"
              size={20}
              color="white"
            />
            <Text style={styles.downloadText}>Download All</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowMore(!showMore)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              position: "absolute",
              right: 5,
              bottom: 0,
            }}
          >
            <Text style={{ color: "white" }}>{showMore ? "Less" : "More"}</Text>
            <Feather
              name={showMore ? "chevron-up" : "chevron-down"}
              size={17}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>

      {showMore && (
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>Instructions</Text>
          <Text
            style={{
              ...styles.instructionsText,
              fontSize: 13,
              fontWeight: "300",
            }}
          >
            Please upload a pdf or image file of your paper
          </Text>
        </View>
      )}

      <View style={{ padding: 15 }}>
        <Text style={globalStaticStyles.Heading}>Submissions</Text>
        <FlatList
          data={students}
          renderItem={({ item }) => <StudentItem data={item} />}
          style={styles.list}
        />

        <Text style={globalStaticStyles.Heading}>Pending</Text>
      </View>
    </View>
  );
};

export default AssessmentView;

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
    marginTop: 8,
  },

  lightHeaderText: {
    fontSize: 13,
    color: "white",
  },
  editBtn: {
    position: "absolute",
    top: 20,
    right: 0,
  },
  instructionsContainer: {
    backgroundColor: MyTheme.colors.primaryLight,
    gap: 8,
    padding: 15,
    elevation: 5,
  },
  instructionsText: {
    color: "white",
  },
});
