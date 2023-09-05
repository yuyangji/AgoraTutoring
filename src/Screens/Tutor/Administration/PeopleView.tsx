import { View, StyleSheet, Text, FlatList } from "react-native";
import { MyTheme, globalStyles } from "../../../Styles/useGlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

interface StudentListItemProps {
  firstName: string;
  lastName: string;
  joinDate: Date;
  }
  
  const StudentListItem = ({ firstName, lastName,  joinDate }: StudentListItemProps) => {
    return (
      <View style={styles.studentItemContainer}>
        <Text style={{ ...styles.studentName, fontWeight: "500" }}>
          {firstName} {lastName}
        </Text>
        <Text style={{ fontWeight: "300" }}>{joinDate.toISOString()}</Text>
      </View>
    );
  };

const People = ({ tutors, students }: { tutors: string[], students:StudentListItemProps[] }) => {
    return (
      <View style={styles.peopleContainer}>
        <View style={styles.section}>
          <Text style={globalStyles.Heading}>
            <FontAwesome5
              name="chalkboard-teacher"
              size={24}
              color={MyTheme.colors.primary}
            />{" "}
            {tutors.length} Tutor
          </Text>
          {
            tutors.map( (name, index) =>   <Text style={globalStyles.text_md}>{name}</Text>)
          }
        
        </View>
  
        <View style={styles.section}>
          <Text style={{ ...globalStyles.Heading, marginBottom: 10 }}>
            <Ionicons name="person" size={24} color={MyTheme.colors.primary} /> 23
            Students
          </Text>
          <FlatList
            data={students}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <StudentListItem
                firstName={item.firstName}
                lastName={item.lastName}
                joinDate={item.joinDate}
              />
            )}
          />
        </View>
      </View>
    );
};

export default People
  
const styles = StyleSheet.create({

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
  