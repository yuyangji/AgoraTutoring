import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Assessments from "../../Screens/Student/Assessments/Assessments";
import { MyTheme } from "../../Styles/useGlobalStyles";
import AssessmentsList from "../../Screens/Tutor/Assessment/AssessmentList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Admin from "../../Screens/Tutor/Administration/Root";
import GroupListView from "../../Screens/Tutor/Assessment/GroupListView";
import { TutorRootStackParamList } from "./NavigatorTypes";


export type AdminViewProp = NativeStackScreenProps<TutorRootStackParamList, 'ProgramNavigator'>

const Tab = createMaterialTopTabNavigator();


const ProgramNavigator = ({ route, navigation }: AdminViewProp) => {

  const {programId} = route.params;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: MyTheme.colors.secondary,
        tabBarInactiveTintColor: "white",
        tabBarLabelStyle: { fontSize: 10 },
        tabBarStyle: { backgroundColor: MyTheme.colors.primary },
      })}
    >
      <Tab.Screen name="Admin" component={Admin} initialParams={{ programId }} />
      <Tab.Screen name="Groups" component={GroupListView} initialParams={{ programId }} />
    </Tab.Navigator>
  );
}

export default ProgramNavigator;
