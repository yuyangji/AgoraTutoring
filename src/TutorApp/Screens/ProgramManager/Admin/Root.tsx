import { View, StyleSheet, Text, FlatList } from "react-native";
import SegmentedControl from "../../../../Components/SegmentedControl";
import { useEffect, useState } from "react";
import { MyTheme, globalStaticStyles } from "../../../../useGlobalStyles";
import SearchField from "../../../../Components/SearchBar";
import { AdminViewProp } from "../../../Navigators/ProgramNavigator";
import People from "./PeopleView";
import Requests from "./RequestsView";
import { getEnrolmentRequests } from "../../../../Firebase/Firebase";
import { useAppSelector } from "../../../../Redux/hooks";
import { selectUser } from "../../../../Redux/userSlice";
import {
  Enrolment,
  EnrolmentRequest,
  Student,
} from "../../../../Types/ModelTypes";
import { getStudentsFromProgram } from "../../../../Firebase/EnrolmentApi";
import { ConvertDate } from "../../../../Utils";

const Listing = () => {
  return <View></View>;
};

type StudentType = {
  id: string;
  firstName: string;
  lastName: string;
  joinDate: Date
}

const Admin = ({ route, navigation }: AdminViewProp) => {
  const options = ["Enrolled", "Offering", "Requests"];

  const [selected, setSelected] = useState(options[0]);
  const [requests, setRequests] = useState<EnrolmentRequest[]>([]);

  const [students, setStudents] = useState<StudentType[]>([]);

  const { program } = route.params;
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user.id == program.admin) {
      getEnrolmentRequests(program.programId).then((result) => {
        if (result.requests) {
          setRequests(result.requests);
        }
      });
    }

    getStudentsFromProgram(program.programId).then((result) => {
      if (result.enrolments) {
        const students = result.enrolments.map((i) => ({
          id: i.studentId,
          firstName: i.firstName,
          lastName: i.lastName,
          joinDate: i.joinDate.toDate()
        }));

        setStudents(students);
      }
    });
  }, []);

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

        <SearchField
          additionalStyles={{
            marginHorizontal: 20,
            marginVertical: 20,
            borderRadius: 9,
          }}
        />
      </View>
      {selected == "Enrolled" ? (
        <People tutors={program.tutors} students={students} />
      ) : selected == "Offering" ? (
        <Listing />
      ) : (
        <Requests requests={requests} />
      )}
    </View>
  );
};

export default Admin;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },

  topSection: {
    backgroundColor: MyTheme.colors.backgroundDark,
    paddingVertical: 25,
    paddingBottom: 25,
  },
});
