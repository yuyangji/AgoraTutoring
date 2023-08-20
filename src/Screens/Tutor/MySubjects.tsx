import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import SearchField from "../../Components/SearchBar";
import { MyTheme, globalStaticStyles } from "../../useGlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Program } from "../../Types/Program";
import { getAllPrograms} from "../../Firebase/Firebase";
import SubjectCard from "../../Components/SubjectCard";


// const MySubjects = () => {
//   const navigation = useNavigation<NativeStackNavigationProp<any>>();
//   const [programs, setPrograms] = useState<ProgramLocal[] | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const onPressSubject = (program:Program) => {
//     navigation.push("ProgramNavigator",{...program});
//   };

//   // useEffect(() => {
//   //   const fetchPrograms = async () => {
//   //     const response = await getAllPrograms();
//   //     setLoading(false);
//   //     if (response.success) {
//   //       const programsWithTutorNames = await getProgramsWithTutorNames(response.data);
//   //       setPrograms(programsWithTutorNames);
//   //     } else {
//   //       setError('Failed to fetch programs.');
//   //     }
//   //   };
  

//   //   fetchPrograms();
//   // }, []);

//   return (
//     <View style={globalStaticStyles.screen}>
//       <SearchField />
//       <View style={globalStaticStyles.boxShadow}>
//         <TouchableOpacity style={styles.addClassButtonContainer}>
//           <Text style={styles.addClassText}>+ Add Class</Text>
//         </TouchableOpacity>
//       </View>
//       {
//         !loading &&
//         <FlatList
//         data={programs}
//         renderItem={({ item }) => (
//           <SubjectCard onPress={() => onPressSubject(item)} data={item} />
//         )}
//         keyExtractor={(item, index) => index.toString()}
//       />
//       }

//     </View>
//   );
// };

//export default MySubjects;

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
