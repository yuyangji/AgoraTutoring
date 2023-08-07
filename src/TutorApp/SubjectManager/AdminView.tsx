import { View, StyleSheet, Text, FlatList } from "react-native";
import SegmentedControl from "../../Components/SegmentedControl";
import { useState } from "react";
import { MyTheme, globalStaticStyles } from "../../useGlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import SearchField from "../../Components/SearchBar";
interface StudentListItemProps {
  studentName: string;
  joinedDate: string;
}

const StudentListItem = ({ studentName, joinedDate }: StudentListItemProps) => {
  return (
    <View style={styles.studentItemContainer}>
      <Text style={{ ...styles.studentName, fontWeight: "500" }}>
        {studentName}
      </Text>
      <Text style={{ fontWeight: "300" }}>{joinedDate}</Text>
    </View>
  );
};

const students = [
  { studentName: "Ruth Williams", joinedDate: "Joined 10th July 2023" },
  { studentName: "John Doe", joinedDate: "Joined 5th July 2023" },
  // Add more students here...
];

const People = () => {
  return (
    <View style={styles.peopleContainer}>
      <View style={styles.section}>
        <Text style={globalStaticStyles.Heading}>
          <FontAwesome5
            name="chalkboard-teacher"
            size={24}
            color={MyTheme.colors.primary}
          />{" "}
          1 Tutor
        </Text>
        <Text style={globalStaticStyles.text_md}>Harley Zhong</Text>
      </View>

      <View style={styles.section}>
        <Text style={{ ...globalStaticStyles.Heading, marginBottom: 10 }}>
          <Ionicons name="person" size={24} color={MyTheme.colors.primary} /> 23
          Students
        </Text>
        <FlatList
          data={students}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <StudentListItem
              studentName={item.studentName}
              joinedDate={item.joinedDate}
            />
          )}
        />
      </View>
    </View>
  );
};
const Listing = () => {
  return <View></View>;
};

const Requests = () => {
  return <View></View>;
};

const AdminView = () => {
  const options = ["Enrolled", "Offering", "Requests"];

  const [selected, setSelected] = useState(options[0]);
  return (
    <View style={styles.viewContainer}>
      <View style={styles.topSection}>
        <SegmentedControl
          options={options}
          selected={selected}
          setSelected={setSelected}
          styleProps={{
            containerBackgroundColor: MyTheme.colors.surfaceDark,
            selectedOptionBackgroundColor: MyTheme.colors.secondary,
            selectedTextColor: "white",
            textColor: "white",
          }}
          buttonStyle={{ paddingVertical: 11 }}
        />

        <SearchField additionalStyles={{marginHorizontal: 20, marginVertical: 20, borderRadius: 9}} />
      </View>
      {selected == "Enrolled" ? (
        <People />
      ) : selected == "Offering" ? (
        <Listing />
      ) : (
        <Requests />
      )}
    </View>
  );
};

export default AdminView;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1
  },
  peopleContainer: {
    flex: 1,
    padding: 20,
    gap: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",

    marginTop: -25,
    zIndex: 5,
  },

  topSection: {
    backgroundColor: MyTheme.colors.backgroundDark,
    paddingVertical: 25,
    paddingBottom: 25
  },

  section: {
    gap: 10,
  },

  studentItemContainer: {
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "#99C2EC",
    borderRadius: 8,
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 12,
  },

  studentName: {
    color: MyTheme.colors.textPrimary,
  },
});
