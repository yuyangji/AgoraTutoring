import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Assessments from "../../Screens/Student/Assessments/Assessments";
import { MyTheme } from "../../useGlobalStyles";
import AssessmentsView from "../../Screens/Tutor/Program/AssessmentList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Admin from "../../Screens/Tutor/Administration/Root";
import GroupListView from "../../Screens/Tutor/Program/GroupListView";
import { TutorRootStackParamList } from "./NavigatorTypes";


export type AdminViewProp = NativeStackScreenProps<TutorRootStackParamList, 'ProgramNavigator'>

const Tab = createMaterialTopTabNavigator();
function ProgramNavigator({ route, navigation }: AdminViewProp) {

  const program = route.params;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: MyTheme.colors.secondary,
        tabBarInactiveTintColor: "white",
        tabBarLabelStyle: { fontSize: 10 },
        tabBarStyle: { backgroundColor: MyTheme.colors.primary },
      })}
    >
      <Tab.Screen name="Admin" component={Admin} initialParams={{ program }} />
      <Tab.Screen name="Assessments" component={AssessmentsView} initialParams={{ program }} />
      <Tab.Screen name="Lessons" component={GroupListView} initialParams={{ program }} />
    </Tab.Navigator>
  );
}

export default ProgramNavigator;
