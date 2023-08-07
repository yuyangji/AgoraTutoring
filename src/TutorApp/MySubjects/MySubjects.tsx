import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import SearchField from "../../Components/SearchBar";
import { MyTheme, globalStaticStyles } from "../../useGlobalStyles";
import SubjectCard, { SubjectCardProps } from "./SubjectCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const subjectsData: SubjectCardProps[] = [
  {
    subjectTitle: "Math Methods",
    tutors: ["Harley Zhong"],
    courseID: "",
    nextLessonTime: "23-05-2023 10:00am",
    submissionCount: "11 submissions for assessment 1",
  },
];

const MySubjects = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const onPressSubject = ({ courseID }) => {
    navigation.push("Subject");
  };

  return (
    <View style={globalStaticStyles.screen}>
      <SearchField />
      <View style={globalStaticStyles.boxShadow}>
        <TouchableOpacity style={styles.addClassButtonContainer}>
          <Text style={styles.addClassText}>+ Add Class</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={subjectsData}
        renderItem={({ item }) => (
          <SubjectCard onPress={() => onPressSubject(item)} data={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default MySubjects;

const styles = StyleSheet.create({
  addClassButtonContainer: {
    backgroundColor: MyTheme.colors.secondary,
    borderRadius: 5,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginVertical: 15,
    alignSelf: "flex-end",
  },
  addClassText: {
    color: "white",
    fontWeight: "400",
    fontSize: 14,
  },
});
