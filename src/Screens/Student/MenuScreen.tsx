import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useAppSelector } from "../../Redux/hooks";
import { selectUser } from "../../Redux/slices/userSlice";
import CustomHeader from "../../Navigation/Header";
import {
  selectGroups,
  selectProgramById,
  selectProgramIds,
} from "../../Redux/slices/programSlice";
import { MyTheme } from "../../Styles/useGlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StudentRootStackParamList } from "../../Navigation/Student/StudentNavigator";
import { TutorRootStackParamList } from "../../Navigation/Tutor/NavigatorTypes";
import { Program } from "../../Types/Program";

const EnrolBtn = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={btnStyles.container}>
      <Text style={btnStyles.btnText}>Enrol</Text>
    </TouchableOpacity>
  );
};
const btnStyles = StyleSheet.create({
  container: {
    alignItems: "center",
        backgroundColor: MyTheme.colors.secondary,
    paddingHorizontal: 100,
    borderRadius: 7,
    paddingVertical: 10,

        marginVertical: 20,
        alignSelf:'flex-start'
  },
  btnText: {
    color: "white",
    fontWeight: "300",
  },
});

const ProgramAccordion = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void | null;
}) => {
  return onPress ? (
    <TouchableOpacity style={accordionStyles.container} onPress={onPress}>
      <Text style={accordionStyles.text}>{title}</Text>
    </TouchableOpacity>
  ) : (
    <View style={accordionStyles.container}>
      <Text style={accordionStyles.text}>{title}</Text>
    </View>
  );
};
const accordionStyles = StyleSheet.create({
  container: {
    padding: 15,
    paddingVertical: 15,
    elevation: 5,
    backgroundColor: "white",
        borderRadius: 5,
  
  },
  text: {
    fontSize: 16,
    color: MyTheme.colors.primary,
  },
});

const MenuScreen = () => {
  const user = useAppSelector(selectUser);
  const programs = useAppSelector(selectProgramIds);
  const groups = useAppSelector(selectGroups);
  const programObjects = useAppSelector(selectProgramById);

  const studentNavigation =
    useNavigation<NativeStackNavigationProp<StudentRootStackParamList>>();
  const tutorNavigation =
    useNavigation<NativeStackNavigationProp<TutorRootStackParamList>>();

    const navigateToEnrolment = () => {
      if (user.userType == 'Student')
    studentNavigation.navigate("Enrol");
  };
  const onPressProgram = (programId: string) => {
      if (user.userType == "Tutor")
          tutorNavigation.push("ProgramNavigator", { programId: programId, headerTitle: programObjects[programId].title });
  };

  return (
    <View>
      <View style={styles.screenContainer}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.displayImage}
            source={require("../../Images/Female01.png")}
          ></Image>
          <View style={styles.profileRight}>
            <Text style={styles.nameText}>
              {user.firstName} {user.lastName}
            </Text>
            <Text style={styles.secondaryText}>
              {"Glen Waverley Secondary College"}
            </Text>
            <Text style={styles.secondaryText}>{user.email}</Text>
          </View>
        </View>
        <EnrolBtn onPress={navigateToEnrolment} />
        <Text style={styles.groupHeading}>My Programs</Text>
        {programs.map((program, index) => {
          const title = programObjects[program].title;
          return <ProgramAccordion title={title} key={index} onPress={user.userType == 'Tutor' ? () => onPressProgram(program) : null}/>;
        })}
        <View style={{ paddingVertical: 15 }}></View>
        <Text style={styles.groupHeading}>Groups</Text>
        {groups.map((group, index) => {
          const title = group.name;
          return <ProgramAccordion title={title} key={index} onPress={user.userType == 'Tutor' ? null : null}/>;
        })}
      </View>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  screenContainer: {
    padding: 15,
  },
  profileContainer: {
    flexDirection: "row",
    columnGap: 20
  },
  displayImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  profileLeft: {},
  profileRight: {
    flexDirection: "column",
    rowGap: 2,
  },
  nameText: {
    fontSize: 25,
    fontWeight: "bold",
    color: MyTheme.colors.primary,
  },
  secondaryText: {
    fontSize: 16,
    fontWeight: "400",
    color: MyTheme.colors.primary,
  },
  groupHeading: {
    fontSize: 20,
    fontWeight: "500",
    color: MyTheme.colors.primary,
    marginVertical: 20,
  },
});
